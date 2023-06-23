# guides-extension [![NPM version](https://img.shields.io/npm/v/is-even.svg?style=flat)](https://www.npmjs.com/package/is-even)

> This is a starting point for creating extension Adobe AEM Guides. Minimum required guides version is 4.3.

You can use this project as a starting point by downloading this from the repo or running the following command.
```bash
npx @adobe/create-guides-extension
```

## Install

Build with [npm](https://www.npmjs.com/):

```sh
$ npm run build
```
### Adding Assets to Clientlibs
When you run build command this will produce js and css in the /build folder put those in the <a name="clientlibs">clientlibs</a> category.

```
Aem Guides  - apps.fmdita.tcx
Guides Review  - apps.fmdita.review
```
## Extension Directory structure
```
├── src
│   ├── **/*ts // you will have various extension files here and register them 
│   ├── index.ts
├── dist
│   ├── gudies-extension.js // you can either choose es modulde (this one) or .cjs(other one) file
│   ├── gudies-extension.umd.cjs
│   ├── build.css // this is your tailwind css output
├── node_modules
├── package.json
├── package-lock.json 
└── .gitignore
└── buildCSS.mjs // for creating tailwind classes
└── vite.config.js // config for specifying TS and javascript build options
└── taliwind.config.js // config for tailwind we can add custom config for a design system here
```
## Extension creation

You will have window.tcx or tcx available as a global object that you'll be interfacing with.

Create a object of type Extension.
```js
const viewJSON = {
    items: [ //required key with array
      {
        component: 'label',
        // fields can have @ symbol which tells the framework we have an observable value.
        //@extraProp is an ObservableMap created for adding custom keys so that they don't conflict with existing keys.
        label: '@extraProps.commentUniqId',
        extraclass: 'commentUniqId',
        on-click:"handleLabelClick",
        target: {//target object with required key,value fields
          key: 'extraclass',
          value: 'user-image',
          viewState: VIEW_STATE.PREPEND,//specifiying how you want your view to be inserted
        },
      },
    ]
}

const extension = {
    view: viewJSON,
    controller:{
        init:(){
            //initialization code for your component
        },
    handleLabelClick:(args){
        //event listener attached to the json
    }
    }
}
```

Register it using the register method in extension object.

```js
tcx?.extension?.register("<component_name>", extension);
```
Working examples are provided in the src directory.

## CSS
For the consistency we provide the component already styled. The inserted JSON will have inherent styles applied to it
The primary way to manage css is through the extraClass key in the extensions. 
```js
{    
    "view":{
        items:[
            {
                compoenent:"button",
                extraClass:"underline bg-red",
            }
        ]
    }
}

```
You can put custom styles with CSS classes by adding a css file to [clientlibs](#clientlibs). During the build we also create [Tailwind](https://tailwindcss.com/docs/utility-first) output for the utility classes in tailwind. The config for the same can be found at [tailwind.config.js](./tailwind.config.js)

