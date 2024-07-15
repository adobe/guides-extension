export const updatedProcessComments = function (data, topicIndex) {
  const newCommentEvents = ["highlight", "strikethrough", "addcomment", "insertext"]
  _.each(data, (event: any) => {
    const identify = _.findIndex(newCommentEvents, eventType => eventType === event.eventType)
    if (identify !== -1) {
      this.next('setCommentId', { event, topicIndex })
    }
  })
}

const getUserInfo = (userId) => {
  return $.ajax({
    url: '/bin/dxml/xmleditor/userinfo',
    data: {
      username: userId,
    },
    success: (data) => {
      return data
    }
  })
}

const inline_extend = {
  id: 'inline_review_panel',
  model: {
    deps: ['commentCount'],
  },
  controller: {
    init: function () {
      this.setValue("commentCount", {})
      tcx.model.subscribeVal(tcx.model.KEYS.REVIEW_DATA, (reviewData) => {
        for (let topicId of reviewData.topicsinReview) {
          topicId = topicId.toString()
          tcx.commentStore.onProcessEvent(topicId, (events) => updatedProcessComments.call(this, events, topicId))
        }
      })
    },

    onNewCommentEvent(args) {
      const events = _.get(args, "events")
      const currTopicIndex = tcx.model.getValue(tcx.model.KEYS.REVIEW_CURR_TOPIC) || this.getValue('currTopicIndex') || "0"
      const event = _.get(_.get(events, currTopicIndex), '0')
      const newComment = _.get(args, 'newComment')
      const newReply = _.get(args, 'newReply')
      if ((newComment || newReply) && event) {
        this.next('setUserInfo', event)
      }
    },

    setUserInfo(event) {
      getUserInfo(event.user).subscribe(userData => {
        const extraProps = {
          "userFirstName": userData?.givenName || '',
          "userLastName": userData?.familyName || '',
          "userTitle": userData?.title || '',
          "userJobTitle": userData?.jobTitle || '',
          'userEmail': userData?.email || '',
        }
        const name = `${extraProps.userFirstName} ${extraProps.userLastName}, ${extraProps.userJobTitle}`
        if (_.trim(name) === ',') {
          extraProps.userInfo = userData.displayName
        }
        else {
          extraProps.userInfo = name
        }
        const data = { ...event, extraProps }
        this.next(
          'sendExtraProps',
          data
        )
      })
    },

    setCommentId({ event, topicIndex }) {
      const processingComments = this.getValue('processingComments')
      const modelComment = _.find(processingComments, { commentId: event.commentId })
      const reqComment = tcx.commentStore.getComment(event.commentId)
      const commentCount = this.getValue('commentCount')
      if (_.has(this.getValue('commentCount'), topicIndex)) {
        commentCount[topicIndex] += 1
        this.setValue("commentCount", commentCount)
      }
      else {
        commentCount[topicIndex] = 1
      }
      if (reqComment) {
        this.setValue("commentCount", commentCount)
        const commentUniqId = `${Number(topicIndex) + 1}.${commentCount[topicIndex]}`
        reqComment.extraProps.set("commentUniqId", commentUniqId)
        modelComment?.extraProps?.set("commentUniqId", commentUniqId)
      }
    },
  },
}

export default inline_extend
