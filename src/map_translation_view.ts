import { VIEW_STATE } from "./customLeftPanel";

const mapTranslation = {
  id: "map_translation_view",
  view: {
    items: [
      {
        target: {
          key: "component",
          value: "table",
        },
      },
    ],
  },

  controller: {
    rowSelectionChanged: function (opts) {
      opts.data.rowIndex.find((r) => {
        const col = r.cols.find((col) => col.property.propName === "doc_state");
        if (col.items[0] === "Draft") {           //checking is docstate is set to draft

          // tcx.appModel.disableTranslationButton = true;
		  
          // uncomment the above line to disable the 'send to translation' button if document state is set to draft
        }
      });
    },
  },
};
export default mapTranslation;
