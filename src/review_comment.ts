
export enum VIEW_STATE {
  APPEND = 'append',
  PREPEND = 'prepend',
  REPLACE = 'replace',
}

const controllerId =  {
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
                "multiple": false,
                "placeholder": "",
                'value': "@extraProps.severity",
                "on-change": "changeSeverity",
                "on-keyup": { "name": "changeSeverity", "eventArgs": { "keys": [ "ENTER" ]} },
              },
            ],
          },
          {
            component: "div",
            extraclass: 'edit-comment-rationale',
            items: [
              {
                component: 'label',
                label: 'Comment Rationale: '
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
      const reqComment = tcx.commentStore.getComment(this.model.commentId)
      this.model.extraProps = reqComment.extraProps
      this.model.extraProps.set("labels", ['None', 'CRITICAL', 'MAJOR', 'SUBSTANTATIVE', 'ADMINISTRATIVE'])
    },
    udpateSomething(args){
      debugger;
      this.updateExtraProps(args)
    },
    changeSeverity: function(args) {
      this.model.extraProps.set("severity", args.data)
      this.updateExtraProps(
        {'severity': this.model.extraProps.get("severity")}
      )
    },

    changeCommentRationale: function() {
      this.updateExtraProps(
        {'commentRationale': this.model.extraProps.get("commentRationale")}
      )
    },

      submitEditComment({domEvent}:{domEvent?:KeyboardEvent}={}) {
        if(domEvent?.key === 'Enter'){
          this.model.commentRationale = _.trim(this.model.commentRationale)
        }
        if (this.model.extraProps.get("originalCommentRationale") !== this.model.extraProps.get("commentRationale")) {
          this.model.extraProps.set("originalCommentRationale", this.model.extraProps.get("commentRationale"))
          this.next('changeCommentRationale')
      }
    },

    openMailTo(){
      const mailToLink = `mailto:${this.model.extraProps.get("userEmail")}`
      tcx.util.openLink(mailToLink)
    },

    acceptWithModification(){
      tcx.eventHandler.next(tcx.eventHandler.KEYS.APP_SHOW_DIALOG, 
        { 
          id: 'accept_with_modification_dialog',
          eventHandler: this.eventHandler 
        })    
      }
  }
}
export default controllerId
window.addEventListener('tcx-loaded',()=>{
  tcx?.extension?.register(controllerId.id, controllerId);
})