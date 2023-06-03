import {
    quicktype,
    InputData,
    jsonInputForTargetLanguage,
    JSONSchemaInput,
    FetchingJSONSchemaStore,
} from "quicktype-core";
import * as fs from "fs";
import { EOL } from "os";
//import ts from 'ts';


class PrimitiveData {
    constructor(name, rawStringContent, javaClassContent) {
        this.name = name;
        this.rawStringContent = rawStringContent;
        this.javaClassContent = javaClassContent;
    }
    name;
    rawStringContent;
    javaClassContent;
}

class ResourceData {
    constructor(
        name,
        rawStringContent,
        jsonContent,
        javaClassContent
    ) {
        this.name = name;
        this.rawStringContent = rawStringContent;
        this.jsonContent = jsonContent;
        this.javaClassContent = javaClassContent;
    }
    name;
    rawStringContent;
    jsonContent;
    javaClassContent;
}

class JavaCodegenHelper {
    resourcesPath = null;
    primitivesPath = null;
    primitives = [];
    resources = [];

    async quicktypeJSONSchema(targetLanguage, typeName, jsonSchemaString) {
        const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());

        // We could add multiple schemas for multiple types,
        // but here we're just making one type from JSON schema.
        await schemaInput.addSource({
            name: typeName,
            schema: jsonSchemaString,
        });

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
        for (const fileName of primitiveFileNames) {
            const primitiveName = fileName.split(".")[0];
            const fileContent = fs.readFileSync(
                `${primitivesPath}/${fileName}`,
                "utf8"
            );
            const javaClassContent = await this.quicktypeJSONSchema(
                "java",
                primitiveName,
                fileContent
            );
            this.primitives.push(
                new PrimitiveData(
                    primitiveName,
                    fileContent,
                    javaClassContent
                )
            );
        }
    };

    LoadResources = async (resourcesPath) => {
        this.resourcesPath = resourcesPath;
        const resourcesFileNames = fs.readdirSync(resourcesPath);
        for (const fileName of resourcesFileNames) {
            const resourceName = fileName.split(".")[0];
            const fileContent = fs.readFileSync(
                `${resourcesPath}/${fileName}`,
                "utf8"
            );
            const jsonContent = JSON.parse(fileContent);
            const javaClassContent = await this.quicktypeJSONSchema(
                "java",
                resourceName,
                fileContent
            );
            this.resources.push(
                new ResourceData(
                    resourceName,
                    fileContent,
                    jsonContent,
                    javaClassContent
                )
            );
        }
    };

    GenerateResources = async (generationPath) => {
        if (this.resources.length == 0 || this.resourcesPath == null) {
            console.log("Resources were not generated!");
            return;
        }
        this.resources.forEach((resource) => {
            console.log(resource.name);
            fs.writeFileSync(`${generationPath}/${resource.name}Converter.java`, "");
            let i = 0;
            let lines = resource.javaClassContent.lines;
            for (; i < lines.length; i++){
                if(lines[i].includes("package io.quicktype;")){
                    lines[i] = "package PokeClient.generated.resources;" + EOL;
                }
                if(lines[i].includes("Converter")){
                    lines[i] = lines[i].replace("Converter", `${this.capitalizeFirstLetter(resource.name)}Converter`)
                }
                fs.appendFileSync(
                    `${generationPath}/${resource.name}Converter.java`,
                    `${lines[i]}${EOL}`
                );
                if(lines[i].includes(`// ${this.capitalizeFirstLetter(resource.name)}.java`)){
                    i++;
                    break;
                }
            }
            fs.writeFileSync(`${generationPath}/${resource.name}.java`, ""); 
            Object.values(resource.jsonContent.properties).forEach(objVals => {               
                if(objVals.type == "array"){
                    if(objVals.items.$ref){
                        fs.appendFileSync(
                            `${generationPath}/${resource.name}.java`,
                            `import PokeClient.java.generated.primitives.${objVals.items.$ref.split("/").pop().split(".")[0]};${EOL}`)
                    }
                }
                
                if(objVals.$ref){
                    fs.appendFileSync(
                        `${generationPath}/${resource.name}.java`,
                        `import PokeClient.java.generated.primitives.${objVals.$ref.split("/").pop().split(".")[0]};${EOL}`)
                }
            });
            for (; i < lines.length; i++){
                if(lines[i].includes("package io.quicktype;")){
                    lines[i] = EOL;
                }
                fs.appendFileSync(
                    `${generationPath}/${resource.name}.java`,
                    `${lines[i]}${EOL}`
                );
                if(lines[i].includes(`//`)){
                    i++;
                    break;
                }
            }
        })
    }

    GeneratePrimitives = async (generationPath) => {
        if (this.primitives.length == 0 || this.primitivesPath == null) {
            console.log("Primitives were not generated!");
            return;
        }
        this.primitives.forEach((primitive) => {
            console.log(primitive.name);
            fs.writeFileSync(`${generationPath}/${primitive.name}Converter.java`, "");
            let i = 0;
            let lines = primitive.javaClassContent.lines;
            for (; i < lines.length; i++){
                if(lines[i].includes("package io.quicktype;")){
                    lines[i] = "package PokeClient.generated.primitives;" + EOL;
                }
                if(lines[i].includes("Converter")){
                    lines[i] = lines[i].replace("Converter", `${this.capitalizeFirstLetter(primitive.name)}Converter`)
                }
                fs.appendFileSync(
                    `${generationPath}/${primitive.name}Converter.java`,
                    `${lines[i]}${EOL}`
                );
                if(lines[i].includes(`// ${this.capitalizeFirstLetter(primitive.name)}.java`)){
                    i++;
                    break;
                }
            }
            fs.writeFileSync(`${generationPath}/${primitive.name}.java`, "");
            for (; i < lines.length; i++){
                if(lines[i].includes("package io.quicktype;")){
                    lines[i] = EOL;
                }
                fs.appendFileSync(
                    `${generationPath}/${primitive.name}.java`,
                    `${lines[i]}${EOL}`
                );
                if(lines[i].includes(`//`)){
                    i++;
                    break;
                }
            }
        });
    };

    
    // GenerateRoutes = async (generationPath) => {
    //     if (this.resources.length == 0 || this.resourcesPath == null) {
    //         console.log("Resources were not generated!");
    //         return;
    //     }
    //     this.resources.forEach((resource) => {
    //         fs.writeFileSync(
    //             `${generationPath}/${resource.name}Route.ts`,
    //             `export const ${resource.name.toUpperCase()}_ROUTE : string = "${
    //                 resource.route
    //             }";${EOL + EOL}`
    //         );
    //     });
    // };
}


const workingDirectory = process.cwd();
const primitivesSchemasPath = `${workingDirectory}/primitives`;
const resourcesSchemasPath = `${workingDirectory}/resources`;
const primitivesGenerationPath = `${workingDirectory}/PokeClient.java/generated/primitives`;
const resourcesGenerationPath = `${workingDirectory}/PokeClient.java/generated/resources`;

const codegenHelper = new JavaCodegenHelper();
codegenHelper.LoadPrimitives(primitivesSchemasPath).then((val) => {
    codegenHelper.GeneratePrimitives(primitivesGenerationPath);
});

codegenHelper.LoadResources(resourcesSchemasPath).then((val) => {
    codegenHelper.GenerateResources(resourcesGenerationPath);
});