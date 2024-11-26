const mapTranslation = {
  id: "map_translation_view",
  view: {},
  controller: {
    rowSelectionChanged: function (opts) {
      // Traverse through all the selected files on translation tab - where each selected file's docstate can be read 
      opts.data.rowIndex.find((r) => {
        const col = r.cols.find((col) => col.property.propName === "doc_state");
        // Condition to check if the docstate is in Draft for the selected row in translation tab then take action as you need. You can also change the condition to apply condition based on docstate value as needed
        if (col.items[0] === "Draft") {
          //checking is docstate is set to draft
          // uncomment the below line to disable the 'send to translation' button if document state is set to draft
          //tcx.appModel.disableTranslationButton = true;
          
        }
      });
    },
  },
};

export default mapTranslation;
