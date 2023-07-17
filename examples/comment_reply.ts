import { VIEW_STATE } from "./controller_id"

const commentReply =  {
  id: 'comment_reply',
  view: {
    items: [
      {
        component: 'div',
        extraclass: 'user-info',
        items: [
          {
            component: 'label',
            label: "@extraProps.userInfo",
            "extraclass": "user-name",
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
            value: 'user-name',
            viewState: VIEW_STATE.REPLACE,
          },
      },
    ],
  },
  model: {
    deps: [],
  },
  controller: {
    init: function () {
      const reqComment = tcx.commentStore.getComment(this.model.commentId)
      const reqReply = reqComment.findReply(this.model.replyId)
      this.model.extraProps = reqReply.extraProps
    },

    openMailTo(){
      const mailToLink = `mailto:${this.model.extraProps?.get("userEmail")}`
      tcx.util.openLink(mailToLink)
    }
  }
}
export default commentReply

window.addEventListener('tcx-loaded',()=>{
  tcx?.extension?.register(commentReply.id, commentReply);
})