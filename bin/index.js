#! /usr/bin/env node

const fs = require('fs'); // needed for reading & writing to files
const mustache = require('mustache'); // needed for rendering templates

// get the arguments
const args = process.argv.slice(2);
const inputFile = args[0] || "example/bom.json";
const outputFile = args[1] || "output.html";

// read the json in the input file
const rawdata = fs.readFileSync(inputFile);
const bom = JSON.parse(rawdata);

// set up the values and template
const values = { component: bom.metadata.component, components: bom.components, count: bom.components.length };
const template = fs.readFileSync("templates/page.html", 'utf8');

// render the template
const output = mustache.render(template, values);

// write to a file
fs.writeFileSync(outputFile, output);

process.exit(0);