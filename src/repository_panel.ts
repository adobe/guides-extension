/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

export enum VIEW_STATE2 {
  APPEND = 'append',
  PREPEND = 'prepend',
  REPLACE = 'replace',
}
// multiple matches needs to be handled
// support index also

export default {
  class: "flex bg-red-100 bg-green-200 bg-green-300 mr-4",
  id: 'repository_panel',
  view: {
    className: '',
    items: [
      {
        target: {
          key:"id",
          value:'respository-'
,          },
        component: 'widget',
        id: 'loading_shimmer',
        viewState: VIEW_STATE2.REPLACE,
        index:2,
      },
      {
        component: 'button',
        label: 'Close',
        'on-click': 'cancel',
        variant: 'secondary',
        quiet: true,
        index:20,
      },
      {
        label:"@testLabel",
        component:"label"
      }
    ],
  },
  controller: {
    init: function() {
      console.log('subject: ', this.subject)      
      this.subscribe({
        key: 'rename',
        next: () => { console.log('rename using extension') }
      })
      console.log('Logging view config ', this.viewConfig)
      this.next(this.viewConfig.items[1].searchModeChangedEvent, { searchMode: true })
      this.subscribeAppEvent({
        key: 'app.active_document_changed',
        next: () => { console.log('active doc changed subs') }
      })
      this.subscribeAppModel('app.mode',
        () => { console.log('app mode subs') }
      )
      this.subscribeParentEvent({
        key: 'tabChange',
        next: () => { console.log('tab change subs') }
      })
      this.parentEventHandlerNext('tabChange', {
        data: 'map_panel'
      })
      this.appModelNext('app.mode', 'author')
      this.appEventHandlerNext('app.active_document_changed', 'active doc changed')
    },
    cancel: function (args) {
      this.setValue('testLabel', 'testlabel2')
    },
  },
  model: {
    deps: ['testLabel'],
  },
} 
