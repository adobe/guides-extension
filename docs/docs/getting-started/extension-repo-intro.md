---
sidebar_position: 2
---

# Extension Repository Introduction
## Extension Directory structure

```
├── src
│   ├── **/*{js,ts}
│   ├── index.ts
├── dist
│   ├── guides-extension.js
│   ├── guides-extension.umd.cjs
│   ├── build.css
├── node_modules
├── package.json
├── package-lock.json 
└── .gitignore
└── buildCSS.mjs // for creating tailwind classes
└── vite.config.js // config for specifying TS and javascript build options
└── taliwind.config.js // config for tailwind we can add custom config for a design system here
```

### /src
```
├── src
│   ├── **/*{js,ts}
│   ├── index.ts
```
The source directory will contain the typescript or javascript files for your extension. The index.ts file is the entry point for your extension. You can import all your components here and export them as a single object. This object will be used by the extension to render the components.

> **_NOTE:_**  Without importing your component in index.ts your component will not be built into the output directory. Since we have [Vite.js](https://vitejs.dev/) as bundler. You are free to change the vite config but the support will be limited for the Guides Team for this.

### /dist

This is the build directory. You will find the css(from tailwind classes) and the javascript file

```
├── dist
│   ├── gudies-extension.js // you can either choose es module (this one) or .cjs(other one) file
│   ├── gudies-extension.umd.cjs
│   ├── build.css // this is your tailwind css output
```