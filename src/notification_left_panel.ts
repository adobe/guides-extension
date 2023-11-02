import { VIEW_STATE } from "./review_app_examples/review_comment";

const notification_data_list = {
  id: "notification_data_list", //component Id
  view: {
    extraclass: "review-task-list",
    component: "blockGroup",
    items: [
      {
		  "id": "panel_header",
		  "component": "widget",
		  "hide": ["@noHeader"],
		  "inputModel": { "headerTitle": "My Open Tasks", "showOptions": false, "showSettings": false }
		},
      {
        component: "selectlist",
        data: "@extraProps.notificationData",
        "on-click": "handleIndexDataItemClick",
        itemConfig: {
          component: "label",
          extraclass: "review-task-list-item",
          label: "@name",
          metadata: "@path",
        },
      },
    ],
  },
  controller: {
    async init() {
      const servletUrl = `/bin/guides/inbox`;
      console.log("test");
      let output = await fetch(servletUrl)
        .then(function (t) {
          if (t.ok) return t.json();
          throw new Error("Network response was not ok.");
        })

        .catch(function (t) {
          console.error("Fetch error:", t);
        });
      console.log("test2");
      // result = (result || "").split("\n");
      this.model.extraProps.set("notificationData", output.result);

      console.log("result" + output);
    },
    handleIndexDataItemClick({ data } = {}) {
      window.open(
        this.model.extraProps.get("notificationData")[data]?.path,
        "_blank"
      );
    },
  },
};

export default notification_data_list;
window.addEventListener("tcx-loaded", () => {
  tcx?.extension?.register(notification_data_list.id, notification_data_list);
});
