# Customising the review app

To ease the customisation of the review app we have provided some hooks listed and explained below:

### Review-Comment
- id: `review_comment`
- hook: `this.updateExtraProps`:

As discussed [here](../../aem_guides_framework/basic_customisation.md), any new attribute added during customisation goes under `this.model.extraProps`. The method `updateExtraProps` allows you to add attributes to a review comment, handling the updation and storage of the added attribute on the server as well.

#### Usage Example:

Say for example, you want to add fields `commentRationale` and `severity` to your comments. 
Let us update the `commentRationale` to "This is an important sentence." and the `severity` to "CRITICAL".
This can be done using the syntax:

```typescript
 this.updateExtraProps(
        {'commentRationale': 'This is an important sentence.',
        'severity': 'CRITICAL'}
      )
```

The above code snippet will handle the updation and saving of the values. The saved values can be rendered on the UI by defining the view.

```JSON
{
    "component" : "label",
    "label": "@extraProps.commentRationale"
}
```

### Inline review panel

- id: `inline_review_panel`

1. hook: `onNewCommentEvent`

The hook `onNewCommentEvent` allows you to throw an event or call a method on a new comment or reply event.
The args received in the `onNewCommentEvent` include:
    - events: the comment/reply event that was dispatched.
    - newComment: boolean
        If the event dispatched was a new comment event, i.e. `highlight`, `insertion`, `deletion`, `sticky note comment`
    - newReply: boolean
        If the event dispatched was a new reply event.

2. hook: `sendExtraProps`

This hook is beneficial if you want to extend an `event` and send `extraProps` from the inline review panel. We will explain the usage of these two hooks below.

#### Usage Example:

Say we want to send an extraProp, `userInfo`, everytime a new comment or reply is dispatched. Now this will be done via the inline review panel, however we do not have the reference to the commentId of the newly generated comment, hence to achieve this we can write the following code.

```typescript
    onNewCommentEvent(args){
      const events = _.get(args, "events")
      const currTopicIndex = tcx.model.getValue(tcx.model.KEYS.REVIEW_CURR_TOPIC) || this.model.currTopicIndex || "0"
      const event = _.get(_.get(events, currTopicIndex), '0')
      const newComment = _.get(args, 'newComment')
      const newReply = _.get(args, 'newReply')
      if ((newComment || newReply) && event) {
        this.next('setUserInfo', event)
      }
    },
```

In the above code snippet, we are checking if the dispatched event was a new comment or reply. In case of a new comment or reply, we are calling the method `setUserInfo`


```typescript
    setUserInfo(event) {
      this.loader?.getUserInfo(event.user).subscribe(userData => {
        const extraProps = {
          "userFirstName": userData?.givenName || '',
          "userLastName": userData?.familyName || '',
          "userTitle": userData?.title || '',
          "userJobTitle": userData?.jobTitle || '',
          'userEmail': userData?.email || '',
        }
        const data = {... event, extraProps}
        this.sendExtraProps(
          data
        )
      })
    },
```

In the above method, we are extending the event to send extraProps which include the user's first name, email, title etc. Extending the event this way ensures that the extraProps are sent with the correct commentId, ensuring that they are attached to the right comment.

The hook `updateExtraProps` inherently calls the hook `sendExtraProps`, so when to use what?

We use `updateExtraProps` in the `review_comment` controller, which already has the comment's `id` and hence you just need to mention the `extraProps.`

The `inline_review_panel` however does not have the access to the comment's id, hence anytime you need to dispatch an event from the inline review panel, the `sendExtraProps` will be handy.
