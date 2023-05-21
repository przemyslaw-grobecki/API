import {
    quicktype,
    InputData,
    jsonInputForTargetLanguage,
    JSONSchemaInput,
    FetchingJSONSchemaStore
} from "quicktype-core";
import * as fs from "fs";
import { EOL } from "os";
//import ts from 'ts';

class PrimitiveData {
    constructor(
        name,
        rawStringContent,
        typescriptInterfaceContent
    ) {
        this.name = name;
        this.rawStringContent = rawStringContent;
        this.typescriptInterfaceContent = typescriptInterfaceContent;
    }
    name;
    rawStringContent;
    typescriptInterfaceContent;
}

class ResourceData {
    constructor(
        name,
        route,
        rawStringContent,
        jsonContent,
        typescriptInterfaceContent
    ) {
        this.name = name;
        this.route = route;
        this.rawStringContent = rawStringContent;
        this.jsonContent = jsonContent;
        this.typescriptInterfaceContent = typescriptInterfaceContent;
    }
    name;
    route;
    rawStringContent;
    jsonContent;
    typescriptInterfaceContent;
}

class TypescriptCodegenHelper {
    resourcesPath = null;
    primitivesPath = null;
    primitives = [];
    resources = [];

    getRelativePath = (jsonObject) => {
        let relativePath = "/" + jsonObject.title.toLowerCase();

        if (jsonObject.relation) {
            const fileContent = fs.readFileSync(
                `${this.resourcesPath}/${this.capitalizeFirstLetter(
                    jsonObject.relation.toLowerCase()
                )}.json`,
                "utf8"
            );
            relativePath =
                this.getRelativePath(JSON.parse(fileContent)) +
                (jsonObject.collection ? "/{id}" : "") +
                relativePath;
        }
        return relativePath;
    };

    async quicktypeJSONSchema(
        targetLanguage,
        typeName,
        jsonSchemaString
    ) {
        const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());
    
        // We could add multiple schemas for multiple types,
        // but here we're just making one type from JSON schema.
        await schemaInput.addSource({ name: typeName, schema: jsonSchemaString });
    
        const inputData = new InputData();
        inputData.addInput(schemaInput);
    
        return await quicktype({
            inputData,
            lang: targetLanguage,
        });
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    LoadPrimitives = async (primitivesPath) => {
        this.primitivesPath = primitivesPath;
        const primitiveFileNames = fs.readdirSync(primitivesPath);
        for(const fileName of primitiveFileNames){
            const primitiveName = fileName.split(".")[0];
            const fileContent = fs.readFileSync(
                `${primitivesPath}/${fileName}`,
                "utf8"
            );
            const typescriptInterfaceContent = await this.quicktypeJSONSchema(
                "typescript",
                primitiveName,
                fileContent
            );
            this.primitives.push(
                new PrimitiveData(
                    primitiveName,
                    fileContent,
                    typescriptInterfaceContent
                )
            );
        };
    };

    LoadResources = async (resourcesPath) => {
        this.resourcesPath = resourcesPath;
        const resourcesFileNames = fs.readdirSync(resourcesPath);
        for(const fileName of resourcesFileNames){
            const resourceName = fileName.split(".")[0];
            const fileContent = fs.readFileSync(
                `${resourcesPath}/${fileName}`,
                "utf8"
            );
            const jsonContent = JSON.parse(fileContent);
            const typescriptInterfaceContent = await this.quicktypeJSONSchema(
                "typescript",
                resourceName,
                fileContent
            );
            const resourceRoute = this.getRelativePath(jsonContent);
            this.resources.push(
                new ResourceData(
                    resourceName,
                    resourceRoute,
                    fileContent,
                    jsonContent,
                    typescriptInterfaceContent
                )
            );
        };
    };

    GenerateResources = async (generationPath) => {
        if (this.resources.length == 0 || this.resourcesPath == null) {
            console.log("Resources were not generated!")
            return;
        }
        this.resources.forEach((resource) => {
            console.log(resource.name);
            fs.writeFileSync(`${generationPath}/${resource.name}.ts`, "");
            //If children apis needed, add imports
            resource.jsonContent?.children?.forEach((child) => {
                fs.appendFileSync(
                    `${generationPath}/${resource.name}.ts`,
                    `import ${this.capitalizeFirstLetter(child)}Api from '../apis/${this.capitalizeFirstLetter(child)}Api';${EOL}` +
                    `import { ${resource.name.toUpperCase()}_ROUTE } from '../routes/${this.capitalizeFirstLetter(resource.name)}Route';${EOL}${EOL}` 
                );
            }) 

            resource.typescriptInterfaceContent.lines.forEach((line) => {
                if (line.includes("export interface " + resource.name)) {
                    line = `export class ${resource.name} {` + EOL +
`/**
* Child apis
*/` + EOL;
                    resource.jsonContent?.children?.forEach((child) => {
                        line += `\tget${this.capitalizeFirstLetter(child)}Api = () => {${EOL}` +
                        `\t\treturn new ${this.capitalizeFirstLetter(child)}Api(${resource.name.toUpperCase()}_ROUTE+this.id);${EOL}` +
                        `\t}${EOL}`
                    });
                }
                if (line.includes("export class Convert")) {
                    line = `export class ${resource.name}Converter {`;
                }
                fs.appendFileSync(
                    `${generationPath}/${resource.name}.ts`,
                    `${line}${EOL}`
                );
            });
        });
    };

