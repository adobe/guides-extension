/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import repository_panel from "./repository_panel";
import controllerId from "./review_comment";
import inline_extend from "./inline_extend";
import topic_reviews_extend from "./topic_reviews_extend";
export { default as repository_panel } from "./repository_panel";
import annotation_extension from "./annotation_extension";
window.addEventListener('tcx-loaded',()=>{
    /**
   * Registers a controller
   * @constructor
   * @param {string} id - The component Id to be registered
   * @param {string} extension - The extension component to be registered
   */
tcx?.extension?.register("repository_panel", repository_panel);
    tcx?.extension?.register(controllerId.id, controllerId);
  tcx?.extension?.register(inline_extend.id, inline_extend);
  tcx?.extension?.register(topic_reviews_extend.id, topic_reviews_extend);
  tcx?.extension?.register(annotation_extension.id, annotation_extension);
  
    //register the component in the extesion namespace of tcx
    //without this we cannot insert any component
  })