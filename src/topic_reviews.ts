/* eslint-disable no-debugger */
import inline_extend from './inline_review_panel';
import { updatedProcessComments } from './inline_review_panel';

const topic_reviews_extend =  {
  id: 'topic_reviews',
  model: {
    deps: [],
  },
  controller: {
    ...inline_extend.controller, 
    init: function () {
      this.model.extraProps.set("commentCount", {})
      tcx.model.subscribeVal(tcx.model.KEYS.REVIEW_DATA, (reviewData) => {
        for (let topicId of reviewData.topicsinReview) {
          topicId = topicId.toString()
          tcx.commentStore.onProcessEvent(topicId, (events) => updatedProcessComments.call(this, events, topicId))
        }
      })
    },

  },
}

export default topic_reviews_extend

window.addEventListener('tcx-loaded',()=>{
  tcx?.extension?.register(topic_reviews_extend.id, topic_reviews_extend);
})