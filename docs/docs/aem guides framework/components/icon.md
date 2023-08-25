---
sidebar_position: 4
---

# Icon

To display an icon we use the component, icon.
The text area component in JUI represents an html `<icon/>`.

Icons available at [Adobe Spectrum Icons](https://spectrum.adobe.com/page/icons/) are compatible with our app. 

```js title="icon.js"

const iconJSON =  {
    "component": "icon", //tells the component name
    "icon": "info", // name of the icon to be used
    "size": "S", // size of the icon
    "title": "Information" // tooltip corresponding to the icon.
},

```

icons can also be added to buttons. 

The rendered icon will look like this:

![icon](./imgs/info_icon.png "Icon")
