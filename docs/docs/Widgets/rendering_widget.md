---
sidebar_position: 2
---

# Rendering widgets

We can render a widget by referencing it using its `id`

To render th widget `widget_languages` anywhere in the app we can use the simple syntax:
```json
{
    "component": "widget",
    "id": "widget_languages"
}
```

Widgets can also be used to render complex items, say I want to render the list of contributors to each file.
Here, the widget can be constructed as: 

```js title="fileContributorsWidget.js"

const widgetJSON =  {
    component: "div", 
    id: "file_contributors", 
    items: [ // adding components to the widget
        {
            component: "div",
            items: [
                {
                    component: "icon",
                    icon: "file"
                },
                {
                    component: "label",
                    label: "@fileName"
                }
            ]
        },
        {
            component: "list",
            data: "@contributors",
            itemConfig: {
                component: "label"
            }
        }
    ]
},
```

Now to render a list of contributors for each file, we write the list as: 

```js title="fileContributorsList.js"
const listJSON = {
    component: "list"
    data: "@files"
    itemConfig: {
        component: "widget",
        id: "file_contributors"
    }
}
```

Here `@files` is a list of file objects containg fields
```typescript
- fileName: string
- contributors: Array<String>
```
