//typs 
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

export type ExtentionViewItems = ViewItem & {target: ExtentionTarget}
export type ExtentionView =  { items: ExtentionViewItems[]; className?: string }
export type ExtentionTargetAsArg = Required<Pick<ExtentionTarget, 'key' | 'value' | 'viewState'>> &
  Pick<ExtentionTarget, 'multiple'>
export type ExtentionController = Record<string, (...args: unknown[]) => unknown>
export type ExtentionTabView = {
  id:string,
  tabs:{
    id:string
    component?:'tab'
    title: string
    icon: string
  }[]
  tabPanels: {
    tabId:string
    component?:"tabPanel"
    items:ViewItem[]
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

const reviewComment =  {
  id: 'review_comment',//component id we want to extend docs will have full list of extendible component
  view: {
    items: [
      {
        component: 'label',
        label: '@extraProps.commentUniqId',
        extraclass: 'commentUniqId',
        target: {//target identifying object, check json for the available component to find your target value
          key: 'extraclass',
          value: 'user-image',
          viewState: VIEW_STATE.PREPEND,//view state tells how your want the extension to be inserted (append/prepend/replace)
        },

      },
      {
        component: 'div',
        extraclass: 'user-info',
        items: [
          {
            component: 'label',//label component
            "label": "@extraProps.userInfo",//@extraProps is a special observable so we can link the model values to the view
            "extraclass": "reviewer-name",//extra class add classes to the element 
          },
          {
            component: 'button',//label component
            icon: 'email',//icon for the component
            extraclass: 'mailto-icon',
            "on-click": "openMailTo"//on-click handler, the event handlers have on-<event-name> like on-move , on-select etc
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
                "on-keyup": { "name": "changeSeverity", "eventArgs": { "keys": [ "ENTER" ]} },//when we want to bind to a key we can provide keys in event args with name as event name
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
      }
    ],
  },
  controller: {
    //special function that runs when the component gets initialized. This can trvially run in cases where 
    //the component is a part of a list and the list gets updated such is the case here
    init: function () {
      //setting the drop down values for the labels array to be fed into the select field as options
      this.model.extraProps.set("labels", ['None', 'CRITICAL', 'MAJOR', 'SUBSTANTATIVE', 'ADMINISTRATIVE'])
      this.model.extraProps.set("originalCommentRationale", "")
    },
    //besides init rest of the functions are registed as events. 
    //So the json on-change:"changeSeverity" will run when the severity changes
    changeSeverity: function(args) {
      this.model.extraProps.set("severity", args.data)
      const curUserInfo = tcx.model.getValue(tcx.model.KEYS.PAGE_CURRENT_USER),
       user = _.get(curUserInfo, 'userName'),
       data = {
          commentId: this.model.commentId,
          version: this.model.version,
          replyId: '',
          timeStamp: new Date().getTime(),
          user: user,
          attachmentEvents: this.model.uploadedAttachmentsEvents,
          severity: this.model.extraProps.get("severity")
      }
      this.parentController.next('updateSeverity', data)
    },
    changeCommentRationale: function() {
      const curUserInfo = tcx.model.getValue(tcx.model.KEYS.PAGE_CURRENT_USER),
       user = _.get(curUserInfo, 'userName'),
       data = {
          commentId: this.model.commentId,
          version: this.model.version,
          replyId: '',
          timeStamp: new Date().getTime(),
          user: user,
          attachmentEvents: this.model.uploadedAttachmentsEvents,
          commentRationale: this.model.extraProps.get("commentRationale")
      }
      this.parentController.next('updateCommentRationale', data)
    },

      submitEditComment({domEvent}:{domEvent?:KeyboardEvent}={}) {
        if(domEvent?.key === 'Enter'){
          this.model.commentRationale = _.trim(this.model.commentRationale)
        }
        if (this.model.extraProps.get("originalCommentRationale") !== this.model.extraProps.get("commentRationale")) {
          this.model.extraProps.set("originalCommentRationale", this.model.commentRationale)
          this.next('changeCommentRationale')
      }
    },

    openMailTo(){
      const mailToLink = `mailto:${this.model.extraProps?.email}`
      tcx.util.openLink(mailToLink)
    }
  }
}
// optional export
export default controllerId 
window.addEventListener('tcx-loaded',()=>{
  /**
 * Registers a controller
 * @constructor
 * @param {string} id - The component Id to be registered
 * @param {string} extension - The extension component to be registered
 */
  tcx?.extension?.register(controllerId.id, controllerId);
  //register the component in the extesion namespace of tcx
  //without this we cannot insert any component
})


