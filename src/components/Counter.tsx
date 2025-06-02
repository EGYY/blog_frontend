import { useState } from "react"
import cls from './Counter.module.scss';

export const Counter = () => {
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(prev => prev + 1)
    }

    return (
        <div>
            <button className={cls.button} onClick={increment}>incr</button>
            <b>{count}</b>
        </div>
    )
}
