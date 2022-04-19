#! /usr/bin/env node

const fs = require('fs');
const mustache = require('mustache');

// get the arguments
const args = process.argv.slice(2);
const inputFile = args[0] || "example/bom.json";
const outputFile = args[1] || "output.html";

// read the json in the input file
const rawdata = fs.readFileSync(inputFile);
const bom = JSON.parse(rawdata);

const values = { component: bom.metadata.component, components: bom.components };
const template = fs.readFileSync("templates/page.html", 'utf8');

const output = mustache.render(template, values);

console.log({ output_type: (typeof output) });


fs.writeFileSync(outputFile, output);

process.exit(0); // no errors occurred