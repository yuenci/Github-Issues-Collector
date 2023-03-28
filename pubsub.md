发布者

```jsx
PubSub.publish('changeTab', { message: 'you message here' });
```

订阅者

```jsx
mounted() {
    PubSub.subscribe('changeTab', (msg, data) => {
        console.log(data.message)
    });
},
beforeDestroy() {
    PubSub.unsubscribe('changeTab');
}

// 或者 beforeUnmount，看场景
```
