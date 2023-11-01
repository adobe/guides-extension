import { VIEW_STATE } from "./review_app_examples/review_comment"
import axios from "axios";
const fileOptions = {
  id: "file_options",
  contextMenuWidget: "repository_panel",
  view: {
    items: [
      {
        component: "div",
        target: {
          key: "displayName",
          value: "Delete",
          viewState: VIEW_STATE.REPLACE,
        },
      },
      {
        component: "div",
        target: {
          key: "displayName",
          value: "Edit",
          viewState: VIEW_STATE.REPLACE,
        },
      },
      {
        displayName: "Download",
        data: {
          eventid: "downloadFile",
        },
        icon: "downloadFromCloud",
        class: "menu-separator",
        target: {
          key: "displayName",
          value: "Duplicate",
          viewState: VIEW_STATE.REPLACE,
        },
      },
      {
        displayName: "Reprocess Asset",
        data: {
          eventid: "reprocessAssetEvent",
        },
        icon: "refresh",
        class: "menu-separator",
        target: {
          key: "displayName",
          value: "Download",
          viewState: VIEW_STATE.APPEND,
        },
      },
    ],
  },

  controller: {
    downloadFile() {
      const path = this.model.selectedItem.path;
      this.loader.loadDitaFile(path).then((file) => {
        function download_file(name, contents) {
          const mime_type = "text/plain";

          const blob = new Blob([contents], { type: mime_type });

          const dlink = document.createElement("a");
          dlink.download = name;
          dlink.href = window.URL.createObjectURL(blob);
          dlink.onclick = function () {
            // revokeObjectURL needs a delay to work properly
            const that = this;
            setTimeout(function () {
              window.URL.revokeObjectURL(that.href);
            }, 1500);
          };

          dlink.click();
          dlink.remove();
        }
        download_file(path, file.xml);
      });
    },
    reprocessAssetEvent() {
      const path = this.model.selectedItem.path;
      const servletUrl = `/bin/invoke/workflow?path=${encodeURIComponent(
        path
      )}`;
      // tcx.util.showSuccess("123");

      fetch(servletUrl)
        .then(function (t) {
          if (t.ok) return t.text();
          throw new Error("Network response was not ok.");
        })
        .then(function (t) {
          tcx.util.showSuccess("Asset Reprocess Successful");
          //alert("Asset Reprocess Successful" + t);
        })
        .catch(function (t) {
          console.error("Fetch error:", t);
        });
    },
  },
};

export default fileOptions
window.addEventListener("tcx-loaded", () => {
  tcx?.extension?.register(fileOptions.id, fileOptions);
});
