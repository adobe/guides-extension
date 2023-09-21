---
sidebar_position: 3
---

# AEM Guides Extension Package Directory structure

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
├── jsons // jsons for the aem app
│   ├── context_menus // jsons for the context menus
│   ├── review_app // jsons for the review app
│   ├── xmleditor // jsons for xmleditor


```

### /src
```
├── src
│   ├── **/*{js,ts}
│   ├── index.ts
```
The source directory will contain the typescript or javascript files for your extension. The index.ts file is the entry point for your extension. You can import all your components here and export them as a single object. This object will be used by the extension to render the components.

### /dist

This is the final build directory. This contains the final JS and CSS, that needs to be copied to the AEM

```
├── dist
│   ├── gudies-extension.js // you can either choose es module (this one) or .cjs(other one) file
│   ├── gudies-extension.umd.cjs
│   ├── build.css // this is your tailwind css output

```

### /jsons
This directory contains the JSONs for the various views. You can use these JSONs to identify the targets and customise the view.

```
├── jsons // jsons for the aem app
│   ├── context_menus // jsons for the context menus
│   ├── review_app // jsons for the review app
│   ├── xmleditor // jsons for xmleditor

```
