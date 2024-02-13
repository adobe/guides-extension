import { VIEW_STATE } from "./review_app_examples/review_comment";
import axios from "axios";
const operation = "CRUDPermissions";
const paths = "/content/dam";

// Construct the URL with the query parameters
const url = `/bin/rolesapi?operation=${operation}&paths=${encodeURIComponent(
  paths
)}`;
const rolesApiResponse = fetch(url).then((response) => response.json());

let repositoryController = null;
document.addEventListener("DOMContentLoaded", () => {
  tcx.ready(() => {
    let oldOpenMenu =
      tcx.viewManager.controllers.repository_panel.prototype.openMenu;
    tcx.viewManager.controllers.repository_panel.prototype.openMenu =
      function () {
        repositoryController = this;
        oldOpenMenu.apply(this, arguments);
      };
  });
});
const folderOptions = {
  id: "customditamap",

  view: {
    component: "button",
    quiet: true,
    icon: "breakdownAdd",
    label: "DITA Map",
    "on-click": "createNewDitaMap",
    show: "@extraProps.isAuthor",
  },
  controller: {
    init: function () {
      this.model.extraProps.set("isAuthor", false);

      rolesApiResponse.then((result) => {
        console.log(result);
        this.model.extraProps.set(
          "isAuthor",
          result["/content/dam"].roles.authors
        );

        console.log("testresult" + result["/content/dam"].roles.authors);
      });
    },
    createNewDitaMap() {
      repositoryController && repositoryController.next("create_new.map");
    },
  },
};
export default folderOptions;
window.addEventListener("tcx-loaded", () => {
  tcx?.extension?.register(folderOptions.id, folderOptions);
});
