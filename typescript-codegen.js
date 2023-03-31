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

    generateDelete = (resourceName) => {
        return `\tDelete = () : void => {
    \t\tthis.HttpDelete(${resourceName.toUpperCase()}_ROUTE);
    \t}${EOL}${EOL}`;
    };
    
    generatePatch = (resourceName) => {
        return `\tModify = () : void => {
    \t\tthis.HttpPatch(${resourceName.toUpperCase()}_ROUTE);
    \t}${EOL}${EOL}`;
    };
    
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
            fs.appendFileSync(
                `${generationPath}/${resource.name}.ts`,
                `import BasePokeResource from '../../BasePokeResource';${EOL}${EOL}`
            );
            fs.appendFileSync(
                `${generationPath}/${resource.name}.ts`,
                `export const ${resource.name.toUpperCase()}_ROUTE : string = "${
                    resource.route
                }";${EOL + EOL}`
            );
            resource.typescriptInterfaceContent.lines.forEach((line) => {
                if (line.includes("export interface " + resource.name)) {
                    line = `export class ${resource.name} extends BasePokeResource {`;
                }
                if (line.includes("export class Convert")) {
                    line = `export class ${resource.name}Converter {`;
                }
                if (line.includes("[property: string]: any;")) {
                    line = "";
                    if (resource.jsonContent.operations.includes("DELETE")) {
                        line += this.generateDelete(resource.name);
                    }
                    if (resource.jsonContent.operations.includes("MODIFY")) {
                        line += this.generatePatch(resource.name);
                    }
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
}

const workingDirectory = process.cwd();
const primitivesSchemasPath = `${workingDirectory}/primitives`;
const resourcesSchemasPath = `${workingDirectory}/resources`;
const primitivesGenerationPath = `${workingDirectory}/PokeClient.ts/generated/primitives`;
const resourcesGenerationPath = `${workingDirectory}/PokeClient.ts/generated/resources`;

const codegenHelper = new TypescriptCodegenHelper();
codegenHelper.LoadPrimitives(primitivesSchemasPath).then((val) => {
    codegenHelper.GeneratePrimitives(primitivesGenerationPath);
});
codegenHelper.LoadResources(resourcesSchemasPath).then((val) => {
    codegenHelper.GenerateResources(resourcesGenerationPath);
});
