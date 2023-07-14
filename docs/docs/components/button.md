---
sidebar_position: 1
---

# Button

The button component in JUI represents a html `<button/>`.

```js title="buttonJSON.js"
const buttonJSON = {
  component: "button",//tells the component name
  label: "Yes, login",//tells the text for the button
  variant: "cta",//tells the variants for the button which  provides default styles
  "on-click": "done",//tells what function to run after user clicks the button
};
const json ={
    "id": "annotation_toolbox",
    "component": "blockGroup",
    "extraclass": "review-commenting",
    "hide": "@disableCommenting",
    "items": [
        {
            "component": "buttonGroup",
            "extraclass": "review-annotations",
            "value": "@selectedAnnotation",
            "items": [
                {
                    "component": "button",
                    "icon": "highlight",
                    "title": "Highlight",
                    "value": "highlight",
                    "metadata": "highlight",
                    "on-click": "annotationSelected"
                },
                {
                    "component": "button",
                    "icon": "textStrikethrough",
                    "title": "Strikethrough",
                    "value": "strikethrough",
                    "metadata": "strikethrough",
                    "on-click": "annotationSelected"
                },
                {
                    "component": "button",
                    "icon": "textAdd",
                    "title": "Insert text",
                    "value": "insertext",
                    "metadata": "insertext",
                    "on-click": "annotationSelected"
                },
                {
                    "component": "button",
                    "icon": "comment",
                    "title": "Add comment",
                    "value": "addcomment",
                    "metadata": "addcomment",
                    "on-click": "annotationSelected"
                }
            ]
        }
    ]
}
```
This will produce a button with a label of `Yes, login`. The other properties includes but are not limited to variant,label,on-click.
> **_NOTE:_**  The `on-<events>` is the syntax for invoking the commands in the controllers.

