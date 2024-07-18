const tabLeftPanel = {
    "id": "left_panel_container",
        "tabView" : {
            "id": "left_panel_container",
        "tabs": [
            {
                "component": "tab",
                "id": "new_tab_extension",
                "extraclass": "collection-panel-tab",
                "showClass": "@visibleTabs.collection_panel",
                "on-click": "tabClick",
                "icon": "collection",
                "title": "TEST EXTENSION",
                "label": "TEST EXTENSION",
                "prevTabID": "condition_panel"
            },
        ],
            "tabPanels":
        [
            {
                "component": "tabPanel",
                "tabId": "new_tab_extension",
                "showClass": "@visibleTabs.citation_panel",
                "items": [
                    {
                        "id": "annotation_toolbox"
                    }
                ],
            },
        ]
    }
}

export default tabLeftPanel