# viewbom

A simple npx tool for viewing a cyclonedx bill of materials for a node project

## Why?

It's extremely easy to generate a [CycloneDX Bill of Materials](https://github.com/CycloneDX/cyclonedx-node-module) from a node project. It should be equally easy to view them and connect to resources about the packages in your BOM.

## How to use this?

1. Generate a bill of materials for your project. Run this in the root folder of your project.

```
npm install @cyclonedx/bom -g
npx @cyclonedx/bom . -o bom.json
```

2. Run viewbom.

```
npm install viewbom -g
npx viewbom bom.json output.html
```

This will take `bom.json` as input and generate `output.html`. Open `output.html` in a browser to view your bill of materials.

## Dependencies

1. [Mustache.js](https://www.npmjs.com/package/mustache)

## Thanks

Thanks to the following people for their help.

- Shahed Nasser's wonderful tutorial on how to create an npx tool: https://blog.shahednasser.com/how-to-create-a-npx-tool/