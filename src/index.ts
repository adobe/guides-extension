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
import left_panel_container from "./left_panel_container";
import annotation_extension from "./review_app_examples/annotation_extension";
import rightPanel from "./right_panel_container";
import saveRevision from "./save_revision";
import other_attribute_list_item from "./editor/other_attribute_list_item";
import mapTranslation from "./map_translation_view";
import editorToolbarExtend from "./editor_toolbar";
import html5PresetGeneral from './html5_preset_general';
import authorOutlineElementMenu from "./editor_breadcrumb";


window.extension = {
  [reviewComment.id]: reviewComment,
  [inline_extend.id]: inline_extend,
  [topic_reviews_extend.id]: topic_reviews_extend,
  [commentReply.id]: commentReply,
  [acceptWithModification.id]: acceptWithModification,
  [topbarExtend.id]: topbarExtend,
  [fileOptions.id]: fileOptions,
  [left_panel_container.id]: left_panel_container,
  [rightPanel.id]: rightPanel,
  [annotation_extension.id]: annotation_extension,
  [saveRevision.id]: saveRevision,
  [other_attribute_list_item.id]: other_attribute_list_item,
  [mapTranslation.id]: mapTranslation,
  [editorToolbarExtend.id]: editorToolbarExtend,
  [html5PresetGeneral.id]: html5PresetGeneral,
  [authorOutlineElementMenu.id]: authorOutlineElementMenu
};
