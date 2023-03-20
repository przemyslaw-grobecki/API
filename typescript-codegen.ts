import {
    quicktype,
    InputData,
    jsonInputForTargetLanguage,
    JSONSchemaInput,
    FetchingJSONSchemaStore,
    SerializedRenderResult,
} from "quicktype-core";
import * as fs from "fs";
import { EOL } from "os";
//import ts from 'ts';

class PrimitiveData {
    constructor(
        name: string,
        rawStringContent: string,
        typescriptInterfaceContent: SerializedRenderResult
    ) {
        this.name = name;
        this.rawStringContent = rawStringContent;
        this.typescriptInterfaceContent = typescriptInterfaceContent;
    }
    public name: string;
    public rawStringContent: string;
    public typescriptInterfaceContent: SerializedRenderResult;
}

class ResourceData {
    constructor(
        name: string,
        route: string,
        rawStringContent: string,
        jsonContent: any,
        typescriptInterfaceContent: SerializedRenderResult
    ) {
        this.name = name;
        this.route = route;
        this.rawStringContent = rawStringContent;
        this.jsonContent = jsonContent;
        this.typescriptInterfaceContent = typescriptInterfaceContent;
    }
    public name: string;
    public route: string;
    public rawStringContent: string;
    public jsonContent: any;
    public typescriptInterfaceContent: SerializedRenderResult;
}

class TypescriptCodegenHelper {
    private resourcesPath: string | null = null;
    private primitivesPath: string | null = null;
    private primitives: Array<PrimitiveData> = new Array<PrimitiveData>();
    private resources: Array<ResourceData> = new Array<ResourceData>();

    private getRelativePath = (jsonObject: {
        title: string;
        relation: string;
        collection: any;
    }) => {
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

    private async quicktypeJSONSchema(
        targetLanguage: string,
        typeName: string,
        jsonSchemaString: string
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

    private generateDelete = (resourceName: string) => {
        return `\tDelete = () : void => {
    \t\tthis.HttpDelete(${resourceName.toUpperCase()}_ROUTE);
    \t}${EOL}${EOL}`;
    };
    
    private generatePatch = (resourceName: string) => {
        return `\tModify = () : void => {
    \t\tthis.HttpPatch(${resourceName.toUpperCase()}_ROUTE);
    \t}${EOL}${EOL}`;
    };
    
    private capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    public LoadPrimitives = async (primitivesPath: string) => {
        const primitiveFileNames: Array<string> =
            fs.readdirSync(primitivesPath);
        primitiveFileNames.forEach(async (fileName) => {
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
                    fileName,
                    fileContent,
                    typescriptInterfaceContent
                )
            );
        });
        this.primitivesPath = primitivesPath;
    };

    public LoadResources = async (resourcesPath: string) => {
        const resourcesFileNames: Array<string> = fs.readdirSync(resourcesPath);
        resourcesFileNames.forEach(async (fileName) => {
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
                    fileName,
                    resourceRoute,
                    fileContent,
                    jsonContent,
                    typescriptInterfaceContent
                )
            );
        });
        this.resourcesPath = resourcesPath;
    };

    public GenerateResources = async (generationPath: string) => {
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
                `${generationPath}${resource.name}.ts`,
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

    public GeneratePrimitives = async (generationPath: string) => {
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

const codegenHelper : TypescriptCodegenHelper = new TypescriptCodegenHelper();
codegenHelper.LoadPrimitives(primitivesSchemasPath).then((val) => {
    codegenHelper.GeneratePrimitives(primitivesGenerationPath);
});
codegenHelper.LoadResources(resourcesSchemasPath).then((val) => {
    codegenHelper.GenerateResources(resourcesGenerationPath);
});
