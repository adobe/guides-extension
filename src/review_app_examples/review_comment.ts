export enum VIEW_STATE {
  APPEND = 'append',
  PREPEND = 'prepend',
  REPLACE = 'replace',
}

const reviewComment = {
  id: 'review_comment',
  view: {
    items: [
      {
        component: 'label',
        label: '@extraProps.commentUniqId',
        extraclass: 'commentUniqId',
        target: {
          key: 'extraclass',
          value: 'user-image',
          viewState: VIEW_STATE.PREPEND,
        },
      },
      {
        component: 'div',
        extraclass: 'user-info',
        items: [
          {
            component: 'label',
            "label": "@extraProps.userInfo",
            "extraclass": "reviewer-name",
          },
          {
            component: 'button',
            icon: 'email',
            extraclass: 'mailto-icon',
            "on-click": "openMailTo"
          }
        ],
        target: {
          key: 'extraclass',
          value: 'reviewer-name',
          viewState: VIEW_STATE.REPLACE,
        },
      },
      {
        component: 'div',
        extraclass: 'comment-details',
        items:
          [
            {
              component: 'div',
              extraclass: 'comment-type-text',
              items:
                [
                  {
                    component: 'label',
                    label: 'Comment Type: ',
                    "extraclass": "severity-label",
                  },
                  {
                    component: 'label',
                    label: '@extraProps.severity'
                  }
                ],
            },
            {
              component: 'div',
              extraclass: 'comment-rationale',
              items:
                [
                  {
                    component: 'label',
                    label: 'Comment Rationale: ',
                    extraclass: 'comment-rationale-label'
                  },
                  {
                    component: 'label',
                    label: '@extraProps.commentRationale'
                  }
                ],
            },
          ],
        target: {
          key: 'id',
          value: 'attachment_tiles',
          viewState: VIEW_STATE.PREPEND,
        },
      },
      {
        component: 'div',
        items: [
          {
            component: 'div',
            extraclass: 'edit-comment-type',
            items: [
              {
                component: 'label',
                "label": "Comment Type",
              },
              {
                "component": "comboBox",
                "data": "@extraProps.labels",
                "extraclass": "severity-combobox",
                "multiple": false,
                "placeholder": "",
                'value': "@extraProps.severity",
                "on-change": "changeSeverity",
                "on-keyup": { "name": "changeSeverity", "eventArgs": { "keys": ["ENTER"] } },
              },
            ],
          },
          {
            component: "div",
            extraclass: 'edit-comment-rationale',
            items: [
              {
                component: 'label',
                label: 'Comment Rationale'
              },
              {
                component: "textarea",
                extraclass: "edit-textfield",
                "id": "edit_comment_rationale",
                "data": "@extraProps.commentRationale",
                "on-keyup": {
                  "name": "submitEditComment",
                  "eventArgs": {
                    "keys": [
                      "ENTER"
                    ]
                  }
                },
                "stopKeyPropagation": true
              },
            ],
          },
        ],
        target: {
          key: 'class',
          value: 'comment-block',
          viewState: VIEW_STATE.APPEND,
        },
      },
      {
        component: "button",
        "icon": "MultipleAdd",
        "variant": "action",
        "quiet": true,
        "extraclass": "hover-item",
        "title": "Accept with Modifications",
        "on-click": "acceptWithModification",
        target: {
          key: 'title',
          value: 'Reject comment',
          viewState: VIEW_STATE.APPEND,
        },
      }
    ],
  },

  controller: {
    init: function () {
      const reqComment = tcx.commentStore.getComment(this.getValue('commentId'))
      this.setValue('extraProps', reqComment.extraProps)
      this.setValue("labels", ['None', 'CRITICAL', 'MAJOR', 'SUBSTANTATIVE', 'ADMINISTRATIVE'])
    },

    sendAcceptWithModificationProps(args) {
      this.next('updateExtraProps', args)
    },

    changeSeverity: function (args) {
      this.setValue("severity", args.data)
      this.next('updateExtraProps',
        { 'severity': this.getValue("severity") }
      )
    },

    changeCommentRationale: function () {
      this.next('updateExtraProps',
        { 'commentRationale': this.getValue("commentRationale") }
      )
    },

    submitEditComment({ domEvent }: { domEvent?: KeyboardEvent } = {}) {
      if (domEvent?.key === 'Enter') {
        this.setValue('commentRationale', _.trim(this.getValue('commentRationale')))
      }
      if (this.getValue("originalCommentRationale") !== this.getValue("commentRationale")) {
        this.setValue("originalCommentRationale", this.getValue("commentRationale"))
        this.next('changeCommentRationale')
      }
    },

    openMailTo() {
      const mailToLink = `mailto:${this.getValue("userEmail")}`
      tcx.util.openLink(mailToLink)
    },

    acceptWithModification() {
      tcx.eventHandler.next(tcx.eventHandler.KEYS.APP_SHOW_DIALOG,
        {
          id: 'accept_with_modification_dialog',
          args: {
            onSuccess: (extraProps) => this.next('sendAcceptWithModificationProps', extraProps),
          }
        })
    }
  }
}

export default reviewComment
