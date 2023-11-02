import { VIEW_STATE } from "./review_app_examples/review_comment";
const topic_general = {
  id: "topic_general_properties",
  view: {
    items: [
      {
        component: "label",
        label: "Last Process Date",
        extraclass: "spectrum-FieldLabel",
        target: {
          key: "data",
          value: "modifiedOn",
          viewState: VIEW_STATE.APPEND,
        },
      },
      {
        component: "label",

        label: "@extraProps.data",
        target: {
          key: "label",
          value: "Last Process Date",
          viewState: VIEW_STATE.APPEND,
        },
      },
    ],
  },
  controller: {
    init: function () {
      this.subscribe(
        {
          key: tcx.eventHandler.KEYS.APP_ACTIVE_DOCUMENT_CHANGED,
          next: async function () {
            // this.model.filePath &&
            //   tcx.api
            //     .getMetadata(this.model.filePath)
            //    .subscribe((val) => console.log(val));
            const path = this.model.filePath;
            const servletUrl = `/bin/processtime?path=${encodeURIComponent(
              path
            )}`;
            const result = await fetch(servletUrl)
              .then(function (t) {
                if (t.ok) return t.text();
                throw new Error("Network response was not ok.");
              })

              .catch(function (t) {
                console.error("Fetch error:", t);
              });
            console.log(result);
            this.model.extraProps.set("data", result);
            const value = this.model.extraProps.get("data");
            console.log("hello " + value);
          }.bind(this),
        },
        tcx.eventHandler
      );
    },
  },
};

export default topic_general;
window.addEventListener("tcx-loaded", () => {
  tcx?.extension?.register(topic_general.id, topic_general);
});
