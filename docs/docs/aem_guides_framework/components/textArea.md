---
sidebar_position: 3
---

# Text Field and Text Area

To take text as an input, we use the components, text field and text area.
The text area component in JUI represents an html `<textarea/>`.

```js title="textArea.js"

const textAreaJSON =  {
    "component": "textarea", //tells the component name
    "id": "input_name", // can be used to give a unique identifier to a component
    "data": "@name", // the variable storing the inputted text
    "on-keyup": {
        "name": "submitName",
        "eventArgs": {
            "keys": [
            "ENTER"
            ]
        }
    },
},

```
Here, `on-keyup` is the syntax for invoking the commands in the controllers.
This will produce a textArea where pressing ENTER will call the event `submitName`

The rendered text-area will look like this:

![text-area](./imgs/text_area.png "Text area")