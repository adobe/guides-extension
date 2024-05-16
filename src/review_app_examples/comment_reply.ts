import { VIEW_STATE } from "./review_comment"

const commentReply = {
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
    init: function (context) {
      const reqComment = tcx.commentStore.getComment(context.getValue('commentId'))
      const reqReply = reqComment.findReply(context.getValue('replyId'))
      context.setValue('extraProps', reqReply.extraProps)
    },

    openMailTo(){
      const mailToLink = `mailto:${this.getValue("userEmail")}`
      tcx.util.openLink(mailToLink)
    }
  }
}
export default commentReply

window.addEventListener('tcx-loaded', () => {
  tcx?.extension?.register(commentReply.id, commentReply);
})