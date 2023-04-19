/* eslint-disable no-debugger */
export enum VIEW_STATE2 {
    APPEND = 'append',
    PREPEND = 'prepend',
    REPLACE = 'replace',
  }

  export default {
    id: 'repository_panel',
    view: {
      className: '',
      items: [
        {
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
      cancel: function (args) {
        this.model.testLabel = 'testlabel2'
      },
    },
    model: {
      deps: ['testLabel'],
    },
  } 