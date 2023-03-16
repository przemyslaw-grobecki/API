import {
    quicktype,
    InputData,
    jsonInputForTargetLanguage,
    JSONSchemaInput,
    FetchingJSONSchemaStore
} from 'quicktype-core';
import fs from 'fs';
import { EOL } from 'os';

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
        const fileContent = fs.readFileSync(`${workingDirectory}/primitives/${primitive}`, 'utf8');
        const typescriptInterfaceContent = await quicktypeJSONSchema("typescript", primitive.split('.')[0], fileContent);
        //console.log(typescriptInterfaceContent.lines)
        fs.writeFileSync(`${workingDirectory}/generated/primitives/${primitive.split('.')[0]}.d.ts`, "");
        typescriptInterfaceContent.lines.forEach(line => {
            fs.appendFileSync(`${workingDirectory}/generated/primitives/${primitive.split('.')[0]}.d.ts`, `${line}${EOL}`);
        });
    });

    //Generate resources
    resources.forEach(async resource => {
        console.log(resource);
        const fileContent = fs.readFileSync(`${workingDirectory}/resources/${resource}`, 'utf8');
        const typescriptInterfaceContent = await quicktypeJSONSchema("typescript", resource.split('.')[0], fileContent);
        //console.log(typescriptInterfaceContent.lines)
        fs.writeFileSync(`${workingDirectory}/generated/resources/${resource.split('.')[0]}.d.ts`, "");
        typescriptInterfaceContent.lines.forEach(line => {
            fs.appendFileSync(`${workingDirectory}/generated/resources/${resource.split('.')[0]}.d.ts`, `${line}${EOL}`);
        });
    })


    //const { lines: pythonPerson } = await quicktypeJSONSchema("typescript", "Pokemon", jsonSchemaString);
    //console.log(pythonPerson.join("\n"));
}

main();