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
    const workingDirectory = process.cwd();
    const primitives = fs.readdirSync(`${workingDirectory}/primitives`);
    const resources = fs.readdirSync(`${workingDirectory}/resources`);
    
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
        const typescriptInterfaceContent = await quicktypeJSONSchema("typescript", resourceName, fileContent);
        fs.writeFileSync(`${workingDirectory}/PokeClient.ts/generated/resources/${resourceName}.ts`, "");
        fs.appendFileSync(`${workingDirectory}/PokeClient.ts/generated/resources/${resourceName}.ts`, 
            `import BasePokeResource from '../../BasePokeResource';${EOL}${EOL}`);
        typescriptInterfaceContent.lines.forEach(line => {
            if(line.includes("export interface " + resourceName)){
                line = `export class ${resourceName} extends BasePokeResource {`
            }
            fs.appendFileSync(`${workingDirectory}/PokeClient.ts/generated/resources/${resourceName}.ts`, `${line}${EOL}`);
        });
    });

    //Generate Typescript Client
    //TODO: Design schema that ts source creator understand 

}

main();