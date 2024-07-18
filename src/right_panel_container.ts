const rightPanel = {
    "id": "right_panel_container",
        "tabView" : {
            "id": "right_panel_container_tab",
        "tabs": [
            {
                "component": "tab",
                "id": "new_tab_extension",
                "on-click": "tabClick",
                "icon": "collection",
                "title": "TEST EXTENSION",
            },
        ],
            "tabPanels":
        [
            {
                "component": "tabPanel",
                "tabId": "new_tab_extension",
                "items": [
                    {
                        "component": "label",
                        "label": "New Tab Label",
                    }
                ],
            },
        ]
    }
}
export default rightPanel