/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import reviewComment from "./review_app_examples/review_comment";
import inline_extend from "./review_app_examples/inline_review_panel";
import topic_reviews_extend from "./review_app_examples/topic_reviews";
import commentReply from "./review_app_examples/comment_reply";
import acceptWithModification from "./review_app_examples/accept_with_modification_dialog";
import topbarExtend from "./toolbar";
import fileOptions from "./file_options";

window.extension = {
  [reviewComment.id]: reviewComment,
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
  tcx?.extension?.register(reviewComment.id, reviewComment);
  tcx?.extension?.register(inline_extend.id, inline_extend);
  tcx?.extension?.register(topic_reviews_extend.id, topic_reviews_extend);
  tcx?.extension?.register(commentReply.id, commentReply);
  tcx?.extension?.register(acceptWithModification.id, acceptWithModification);
  tcx?.extension?.register(topbarExtend.id, topbarExtend);
  tcx?.extension?.register(fileOptions.id, fileOptions);
  
    //register the component in the extesion namespace of tcx
    //without this we cannot insert any component
  })