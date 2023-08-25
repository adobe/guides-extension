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
                        "component": "label",
                        "id": "Test Tab Panel",
                    }
                ],
            },
        ]
    }
}
export default tabLeftPanel
window.addEventListener('tcx-loaded', () => {
    tcx?.extension?.register(tabLeftPanel.id, tabLeftPanel);
})