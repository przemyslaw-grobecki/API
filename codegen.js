import { compile, compileFromFile } from 'json-schema-to-typescript'
import fs from 'fs';
import path from 'path';

const workingDirectory = process.cwd();
const primitives = fs.readdirSync(`${workingDirectory}/primitives`);
const resources = fs.readdirSync(`${workingDirectory}/resources`);

//Generate primitives
primitives.forEach(primitive => {
    console.log(primitive);
    compileFromFile(`${workingDirectory}/primitives/${primitive}`)
        .then(ts => fs.writeFileSync(`${workingDirectory}/generated/primitives/${primitive.split('.')[0]}.d.ts`, ts));
})

//Generate resources
resources.forEach(resource => {
    console.log(resource);
    compileFromFile(`${workingDirectory}/resources/${resource}`)
        .then(ts => fs.writeFileSync(`${workingDirectory}/generated/resources/${resource.split('.')[0]}.d.ts`, ts));
})
