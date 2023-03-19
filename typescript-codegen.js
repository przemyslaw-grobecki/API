import {
    quicktype,
    InputData,
    jsonInputForTargetLanguage,
    JSONSchemaInput,
    FetchingJSONSchemaStore
} from 'quicktype-core';
import fs from 'fs';
import { EOL } from 'os';
//import ts from 'ts';

const workingDirectory = process.cwd();

async function quicktypeJSONSchema(targetLanguage, typeName, jsonSchemaString) {
    const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());

    // We could add multiple schemas for multiple types,
    // but here we're just making one type from JSON schema.
    await schemaInput.addSource({ name: typeName, schema: jsonSchemaString });

    const inputData = new InputData();
    inputData.addInput(schemaInput);

    return await quicktype({
        inputData,
        lang: targetLanguage
    });
}

async function main() {
    const primitives = fs.readdirSync(`${workingDirectory}/primitives`);
    const resources = fs.readdirSync(`${workingDirectory}/resources`);
    
    //Generate Typescript Client
    //TODO: Design schema that ts source creator understand 

    //Generate primitives
    primitives.forEach(async primitive => {
        console.log(primitive);
        const primitiveName = primitive.split('.')[0];
        const fileContent = fs.readFileSync(`${workingDirectory}/primitives/${primitive}`, 'utf8');
        const typescriptInterfaceContent = await quicktypeJSONSchema("typescript", primitiveName, fileContent);
        fs.writeFileSync(`${workingDirectory}/PokeClient.ts/generated/primitives/${primitiveName}.ts`, "");
        typescriptInterfaceContent.lines.forEach(line => {
            fs.appendFileSync(`${workingDirectory}/PokeClient.ts/generated/primitives/${primitiveName}.ts`, `${line}${EOL}`);
        });
    });

    //Generate resources
    resources.forEach(async resource => {
        console.log(resource);
        const resourceName = resource.split('.')[0];
        const fileContent = fs.readFileSync(`${workingDirectory}/resources/${resource}`, 'utf8');
        const jsonParsedContent = JSON.parse(fileContent);
        const typescriptInterfaceContent = await quicktypeJSONSchema("typescript", resourceName, fileContent);
        const resourcePath = getRelativePath(jsonParsedContent);
        fs.writeFileSync(`${workingDirectory}/PokeClient.ts/generated/resources/${resourceName}.ts`, "");
        fs.appendFileSync(`${workingDirectory}/PokeClient.ts/generated/resources/${resourceName}.ts`, 
            `import BasePokeResource from '../../BasePokeResource';${EOL}${EOL}`);
        fs.appendFileSync(`${workingDirectory}/PokeClient.ts/generated/resources/${resourceName}.ts`, 
            `export const ${resourceName.toUpperCase()}_ROUTE : string = "${resourcePath}";${EOL+EOL}`)
    
        typescriptInterfaceContent.lines.forEach(line => {
            if(line.includes("export interface " + resourceName)){
                line = `export class ${resourceName} extends BasePokeResource {`
            }
            if(line.includes("export class Convert")){
                line = `export class ${resourceName}Converter {`
            }
            if(line.includes("[property: string]: any;")){
                line = "";
                if(jsonParsedContent.operations.includes("DELETE")){
                    line+=generateDelete(resourceName);
                }
                if(jsonParsedContent.operations.includes("MODIFY")){
                    line+=generatePatch(resourceName);
                }
            }
            fs.appendFileSync(`${workingDirectory}/PokeClient.ts/generated/resources/${resourceName}.ts`, `${line}${EOL}`);
        });
    });



}

const generateDelete = (resourceName) => {
    return `\tDelete = () : void => {
\t\tthis.HttpDelete(${resourceName.toUpperCase()}_ROUTE);
\t}${EOL}${EOL}`
}

const generatePatch = (resourceName) => {
    return `\tModify = () : void => {
\t\tthis.HttpPatch(${resourceName.toUpperCase()}_ROUTE);
\t}${EOL}${EOL}`
}


const getRelativePath = (jsonObject) => {
    let relativePath = "/" + jsonObject.title.toLowerCase();

    if(jsonObject.relation){
        const fileContent = fs.readFileSync(`${workingDirectory}/resources/${capitalizeFirstLetter(jsonObject.relation.toLowerCase())}.json`, 'utf8')
        relativePath = getRelativePath(JSON.parse(fileContent), relativePath) + (jsonObject.collection ? "/{id}" : "") + relativePath ;
    };
    return relativePath;
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

main();