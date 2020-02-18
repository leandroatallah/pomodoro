import React, { useState, useEffect } from 'react'
import {Container, Row, Col, Button, Alert, Badge, Jumbotron} from 'react-bootstrap';

export default function App() {
    const [initialCount, setInitialCount] = useState(10)
    const [count, setCount] = useState(initialCount)
    const [working, setWorking] = useState(true)
    const [paused, setPaused] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            if(count === 1) {
                setCount(0)
                setPaused(true)

                if(working) {
                    setInitialCount(5)
                    setWorking(false)
                } else {
                    setInitialCount(10)
                    setWorking(true)
                }
            }

            if(!paused) {
                setCount(count => count ? count - 1 : 0)
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [count, working, paused])

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
                <h1>Pomodoro Timer / <Badge variant="primary">{working ? 'Working' : 'Break'}</Badge></h1>
                <hr/>
                <br/>
                <Jumbotron fluid>
                <h1 className="text-center">{timerConvert(count)}</h1>
                </Jumbotron>
                <Row>
                    <Col>
                        <Button variant="success" size="lg" block onClick={() => startTimer()} disabled={!paused}>Start</Button>
                    </Col>
                    <Col>
                        <Button variant="secondary" size="lg" block onClick={() => setPaused(true)} disabled={paused}>Stop</Button>
                    </Col>
                    <Col>
                        <Button variant="secondary" size="lg" block onClick={() => {setCount(initialCount)}} disabled={paused}>Reset</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}