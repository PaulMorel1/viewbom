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

// count the number of components
const count = bom.components.length;

// find any duplicates
let duplicateCount = 0;
let filteredComponents = [];
let histogram = {};
for(component of bom.components) {
  if(!histogram[component.name]) {
    histogram[component.name] = { ...component, versions: [component.version] };
  } else {
    histogram[component.name].versions.push(component.version);
  }
}

// push components into filteredComponents array
for(key in histogram) {
  filteredComponents.push({ name: key, versions: histogram[key].versions.join(", "), externalReferences: histogram[key].externalReferences });

  // if there are multiple versions of this package, then count it
  if(Array.isArray(histogram[key].versions) && histogram[key].versions.length > 1) {
    duplicateCount++;
  }
}

// set up the values and template
const values = { component: bom.metadata.component, components: filteredComponents, count, duplicateCount };
const template = fs.readFileSync("templates/page.html", 'utf8');

// render the template
const output = mustache.render(template, values);

// write to a file
fs.writeFileSync(outputFile, output);

process.exit(0);