/* eslint-disable no-debugger */
import inline_extend from './inline_extend';
import { updatedProcessComments } from './inline_extend';


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