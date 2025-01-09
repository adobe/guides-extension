import { VIEW_STATE } from './review_comment'

export function getVersionNumber(tab:TabItem) {
  let version = tab.version
  const  versionDirty = tab.versionDirty === true
  if(version && versionDirty) {
    version = `${version} * `
  }
  return version || 'none'
}

export function isSideBySideViewOn(tab:TabItem) {
  const sideBySideVersion = tab.sideBySideVersion
  if(sideBySideVersion && sideBySideVersion !== '') {
    return sideBySideVersion
  }
  return false
}


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
      {
        component: "widget",
        id : "save_as_new_version",
        inputModel: {
          versionNumber: "@extraProps.versionNumber",
          isNotLatest : "@extraProps.isNotLatest",
          isSideBySideViewOn : "@extraProps.isSideBySideViewOn",
          isNotReadOnly : "@extraProps.isNotReadOnly",
          tabContent : "@extraProps.tabContent",

        },
        target: {
          key: 'value',
          value: 'addcomment',
          viewState: VIEW_STATE.APPEND
        }
      }
    ],
  },
  controller: {
    init: function () {
      this.subscribeAppEvent({
        key: 'app.active_document_changed',
        next: () => { 
          _.defer(() => {
            let tabController =  tcx.appGet('tabControllers')?.author;
            let tab = tabController.tabItems.items.find(tabItem => _.isEqual(tabController?.selectedTabId,tabItem.id));
            this.setValue('versionNumber',getVersionNumber(tab))
            this.setValue('isNotLatest', !tab?.isLatest)
            this.setValue('isSideBySideViewOn',isSideBySideViewOn(tab))
            this.setValue('isNotReadOnly', !tab?.readOnly)
            this.setValue('tabContent',tab?.content)
          })
        }
      }) 
      this.subscribeAppModel('page.file.current_version',
        (opts) => { 
          const tabController =  tcx.appGet('tabControllers')?.author;
          const tab = tabController.tabItems.items.find(tabItem => _.isEqual(tabController?.selectedTabId,tabItem.id));
          if (tab) {
            this.setValue('isNotLatest', !tab?.isLatest);
            this.setValue('versionNumber',getVersionNumber(tab))
          } else {
            this.setValue('versionNumber',opts?.version);
          }
        }
      )},
    openTopicInAEM: function (args) {
      const topicIndex = tcx.model.getValue(tcx.model.KEYS.REVIEW_CURR_TOPIC)
      const { allTopics = {} } = tcx.model.getValue(tcx.model.KEYS.REVIEW_DATA) || {}
      tcx.appGet('util').openInAEM(allTopics[topicIndex])
    },
  },
}
