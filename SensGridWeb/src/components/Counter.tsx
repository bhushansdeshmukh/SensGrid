import { useState } from "react";

function Counter() {
    //declare state variable
    const [count, setCount] = useState(0);

    //event handler function to update the state variable
    const handleIncrement = () => {
        setCount(count + 1);
    }

    const handleDecrement = () => {
        setCount(count - 1);
    }

    return (
        <div>
            <h2>Counter Example</h2>
            <p>Current count: {count}</p>
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement}>Decrement</button>
        </div>
    );
}

export default Counter;