    GeneratePrimitives = async (generationPath) => {
        if (this.primitives.length == 0 || this.primitivesPath == null) {
            console.log("Primitives were not generated!")
            return;
        }
        this.primitives.forEach((primitive) => {
            console.log(primitive.name);
            fs.writeFileSync(
                `${generationPath}/${primitive.name}.ts`,
                ""
            );
            primitive.typescriptInterfaceContent.lines.forEach((line) => {
                fs.appendFileSync(
                    `${generationPath}/${primitive.name}.ts`,
                    `${line}${EOL}`
                );
            });
        });
    };

    GenerateRoutes = async (generationPath) => {
        if (this.resources.length == 0 || this.resourcesPath == null) {
            console.log("Resources were not generated!")
            return;
        }
        this.resources.forEach((resource) => {
            fs.writeFileSync(
                `${generationPath}/${resource.name}Route.ts`,
                `export const ${resource.name.toUpperCase()}_ROUTE : string = "${
                    resource.route
                }";${EOL + EOL}`
            );
        });
    };

    GenerateApis = async (generationPath) => {
        if (this.resources.length == 0 || this.resourcesPath == null) {
            console.log("Resources were not generated!")
            return;
        }
        this.resources.forEach((resource) => {
            fs.writeFileSync(`${generationPath}/${resource.name}Api.ts`, "");
            fs.appendFileSync(
                `${generationPath}/${resource.name}Api.ts`,
                `import BaseApi from "../../BaseApi";${EOL}` +
                `import { ${this.capitalizeFirstLetter(resource.name)} } from "../resources/${this.capitalizeFirstLetter(resource.name)}";${EOL}` +
                `import { ${resource.name.toUpperCase()}_ROUTE } from "../routes/${this.capitalizeFirstLetter(resource.name)}Route";${EOL}${EOL}` +
                `export default class ${this.capitalizeFirstLetter(resource.name)}Api extends BaseApi<${this.capitalizeFirstLetter(resource.name)}> {${EOL}` +
                `\t/**` +
                `\t * Standard CRUD` +
                `\t */${EOL}`
            );

            resource.jsonContent?.operations?.forEach((operation) => {
                switch (operation) {
                    case "GET":
                    fs.appendFileSync(
                        `${generationPath}/${resource.name}Api.ts`,
`
\tpublic GetAll = async () : Promise<Array<${this.capitalizeFirstLetter(resource.name)}>> => {
\t\treturn await this.HttpGetAll(this.priorPath + ${resource.name.toUpperCase()}_ROUTE);
\t}

\tpublic Get = async (id: string) : Promise<${this.capitalizeFirstLetter(resource.name)}> => {
\t\treturn await this.HttpGet(this.priorPath + ${resource.name.toUpperCase()}_ROUTE + "/" + id);
\t}
`
                    );
                    break;
                    case "ADD":
`
\tpublic Post = async (id: string, ${resource.name.toLowerCase()}: ${this.capitalizeFirstLetter(resource.name)}) : Promise<void> => {
\t\tawait this.HttpPost(this.priorPath + ${resource.name.toUpperCase()}_ROUTE, ${resource.name.toLowerCase()});
\t}
`
                    break;
                    case "MODIFY":
`      
\tpublic Patch = async (id: string, patch: ${this.capitalizeFirstLetter(resource.name)}) : Promise<${this.capitalizeFirstLetter(resource.name)}> => { : Promise<${this.capitalizeFirstLetter(resource.name)}> => {
\t\treturn await this.HttpPatch(this.priorPath + ${resource.name.toUpperCase()}_ROUTE + "/" + id, patch);
\t}
`
                    break;
                    case "DELETE":
                    fs.appendFileSync(
                        `${generationPath}/${resource.name}Api.ts`,
`
\tpublic Delete = async (id: string) : Promise<void> => {
\t\tawait this.HttpDelete(this.priorPath + ${resource.name.toUpperCase()}_ROUTE + "/" + id);
\t}
`
                    );
                    break;
                }
            })
            
            fs.appendFileSync(
                `${generationPath}/${resource.name}Api.ts`,
                `}${EOL}`
            );
        })
    };

    GenerateClientInterface = async (generationPath) => {
    
    };
}

const workingDirectory = process.cwd();
const primitivesSchemasPath = `${workingDirectory}/primitives`;
const resourcesSchemasPath = `${workingDirectory}/resources`;
const primitivesGenerationPath = `${workingDirectory}/PokeClient.ts/generated/primitives`;
const resourcesGenerationPath = `${workingDirectory}/PokeClient.ts/generated/resources`;
const routesGenerationPath = `${workingDirectory}/PokeClient.ts/generated/routes`;
const clientInterfaceGenerationPath = `${workingDirectory}/PokeClient.ts/generated`;
const apisGenerationPath = `${workingDirectory}/PokeClient.ts/generated/apis`;


const codegenHelper = new TypescriptCodegenHelper();
codegenHelper.LoadPrimitives(primitivesSchemasPath).then((val) => {
    codegenHelper.GeneratePrimitives(primitivesGenerationPath);
});

codegenHelper.LoadResources(resourcesSchemasPath).then((val) => {
    codegenHelper.GenerateResources(resourcesGenerationPath);
    codegenHelper.GenerateRoutes(routesGenerationPath);
    codegenHelper.GenerateClientInterface(clientInterfaceGenerationPath);
    codegenHelper.GenerateApis(apisGenerationPath);
});

