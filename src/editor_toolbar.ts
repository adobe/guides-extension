import { VIEW_STATE } from "./review_app_examples/review_comment"

const editorToolbarExtend = {
    id: "editor_toolbar",
    view: {
        items: [
            {
                component: "div",
                target: {
                    key:"title",value: "Insert Numbered List",                    
                    viewState: VIEW_STATE.REPLACE
                }
            },
            {
                {
                    "component": "button",
                    "icon": "textParagraph",
                    "variant": "action",
                    "quiet": true,
                    "title": "Insert Paragraph",
                    "on-click": "INSERT_P"
                },
                target: {
                    key:"title",value: "Insert Paragraph",                    
                    viewState: VIEW_STATE.REPLACE
                }
            },
                  {
        "component": "button",
        "icon": "fileHTML",
        "variant": "action",
        "quiet": true,
        "title": "URL Link Customisation",
        "on-click": "openExternalLinkDialog",
        target: {
          key: "title", value: "Insert Bulleted List",
          viewState: VIEW_STATE.REPLACE
        }
      }
        ]
    },
    controller: {
        init: function() {
            console.log(this.getValue("canUndo"))
            this.subscribeAppEvent({
              key: "editor.preview_rendered",
              next: async function (e) {
                console.log(this.getValue("canUndo"))
              }.bind(this)
            })
        },
        INSERT_P(){
            this.appEventHandlerNext("AUTHOR_INSERT_ELEMENT",  "p" )
        },
      openExternalLinkDialog() {
      tcx.eventHandler.next("AUTHOR_INSERT_ELEMENT",
        {
          args:"<xref href='' scope='external' format = 'dita' ></xref>",activeTabId:"conkey_reference"
        }
      )
    }
    }
}

export default editorToolbarExtend;
