export default {
  id: 'other_attribute_list_item',
  view: {
    items: [
      {
        component: 'widget',
        id: 'loading_shimmer',
        target: {
          key: 'extraclass',
          value: 'editable-attribute-value',
          viewState: 'append',
        },
      },
      {
        component: 'button',
        target: {
          key: 'extraclass',
          value: 'editable-attribute-value',
          viewState: 'append',
        },
        title:"mybutton",
        "on-click":"handleClick"
      },
    ],
  },
  controller: {
    handleClick: function(args,args2){
        const name = this.getValue('name')
        const value = this.getValue('value')
        const xpath = this.getValue('xpath')
    },
    init: function(args, args2){
      const name = this.getValue('name')
      const value = this.getValue('value')
    },
  },
}






