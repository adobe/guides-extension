import { VIEW_STATE } from "./review_app_examples/review_comment";
import axios from "axios";
const folderOptions = {
  id: "folder_options",
  contextMenuWidget: "repository_panel",
  view: {
    items: [
      {
        component: "widget",
        id: "customditamap",
        target: {
          key: "displayName",
          value: "DITA Map",
          viewState: VIEW_STATE.REPLACE,
        },
      },
    ],
  },
};

export default folderOptions;
window.addEventListener("tcx-loaded", () => {
  tcx?.extension?.register(folderOptions.id, folderOptions);
});
