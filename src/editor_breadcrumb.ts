import { VIEW_STATE } from "./review_app_examples/review_comment";

const authorOutlineElementMenu = {
    id: "author_outline_element",
    contextMenuWidget: "dita_editor_menu",
    view: {
      items: [
        {
          displayName: "custom Wrap Element",
          data: {
            eventid: "customWrapClicked",
          },
          icon: "textSpaceAfter",
          readOnly: true,
          target: {
            key: "displayName",
            value: "Wrap Element",
            viewState: VIEW_STATE.APPEND,
          },
        },
      ],
    },
    controller: {
      customWrapClicked() {
        console.log('Custom row clicked')
      }, 
    },
};

export default authorOutlineElementMenu;

export const authorOutlineElementMenu2 = {
   id: "author_outline_element",
   contextMenuWidget: "dita_editor_menu",
    view: {
      items: [
        {
         displayName: "Custom Cut",
         data: {
            "eventid": "AUTHOR_CUT"
          },
          icon: "cut",
          target: {
            key: "displayName",
            value: "Cut",
            viewState: VIEW_STATE.REPLACE,
          },
        },
      ],
    },
};
