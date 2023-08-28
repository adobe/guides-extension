---
sidebar_position: 1
---


# Widgets

Multiple basic components, as discussed in the Components section can be combined to make a widget. 
Widgets can be used to make a new "more complex" component, or give structure to items of a component.

Let's dive into the concept of a widget!

We will start by making a simple widget to display a list of languages.

```js title="basicWidget.js"

const widgetJSON =  {
    "component": "div", 
    "id": "widget_languages", 
    "items": [ // adding components to the widget
        {
            "component": "div",
            "items": [
                {
                    "component": "icon",
                    "icon": "info"
                },
                {
                    "component": "label",
                    "label": "List of some languages"
                }
            ]
        },
        {
            "component": "list",
            "data": "@languages"
        }
    ]
},
```

Here, `@languages` is an array defined in the model of `widget_languages` as: ["English", "French", "Hindi", "Spanish", "Urdu"]

The rendered basic widget will look like this:

![basic_widget](imgs/basic_widget.png "Basic widget")
