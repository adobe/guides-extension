import { VIEW_STATE } from './review_comment'

function openInGuidesEditor({src}){
  const basePath = '/libs/fmdita/clientlibs/xmleditor/page.html?'
  const pathString = `${basePath}src=${src}`
  if(src){
    window.open(pathString,'_blank')
  }else{
    window.open(basePath,'_blank')
  }
}


export default {
    id: 'annotation_toolbox', 
    view: {
      items: [
        {
          component: 'button',
          icon: 'linkOut',
          title: 'Open Topic in Editor',
          'on-click': 'openTopicInAEM',
          target: {
            key: 'value',
            value: 'addcomment',
            viewState: VIEW_STATE.APPEND
  
          },
        },
      ],
    },
    controller: {
      openTopicInAEM: function (args) {
          const topicIndex = tcx.model.getValue(tcx.model.KEYS.REVIEW_CURR_TOPIC)
          const {allTopics = {}} = tcx.model.getValue(tcx.model.KEYS.REVIEW_DATA) || {}
		  openInGuidesEditor({src:allTopics[topicIndex]})
               },
    },
  }
  
  