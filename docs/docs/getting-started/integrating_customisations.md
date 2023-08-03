---
sidebar_position: 3
---

Extensions give you the opportunity to customise your AEM Guides app to better suit your needs. This extension framework is supported with AEM Guides v4.3 onwards.

# Installation

The easiest way to bootstrap AEM Guides framework installation is through cli
```bash
npx @adobe/create-guides-extension
```

> **_NOTE:_**  Requires git & npm 

# Adding customisation code

1. Add code files for each component you want to extend in the `src/` directory. Some sample files have already been added for you.
2. Now in the `index.ts` file located in the `src/` directory :
- Add the corresponding imports for the customisations you want to add in your build.
- Add the imports to `window.extension`
- Register the customised component's `id` and corresponding import to `tcx extensions`

# Building the customised code

- Run `npm run build` in the root directory. You will get 3 files in the directory, `dist/`:
    - `build.css`
    - `guides-extension.js`
    - `guides-extension.umd.cjs`

- Go to `CRXDE` `crx/de/index.jsp#/`
- Under the `apps` folder, make a new node of the type `cq:ClientLibraryFolder`
- In the `properties` of the node, select `Multi` add the following property
    `Name`: categories
    `Type`: String []
    `Value`: apps.fmdita.review_overrides, apps.fmdita.xml_editor.page_overrides
- To add the built js, create a new file, say, `tcx1.js` in the above created node. Here, add the code from `dist/guides-extension.umd.cjs` or `dist/guides-extension.js`. Now create a new file `js.txt`, here we add the name of our js file, which in this case would be:
```t
#base=.
tcx1.js
```
- To add the built css, create a new file, say, `tcx1.css` in the above created node. Here, add the code from `dist/build.css`. Now create a new file `css.txt`, here we add the name of our css file, which in this case would be:
```t
#base=.
tcx1.css
```
- Do a `shift + refresh` to load the app with the customisations!

