export default {
  id: "html5_preset_general",
  view: {
    items: [
      {
        component: "textfield",
        disabled: true,
        text: "Added some display text",
        data: "@ditaOTCommandLineArguement",
        "aria-label": "@ditaOTCommandLineArguement",
        "on-change": "ditaOTCommandLineArguementChanged",
        target: {
          key: "on-change",
          value: "ditaOTCommandLineArguementChanged",
          viewState: 'replace',
        },
      },
    ],
  }
}
