export enum VIEW_STATE {
    APPEND = 'append',
    PREPEND = 'prepend',
    REPLACE = 'replace',
}

const items = [
    {
      "displayName": "Community",
      "data": {
        "eventid": "getAEMGuidesSupport"
      },
      "icon": "userGroup",
    },
    {
      "displayName": "Documentation",
      "data": {
        "eventid": "getGuidesDocumentation"
      },
      "icon": "book",
    },
	{
      "displayName": "Video Tutorials",
      "data": {
        "eventid": "getGuidesTutorials"
      },
      "icon": "visit",
    }
]

const topbarExtend = {
    id: "topbar",
    view: {
        items: [
            {
                "component": "button",
                "icon": "help",
                "variant": "action",
                "quiet": true,
                "title": "Help and Support",
                "on-click": "showHelpOptions",
                target: {
                    key: "title", value: "Close",
                    viewState: VIEW_STATE.PREPEND
                }
            },
        ]
    },
    controller: {
		init(){
            console.log("topbar customized");
        },
		
		showHelpOptions(opts) {
			const rect = opts.domEvent.target.getClientRects()[0]
			tcx.eventHandler.next(tcx.eventHandler.KEYS.CONTEXT_MENU_SHOW, {
				menuX: rect.x,
				menuY: rect.bottom,
				items: items,
				eventHandler: this.eventHandler
			})
		},
		
		getAEMGuidesSupport() {
			window.open("https://experienceleaguecommunities.adobe.com/t5/experience-manager-guides/bd-p/xml-documentation-qanda", "_blank");
		},
		
		getGuidesDocumentation() {
			window.open("https://experienceleague.adobe.com/docs/experience-manager-guides-learn/tutorials/user-guide/about-aem-guide/intro.html?lang=en", "_blank");
		},
		
		getGuidesTutorials() {
			window.open("https://experienceleague.adobe.com/docs/experience-manager-guides-learn/tutorials/overview.html?lang=en", "_blank");
		}
    }
}


export default topbarExtend
window.addEventListener('tcx-loaded', () => {
    tcx?.extension?.register(topbarExtend.id, topbarExtend);
})