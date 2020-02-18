import React, { useState, useEffect } from 'react'

export default function App() {
    const initialCount = 300
    const [count, setCount] = useState(initialCount)

    useEffect(() => {
        document.title = `Timer: ${timerConvert(count)}`

        // const timer = setInterval(setCount(count - 1), 10000)

        return () => clearInterval(timer)
    }, [count])

    function timerConvert(t) {
        let sec = 0
        let min = 0

        if(t > 59) {
            min = Math.floor(t / 60)
            sec = t - (min * 60)
        } else {
            sec = t
        }

        sec = '' + sec
        if(sec.length === 1) {
            sec = '0' + sec
        }

        return `${min}:${sec}`
    }

    return (
        <>
            <h1>Pomodoro Timer</h1>
            <p>{timerConvert(count)}</p>
            <button>Start</button>
            <button>Stop</button>
            <button onClick={() => setCount(initialCount)}>Reset</button>
        </>
    )
}