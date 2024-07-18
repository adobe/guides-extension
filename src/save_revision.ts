import { VIEW_STATE } from "./customLeftPanel"

const saveRevision = {
    id: 'save_revision',
    view: {
        items: [
            {
                component: "button",
                label: 'publish',
                target: {
                    key: 'label',
                    value: 'Save',
                    viewState: VIEW_STATE.APPEND
                }
            }
        ]
    }
}

export default saveRevision