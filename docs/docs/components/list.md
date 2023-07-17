---
sidebar_position: 5
---

# List

To display a list, we use the component list.

```js title="list.js"

const listJSON =  {
    component: "list", //tells the component name
    data: "@languages", // an array of list items
    itemConfig: { // used to define the structure of each list item
        component: "label"
    }
},

```
Usually itemConfig is a `widget`. To learn more about widgets click here (ADD LINK)