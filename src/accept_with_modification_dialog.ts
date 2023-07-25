const acceptWithModification = {
    id: 'accept_with_modification_dialog',
    view: {
      component: "dialog",
      "header": {
        "items": [
          {
            component: 'label',
            extraclass: "header",
            label: 'Accept With Modifications',
          }
        ]
      },
      content: {
        items: [
          {
            component: 'div',
            "extraclass": "revised-text",
            items: [
              {
                component: 'label',
                label: 'Revised Text (Required)',
                extraclass: 'revised-text-label'
              },
              {
                component: "textarea",
                "extraclass": "revised-text-textarea",
                "data": "@extraProps.revisedText",
                "stopKeyPropagation": true,
              }
            ]
          },
          {
            component: 'div',
            "extraclass": "adjudication-rationale",
            items: [
              {
                component: 'label',
                label: 'Adjudicator Comment Rationale (Required)',
                extraclass: 'adjudication-rationale-label'
              },
              {
                component: "textarea",
                extraclass: "adjudication-rationale-textarea",
                "data": "@extraProps.adjudicationRationale",
                "on-keyup": {
                  "name": "",
                  "eventArgs": {
                    "keys": [
                      "ENTER"
                    ]
                  }
                },
                "stopKeyPropagation": true
              }
            ]
          },
        ],
      },
      footer: {
        "items": [
          {
            "component": "button",
            "label": "Cancel",
            "on-click": "handleClose",
            "variant": "secondary"
          },
          {
            "component": "button",
            "label": "Submit",
            "variant": "cta",
            "on-click": "submitAcceptWithModification"
          }
        ]
      }
    },
    model: {
      deps: [],
    },
   controller:{
    init: function () {
    },
  
     submitAcceptWithModification: function () {
       const extraProps = {
         'revisedText': this.model.extraProps.get("revisedText"),
         'adjudicationRationale': this.model.extraProps.get("adjudicationRationale"),
       }
       this.parentEventHandler.next('sendAcceptWithModificationProps', extraProps)
       this.next('handleClose')
     },
  
     handleClose() {
      tcx.eventHandler.next(tcx.eventHandler.KEYS.APP_HIDE_DIALOG, { id: 'accept_with_modification_dialog' })
  
     }
    }
  }
  
  export default acceptWithModification
  window.addEventListener('tcx-loaded', () => {
    tcx?.extension?.register(acceptWithModification.id, acceptWithModification);
  })