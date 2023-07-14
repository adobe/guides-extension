/* eslint-disable no-debugger */

export enum VIEW_STATE {
  APPEND = 'append',
  PREPEND = 'prepend',
  REPLACE = 'replace',
}

export type ExtentionTarget = {
  key?: string
  value?: string
  index?: number
  viewState: VIEW_STATE
  multiple?: boolean
}

export type ViewItem = {
  component?: string
  label?: string
  className?: string
  'on-click'?: string
  variant?: string
  quiet?: boolean
  items?: ExtentionViewItems[]
  index?: number
  id?: string
  headerTitle?: string
}

export type ExtentionViewItems = ViewItem & { target: ExtentionTarget }
export type ExtentionView = { items: ExtentionViewItems[]; className?: string }
export type ExtentionTargetAsArg = Required<Pick<ExtentionTarget, 'key' | 'value' | 'viewState'>> &
  Pick<ExtentionTarget, 'multiple'>
export type ExtentionController = Record<string, (...args: unknown[]) => unknown>
export type ExtentionTabView = {
  id: string,
  tabs: {
    id: string
    component?: 'tab'
    title: string
    icon: string
  }[]
  tabPanels: {
    tabId: string
    component?: "tabPanel"
    items: ViewItem[]
  }[]
}
export type Extention = {
  id: string
  view?: ExtentionView
  controller?: ExtentionController
  tabView?: ExtentionTabView
  model?: {
    deps: string[]
  }
}

//DONT use arrow functions
export const updatedProcessComments = function (data, topicIndex) {
  const newCommentEvents = ["highlight", "strikethrough", "underline", "addcomment", "insertext"]
  this.processingComments = this.model.comments
  _.each(data, (event: any) => {
    const identify = _.findIndex(newCommentEvents, eventType => eventType === event.eventType)
    if (identify !== -1) {
      this.next('setCommentId', { event, topicIndex })
      this.next('initUserInfo', event)
    }
    else {
      switch (event.eventType) {
        case "changeSeverity": this.next('setSeverity', event); break;
        case "changeCommentRationale": this.next('setCommentRationale', event); break;
        case "postreply": this.next('initUserInfo', event); break;
      }
    }
  })
  if (topicIndex === tcx.model.getValue(tcx.model.KEYS.REVIEW_CURR_TOPIC)) {
    const comments = this.sortComments(this.processingComments)
    this.model.comments.swapItems(comments)
    this.filterPanelComments()
  }
}


