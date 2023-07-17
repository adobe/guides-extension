---
sidebar_position: 2
---

# Customisations

Let us take an example of the annotation_toolbox used in review.

```JSON
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

Let us add a button to take us back to the login page here.