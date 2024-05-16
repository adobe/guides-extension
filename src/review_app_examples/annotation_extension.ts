import { VIEW_STATE } from './review_comment'

export default {
  id: 'annotation_toolbox',
  view: {
    items: [
      {
        component: 'button',
        icon: 'linkOut',
        title: 'openTopicInAEM',
        'on-click': 'openTopicInAEM',
        target: {
          key: 'value',
          value: 'addcomment',
          viewState: VIEW_STATE.APPEND
        },
      },
    ],
  },
  controller: {
    openTopicInAEM: function (args) {
      const topicIndex = tcx.model.getValue(tcx.model.KEYS.REVIEW_CURR_TOPIC)
      const { allTopics = {} } = tcx.model.getValue(tcx.model.KEYS.REVIEW_DATA) || {}
      tcx.appGet('util').openInAEM(allTopics[topicIndex])
    },
  },
}
