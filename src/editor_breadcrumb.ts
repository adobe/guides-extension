import { VIEW_STATE } from "./review_app_examples/review_comment";

const authorOutlineElementMenu = {
    id: "author_outline_element",
    contextMenuWidget: "dita_editor_menu",
    view: {
      items: [
        {
          displayName: "Custom wrap element",
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
    controller: {
      customWrapClicked() {
       console.log('Custom context menu clicked');
      }, 
    },
};
export default authorOutlineElementMenu;
