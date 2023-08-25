---
sidebar_position: 3
---
# Customising the app

Our app follows a MVC (Model, View, Controller) structure

### Model

The model defines the various attributes and store their values. The values of the various attributes stored in the model can be accessed from the controller using the syntax

```typescript
this.model.attributeName
```

For customisation in the app, all newly created attributes will be added under a map in the model.
To set a new attribute in the model we will use the following syntax in the controller: 

```typescript
this.model.extraProps.set("key", value)
```

To access an attribute added to the model we will use the following syntax:


```typescript
const value = this.model.extraProps.get("key")
```

### View:

The view defines the UI of the app. We use JSON files to define the view of our files. Here, we define the components, the css (as given in the extraclass of components) and render the values stored in the model.
In our app, each view is defined using a JSON. The JSONs are referenced using their unique IDs called a `id`.

### Controller

The controller is used to handle events and process the data. The controller is used to fetch and send data from the server, it is the interface between what is displayed on the UI and stored on the backend.
 
- To set values at initialisation, we use the `init` function.
- To add a method the the controller we use the following syntax:
```typescript
methodName: function(args){
    // functionality
}
```
The `methodName` here serves as the `key` to reference the method in the JSON (view) or in other functions
- To call a method in the controller we use the syntax
```typescript
this.next('methodName', args)
```

## Example

Let us now use a simple example to show how these 3 components interact with each other.
We will add a button which switches its label value on a click

### View: 

Below we define the JSON for a button that shows a dynamic text stored in the model under the variable name `buttonLabel`.
In this example, clicking the button changes its label.

```JSON
{
    "component": "button",
    "label": "@extraProps.buttonLabel",
    "variant": "cta",
    "on-click": "switchButtonLabel",
}
```

### Model:

in this case, `extraProps.buttonLabel` holds the label of the button

### Controller

```typescript
  controller: {
    init: function () {
      this.model.extraProps.set("buttonLabel", "Submit")
    },

    switchButtonLabel(){
        const buttonLabel = this.model.extraProps.get("buttonLabel") === "Submit"? "Cancel" : "Submit"
        this.model.extraProps.set("buttonLabel", buttonLabel)
    }
  }
```

Below GIF shows the above code in action
![basic_customisation](imgs/basic_customisation.gif "Basic customisation button")