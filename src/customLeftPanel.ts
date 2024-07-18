//Types
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

export type ExtentionViewItems = ViewItem & { target: ExtentionTarget }

export type ExtentionTabView = {
  id: string
  tabs: {
    id: string
    component?: 'tab'
    title: string
    icon: string
    extraclass:string,
    showClass:string,
    'on-click': 'tabClick',
  }[]
  tabPanels: {
    tabId: string
    component?: 'tabPanel'
    items: ViewItem[]
    extraclass:string,
    showClass:string
  }[]
}
export type Extention = {
  id: string
  tabView?: ExtentionTabView
}

const customPanel: Extention = {
  id: 'left_panel_container',//component Id
  tabView: {
    id: 'left_panel_container', // tab component ID (same in this case)
    tabs: [
      {
        component: 'tab',
        id: 'annotation_toolbox',//tabs id
        extraclass: 'collection-panel-tab',
        showClass: '@visibleTabs.annotation_toolbox',//show class which gets tab id linked to it
        'on-click': 'tabClick',//predefined devent for click
        icon: 'collection',//icon for the tab
        title: 'Favorites',//title for accessibility
        items: [//items for the expanded view
          {
            component: 'text',
            text: 'Favorites',
          },
        ],
      },
    ],
    tabPanels: [//panel components
      {
        component: 'tabPanel',
        tabId: 'annotation_toolbox',//tab id matching from above
        showClass: '@visibleTabs.annotation_toolbox',//visiblity condition matching from above
        items: [
          {
            component: 'widget',//component to be rendered
            id: 'annotation_toolbox',
            inputModel: { activeTabId: '@activeTabId' },//input model value to tell the panel about whether the current component is selected
          },
        ],
      },
    ],
  },
}
export default customPanel//optional export 
