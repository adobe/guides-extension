//Types
export enum VIEW_STATE {
  APPEND = "append",
  PREPEND = "prepend",
  REPLACE = "replace",
}
export type ExtentionTarget = {
  key?: string;
  value?: string;
  index?: number;
  viewState: VIEW_STATE;
  multiple?: boolean;
};
export type ViewItem = {
  component?: string;
  label?: string;
  className?: string;
  "on-click"?: string;
  variant?: string;
  quiet?: boolean;
  items?: ExtentionViewItems[];
  index?: number;
  id?: string;
  headerTitle?: string;
};

export type ExtentionViewItems = ViewItem & { target: ExtentionTarget };

export type ExtentionTabView = {
  id: string;
  tabs: {
    id: string;
    component?: "tab";
    title: string;
    icon: string;
    extraclass: string;
    showClass: string;
    "on-click": "tabClick";
  }[];
  tabPanels: {
    tabId: string;
    component?: "tabPanel";
    items: ViewItem[];
    extraclass: string;
    showClass: string;
  }[];
};
export type Extention = {
  id: string;
  tabView?: ExtentionTabView;
};

const customPanel: Extention = {
  id: "left_panel_container", //component Id
  tabView: {
    id: "left_panel_container", // tab component ID (same in this case)
    tabs: [
      {
        component: "tab",
        label: "My Tasks",

        id: "inbox_toolbox", //tabs id
        extraclass: "collection-panel-tab",
        showClass: "@visibleTabs.inbox_toolbox", //show class which gets tab id linked to it
        "on-click": "tabClick", //predefined devent for click
        icon: "pushNotification", //icon for the tab
        title: "User Inbox", //title for accessibility
        items: [
          //items for the expanded view
          {
            component: "text",
            text: "My Tasks",
          },
        ],
      },
    ],
    tabPanels: [
      //panel components
      {
        component: "tabPanel",
        tabId: "inbox_toolbox", //tab id matching from above
        showClass: "@visibleTabs.inbox_toolbox", //visiblity condition matching from above
        items: [
          {
            component: "widget", //component to be rendered
            id: "notification_data_list",
          },
        ],
      },
    ],
  },
};
export default customPanel; //optional export
window.addEventListener("tcx-loaded", () => {
  tcx?.extension?.register(customPanel.id, customPanel); //requred to extension component register with id
});
