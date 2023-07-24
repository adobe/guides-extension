/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import controllerId from "./review_comment";
import inline_extend from "./inline_review_panel";
import topic_reviews_extend from "./topic_reviews";
import commentReply from "./comment_reply";
import acceptWithModification from "./accept_with_modification_dialog";
import topbarExtend from "./toolbar";
import fileOptions from "./file_options";

window.extension = {
  [controllerId.id]: controllerId,
  [inline_extend.id]: inline_extend,
  [topic_reviews_extend.id]: topic_reviews_extend,
  [commentReply.id]: commentReply,
  [acceptWithModification.id]: acceptWithModification,
  [topbarExtend.id]: topbarExtend,
  [fileOptions.id]: fileOptions,
}

window.addEventListener('tcx-loaded',()=>{
    /**
   * Registers a controller
   * @constructor
   * @param {string} id - The component Id to be registered
   * @param {string} extension - The extension component to be registered
   */
  tcx?.extension?.register(controllerId.id, controllerId);
  tcx?.extension?.register(inline_extend.id, inline_extend);
  tcx?.extension?.register(topic_reviews_extend.id, topic_reviews_extend);
  tcx?.extension?.register(commentReply.id, commentReply);
  tcx?.extension?.register(acceptWithModification.id, acceptWithModification);
  tcx?.extension?.register(topbarExtend.id, topbarExtend);
  tcx?.extension?.register(fileOptions.id, fileOptions);
  
    //register the component in the extesion namespace of tcx
    //without this we cannot insert any component
  })