const inline_extend =  {
  id: 'inline_review_panel',
  model: {
    deps: ['commentCount'],
  },
  controller: {
    init: function () {
      this.model.extraProps.set("commentCount", {})
      tcx.model.subscribeVal(tcx.model.KEYS.REVIEW_CURR_TOPIC, (topicId) => {
        topicId = topicId.toString()
        tcx.commentStore.onProcessEvent(topicId, (events) => updatedProcessComments.call(this, events, topicId))
      })
    },

    initUserInfo(event) {
      this.loader?.getUserInfo(event.userId).subscribe(data => {
          const modelComment = this.findComment(event.commentId)
          const reqComment = tcx.commentStore.getComment(event.commentId)
          if(event.isReply){
            const reqReply: Reply = reqComment.findReply(event.replyId)
            const modelReply: Reply = reqComment.findReply(event.replyId)
            if (modelReply){
              this.next('setUserInfo', {comment: modelReply, userData: data})
            }
            if (reqReply){
              this.next('setUserInfo', {comment: reqReply, userData: data})
            }
          }
          else{
            if (modelComment){
              this.next('setUserInfo', {comment: modelComment, userData: data})
            }
            if (reqComment){
              this.next('setUserInfo', {comment: reqComment, userData: data})
            }
          }
      })
    },

    setUserInfo({comment, userData}) {
      comment.extraProps.set("userFirstName", userData?.givenName || '')
      comment.extraProps.set("userLastName", userData?.familyName || '')
      comment.extraProps.set("userTitle", userData?.title || '')
      comment.extraProps.set("userJobTitle", userData?.jobTitle || '')
      comment.extraProps.set('userEmail', userData?.email || '') 
      comment.extraProps.set("userInfo",
        `${comment.extraProps.get("userFirstName")} ${comment.extraProps.get("userLastName")}, ${comment.extraProps.get("userTitle")}`)
      if (_.trim(comment.extraProps.userInfo) === ','){
        comment.extraProps.set('userInfo', comment.user)
      }
    },

    updateSeverity: function (data) {
      const guid = hashCodeUtil.hashCode(this.model.curUser.ID) + '-' + hashCodeUtil.guid()
      const event = {
        user: this.model.curUser.ID,
        eventId: guid,
        commentId: data.commentId,
        replyId: data.replyId,
        eventType: 'changeSeverity',
        timeStamp: new Date().getTime(),
        version: data.version,
        comment: data.comment,
        localevent: true,
        props: JSON.stringify({ severity: data.severity })
      }

      const events = {}
      const eventjson = event ? [event] : []
      const topicIndex = tcx.model.getValue(tcx.model.KEYS.REVIEW_CURR_TOPIC)
      events[topicIndex] = _.map(eventjson, event => new CommentEvent(event))
      tcx.eventHandler.next(tcx.eventHandler.KEYS.REVIEW_COMMENT_EVENTS, { origin: this.id, events })
    },

    updateCommentRationale: function (data) {
      const guid = hashCodeUtil.hashCode(this.model.curUser.ID) + '-' + hashCodeUtil.guid()
      const event = {
        user: this.model.curUser.ID,
        eventId: guid,
        commentId: data.commentId,
        replyId: data.replyId,
        eventType: 'changeCommentRationale',
        timeStamp: new Date().getTime(),
        version: data.version,
        comment: data.comment,
        localevent: true,
        props: JSON.stringify({ commentRationale: data.commentRationale })
      }

      const events = {}
      const eventjson = event ? [event] : []
      const topicIndex = tcx.model.getValue(tcx.model.KEYS.REVIEW_CURR_TOPIC)
      events[topicIndex] = _.map(eventjson, event => new CommentEvent(event))
      tcx.eventHandler.next(tcx.eventHandler.KEYS.REVIEW_COMMENT_EVENTS, { origin: this.id, events })
    },

    setSeverity(event: CommentEvent) {
      const reqComment = tcx.commentStore.getComment(event.commentId)
      const modelComment = this.findComment(event.commentId)
      if (reqComment) {
        reqComment.extraProps.set("severity", event._extraProps?.severity || "")
        modelComment.extraProps.set("severity", event._extraProps?.severity || "")
      }
    },

    setCommentId({ event, topicIndex }) {
      const modelComment = this.findComment(event.commentId)
      const reqComment = tcx.commentStore.getComment(event.commentId)
      if (reqComment) {
        const commentCount = this.model.extraProps.get('commentCount')
        if (_.has(this.model.extraProps.commentCount, topicIndex)) {
          commentCount[topicIndex] += 1
          this.model.extraProps.set("commentCount", commentCount)
        }
        else {
          commentCount[topicIndex] = 1
        }
        this.model.extraProps.set("commentCount", commentCount)
        const commentUniqId = `${Number(topicIndex) + 1}.${commentCount[topicIndex]}`
        reqComment.extraProps.set("commentUniqId", commentUniqId)
        modelComment.extraProps.set("commentUniqId", commentUniqId)
      }
    },

    setCommentRationale(event: CommentEvent) {
      const reqComment = tcx.commentStore.getComment(event.commentId)
      const modelComment = this.findComment(event.commentId)
      if (reqComment) {
        reqComment.extraProps.set("commentRationale", event._extraProps?.commentRationale || "")
        modelComment.extraProps.set("commentRationale", event._extraProps?.commentRationale || "")
      }
    }
  },
}
export default inline_extend
