import React, { useState, useEffect } from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap';

export default function App() {
    const initialCount = 5
    const [count, setCount] = useState(initialCount)
    const [paused, setPaused] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            if(count === 1) {
                setCount(0)
                setPaused(true)
            }

            if(!paused) {
                setCount(count => count ? count - 1 : 0)
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [count, paused])

    // useEffect(() => {

    //     const timer = setInterval(setCount(count - 1), 10000)

    //     return () => clearInterval(timer)
    // }, [count])

    function startTimer() {
        if(count === 0) {
            setCount(initialCount)
        }

        setPaused(false)
    }

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
            <Container>
                <h1>Pomodoro Timer</h1>
                <p className="fade alert alert-secondary show">{timerConvert(count)}</p>
                <Row>
                    <Col>
                        <Button variant="success" block onClick={() => startTimer()} disabled={!paused}>Start</Button>
                    </Col>
                    <Col>
                        <Button variant="secondary" block onClick={() => setPaused(true)} disabled={paused}>Stop</Button>
                    </Col>
                    <Col>
                        <Button variant="secondary" block onClick={() => {setCount(initialCount)}} disabled={paused}>Reset</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}