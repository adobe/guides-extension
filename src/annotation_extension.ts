export default {
    id:"annotation_toolbox",
    view:{
        items:[
            {
                "component": "button",
                "icon": "highlight",
                "title": "Highlight",
                "value": "highlight",
                "metadata": "highlight",
                "on-click": "highlight",
                target:{
                    key:"value",
                    value:"addcomment"
                },
            },  
        ]
    },
}