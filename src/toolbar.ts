import { VIEW_STATE } from "./review_app_examples/review_comment"

const topbarExtend = {
    id: "toolbar",
    view: {
        items: [
            {
                component: "div",
                target: {
                    key:"title",value: "Insert Element",                    
                    viewState: VIEW_STATE.REPLACE
                }
            },
            {
                component: "div",
                target: {
                    key:"title",value: "Insert Paragraph",                    
                    viewState: VIEW_STATE.REPLACE
                }
            },
            {
                component: "div",
                target: {
                    key:"title",value: "Insert Numbered List",                    
                    viewState: VIEW_STATE.REPLACE
                }
            },
            {
                component: "div",
                target: {
                    key:"title",value: "Insert Bulleted List",                    
                    viewState: VIEW_STATE.REPLACE
                }
            },
            {
                "component": "button",
                "extraclass": "insert-multimedia",
                "icon": "more",
                "variant": "action",
                "quiet": true,
                "holdAffordance": true,
                "title": "More Insert Options",
                "elementID": "toolbar_insert",
                "on-click": {
                    "name": "APP_SHOW_OPTIONS_POPOVER",
                    "args":{
                        "target": "toolbar_insert",
                        "extraclass": "new_options_buttons",
                        "items": [
                            {
                                "component": "button",
                                "icon": "add",
                                "variant": "action",
                                "quiet": true,
                                "title": "Insert Element",
								"extraclass":"new_options_button",
                                "on-click": "AUTHOR_SHOW_INSERT_ELEMENT_UI"
                            },
                            {
                                "component": "button",
                                "icon": "fileKey",
                                "variant": "action",
                                "quiet": true,
                                "title": "Insert Prolog Keyword",
								"extraclass":"new_options_button",
                                "on-click": "INSERT_KEYWORD"
                            },
                            {
                                "component": "button",
                                "icon": "textParagraph",
                                "variant": "action",
                                "quiet": true,
                                "title": "Insert Paragraph",
								"extraclass":"new_options_button",
                                "on-click": "INSERT_P"
                            },
                            {
                                "component": "button",
                                "icon": "textNumbered",
                                "variant": "action",
                                "quiet": true,
                                "title": "Insert Numbered List",
								"extraclass":"new_options_button",
                                "on-click": "AUTHOR_INSERT_REMOVE_NUMBERED_LIST"
                            },
                            {
                                "component": "button",
                                "icon": "textBulleted",
                                "variant": "action",
                                "quiet": true,
                                "title": "Insert Bulleted List",
								"extraclass":"new_options_button",
                                "on-click": "AUTHOR_INSERT_REMOVE_BULLETED_LIST"
                            },
                            {
                                "component": "button",
                                "icon": "table",
                                "variant": "action",
                                "quiet": true,
                                "title": "Insert Table",
								"extraclass":"new_options_button",
                                "on-click": "AUTHOR_INSERT_ELEMENT",
                            }
                        ]
                    },
                },
                target: {
                    key:"title",value: "Insert Table",                    
                    viewState: VIEW_STATE.REPLACE
                }
            },
        ]
    },
    controller: {

        INSERT_P(){
            this.next("AUTHOR_INSERT_ELEMENT",  "p" )
        },
		
		INSERT_KEYWORD() {
			var xmlString = '<prolog><metadata><keywords><keyword><?tcx-placeholder-text content="Add keyword here"?></keyword></keywords></metadata></prolog>';
			if (tcx.curEditor.editor.rootElement.findOne('[data-tcx-tag="shortdesc"]')!==null) {
				tcx.curEditor.editor.setElementSelection(tcx.curEditor.editor.rootElement.findOne('[data-tcx-tag="shortdesc"]'));
				tcx.eventHandler.next(tcx.eventHandler.KEYS.AUTHOR_INSERT_XML, {args: xmlString});
			} else if (tcx.curEditor.editor.rootElement.findOne('[data-tcx-tag="title"]')!==null) {
				tcx.curEditor.editor.setElementSelection(tcx.curEditor.editor.rootElement.findOne('[data-tcx-tag="title"]'));
				tcx.eventHandler.next(tcx.eventHandler.KEYS.AUTHOR_INSERT_XML, {args: xmlString});
			}
		}
    }
}

export default topbarExtend
window.addEventListener('tcx-loaded', () => {
    tcx?.extension?.register(topbarExtend.id, topbarExtend);
})
