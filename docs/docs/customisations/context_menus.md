---
sidebar_position: 3
---

# Customising Context Menus

The following context menus can be customised: 
- `file_options`
    controllers: 
    - `ditamap_viewer_controller`
    - `repository_panel_controller`
    - `collection_tree_controller`
    - `ditamap_viewer_item_controller`
    - `file_references_links_controller`
    - `fragment_references_links_controller`
    - `repository_search_controller`
    - `subject_scheme_tree_controller`

- `folder_options`
    controllers: 
    - `repository_panel_controller`
    - `collection_tree_controller`

- `collection_options`
    controllers: 
    - `collection_tree_controller`

- `map_view_options`
    controllers: 
    - `ditamap_viewer_controller`

- `baseline_panel_menu`
    controllers:
    - `baseline_panel`

- `preset_item_menu`
    controllers:
    - `preset_panel`

You can also create your own context menu by defining a new unique id.

Now each context menu has a `controller id` associated with it. This controller handles the `on-event` functionality for the various context menu options

Let us take an example to understand

```js title=customise_context_menu.js"
const fileOptions = {
    id: "file_options",
    contextMenuWidget: "repository_panel",
    view: {
            items: [
                {
                    component: "div",
                    target: {
                        key:"displayName",value: "Delete",                    
                        viewState: VIEW_STATE.REPLACE
                    }
                },
                {
                    component: "div",
                    target: {
                        key:"displayName",value: "Edit",                    
                        viewState: VIEW_STATE.REPLACE
                    }
                },
                {
                    "displayName": "Download",
                    "data": {
                      "eventid": "downloadFile"
                    },
                    "icon": "downloadFromCloud",
                    "class": "menu-separator",         
                    target: {
                        key:"displayName",value: "Duplicate",                    
                        viewState: VIEW_STATE.REPLACE
                    }
                },
            ]

    },

    controller: {
        downloadFile(){
            const path  = this.model.selectedItem.path
            this.loader.loadDitaFile(path).then((file) => {
              function download_file(name, contents) {
                const mime_type = "text/plain";
        
                const blob = new Blob([contents], {type: mime_type});
        
                const dlink = document.createElement('a');
                dlink.download = name;
                dlink.href = window.URL.createObjectURL(blob);
                dlink.onclick = function() {
                    // revokeObjectURL needs a delay to work properly
                    const that = this;
                    setTimeout(function() {
                        window.URL.revokeObjectURL(that.href);
                    }, 1500);
                };
        
                dlink.click();
                dlink.remove();
            }
            download_file(path,file.xml)
            });
          }
    }
}
```
Now let us understand what this code is doing.

1. `id` is used to identify the context menu we want to customise.
2. `contextMenuWidget` is used to define the `widget id` or the `component` which calls the context menu and handles the `events`.

The rest of it remains the same, whereby `view` is used to define the items, `target` identifies where to replace, append or prepend the option and the `contextMenuWidget` controller handles the `on-click` events.