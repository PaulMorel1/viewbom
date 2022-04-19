# viewbom

A simple npx tool for viewing a cyclonedx bill of materials for a node project

## Why?

It's extremely easy to generate a [CycloneDX Bill of Materials](https://github.com/CycloneDX/cyclonedx-node-module) from a node project. It should be equally easy to view them and connect to resources about the packages in your BOM.

## How to use this?

1. First, install @cyclonedx/bom and viewbom.

```
```

2. Generate a bill of materials for your project. Run this in the root folder of your project.

```
npx @cyclonedx/bom . -o bom.json
```

3. Run viewbom.

```
npx @PaulMorel/viewbom
```

## Dependencies

1. [Mustache.js](https://www.npmjs.com/package/mustache)

## Thanks

Thanks to the following people for their help.

- Shahed Nasser's wonderful tutorial on how to create an npx tool: https://blog.shahednasser.com/how-to-create-a-npx-tool/