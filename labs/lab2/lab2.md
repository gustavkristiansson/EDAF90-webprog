# Reflection question 1
The render function must be a pure function of props and the component state, the values returned by useState(). **What happens if the output of the render function is depending on other data that changes over time?**

If the data isn't part of the component's state or props, React won't be aware of the changes and won't re-render the component when the data changes. Hence, any dependant data that changes should be stored in a state or passed through props.

# Reflection question 2
In the code above, the foundations array is computed every time the component is rendered. The inventory changes very infrequent so you might think this is inefficient. **Can you cache foundations so it is only computed when props.inventory changes?** Hint, read about the second parameter to useEffect, “Learn React”/“EscapeHatches”/“Synchronizing with Effects”, https://react.dev/learn/synchronizing-with-effects. Is it a good idea? Read You Might Not Need an Effect: https://react.dev/learn/you-might-not-need-an-effect

It's possible to cache foundations with useMemo(), which memoizes the value and only recalculates it when props.inventory changes. It's a good idea if computing foundations is expensive and props.inventory changes infrequently, but since this isn't the case for us memoizing might just add unnecessary complexity to our code.

# Reflection question 3
**Should you move the foundation state to the Select component above? To answer this you need to consider what happens when the user submits the form.**


# Reflection question 4
**What triggers react to call the render function and update the DOM?**
React re-renders when props or states changes (by setState or useState() hooks). If a parent component re-renders, its children will also re-render.

# Reflection question 5
**When the user change the html form state (DOM), does this change the state of your component?**


# Reflection question 6
**What is the value of this in the event handling call-back functions?**

# Reflection question 7
**How is the prototype chain affected when copying an object with copy = {...sourceObject}?**
When copying an object using the spread operator, the prototype chain isn't copied, so we get a shallow copy of the object. We only copy the object's own enumerable properties, but not the properties inherited from its prototype. The copy will have the Object.prototype (instead of sourceObject's prototype).