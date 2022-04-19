#! /usr/bin/env node
const fs = require('fs'); // needed for reading & writing to files
const mustache = require('mustache'); // needed for rendering templates

/*
  viewBom
  by Evan X. Merz
  https://www.npmjs.com/package/viewbom

  viewBom is a dead simple package for converting a cyclonedx 
  software bill of materials into an html file. It also does
  a small amount of analysis.

  It exports three methods:
  1. analyze = analyzes a clyclonedx sbom as json
  2. renderToHtml = renders the analysis to an html string
  3. viewBom = run both of the above methods and save to a file

  For more about cyclonedx bill of materials,
  see https://www.npmjs.com/package/@cyclonedx/bom

  For more about mustache templating,
  see https://www.npmjs.com/package/mustache
*/

function analyze(bom) {
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

  // returned the analyzed bom
  return { component: bom.metadata.component, components: filteredComponents, count, duplicateCount };
}

function renderToHtml(analysis, templatePath) {
  const template = fs.readFileSync(templatePath, 'utf8');
  const output = mustache.render(template, analysis);
  return output;
}

function viewBom(inputFilePath, outputFilePath) {
  // get the arguments
  const args = process.argv.slice(2);
  const inputFile = inputFilePath || args[0] || "example/bom.json";
  const outputFile = outputFilePath || args[1] || "output.html";

  // read the json in the input file
  const rawdata = fs.readFileSync(inputFile);
  const bom = JSON.parse(rawdata);

  const analysis = analyze(bom);
  const html = renderToHtml(analysis, "templates/page.html")

  // write to a file
  fs.writeFileSync(outputFile, html);

  process.exit(0);
}

module.exports = [
  analyze,
  renderToHtml,
  viewBom,
];

// If called using npx, then run viewBom. Otherwise, do nothing
// See https://stackoverflow.com/questions/6398196/detect-if-called-through-require-or-directly-by-command-line
if (require.main === module) {
  viewBom();
}

