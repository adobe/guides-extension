export enum VIEW_STATE {
    APPEND = 'append',
    PREPEND = 'prepend',
    REPLACE = 'replace',
  }

const topbarExtend = {
    id: "topbar",
    view: {
        items: [
            {
                "component": "button",
                "icon": "highlight",
                "variant": "action",
                "quiet": true,
                "title": "Mark Approved",
                "on-click": "showOptions",
                target: {
                    key: "title", value: "Mark Approved",
                    viewState: VIEW_STATE.REPLACE
                }
            },
        ]
    },
    controller: {
    }
}

export default topbarExtend
window.addEventListener('tcx-loaded', () => {
    tcx?.extension?.register(topbarExtend.id, topbarExtend);
})