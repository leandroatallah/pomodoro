import React, { useState, useEffect } from 'react'
import {Container, Row, Col, Button, Badge, Jumbotron} from 'react-bootstrap';
import './assets/main.css'
import notificationMp3 from './assets/notification.mp3'
import notificationOgg from './assets/notification.ogg'

export default function App() {
    const [sessionTime, setSessionTime] = useState(1500)
    const [breakTime, setBreakTime] = useState(300)
    const [count, setCount] = useState(sessionTime)
    const [working, setWorking] = useState(true)
    const [breakCount, setBreakCount] = useState(false)
    const [paused, setPaused] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            if(count === 0) {
                setPaused(true)

                if(working) {
                    if(breakCount >= 3) {
                        setCount(breakTime * 2)
                        setBreakCount(0)
                    } else {
                        setBreakCount(breakCount => breakCount + 1)
                        setCount(breakTime)
                    }
                } else {
                    setCount(sessionTime)
                }

                setWorking(!working)
                playNotification()
            }

            if(!paused && count) {
                setCount(count => count ? count - 1 : 0)
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [count, working, breakCount, paused, sessionTime, breakTime])

    function startTimer() {
        if(count === 0) {
            setCount(count)
        }
        
        setPaused(false)
    }

    function resetTimer() {
        setSessionTime(1500)
        setBreakTime(300)
        setCount(sessionTime)
        setBreakCount(0)
        setWorking(true)
        setPaused(true)
    }
    
    function playNotification() {
        const notification = document.getElementById('notification-source')
        notification.play()
    }

    function updateSessionTime(time) {
        if(!paused) {
            return
        }

        if(time < 60) {
            time = 60
        } else if(time > 3600) {
            time = 3600
        }

        setSessionTime(time)

        if(working) {
            setCount(time)
        }
    }

    function updateBreakTime(time) {
        if(!paused) {
            return
        }

        if(time < 60) {
            time = 60
        } else if(time > 3600) {
            time = 3600
        }

        setBreakTime(time)

        if(!working) {
            setCount(time)
        }
    }

    // function updateCount() {
    //     if(working) {
    //         setCount(sessionTime)
    //     } else {
    //         setCount(breakTime)
    //     }
    // }

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
            <audio id="notification-source">
                <source src={notificationMp3} type="audio/ogg" />
                <source src={notificationOgg} type="audio/mpeg" />
            </audio>

            <Container>
                <br />
                <Row className="justify-content-between align-items-center">
                    <Col>
                        <h1>Pomodoro Timer</h1>
                    </Col>
                    <Col className="text-right">
                        <h2><Badge variant={working ? "success" : "primary"}>{working ? 'Working' : (breakCount >= 3 ? 'Long Break' : 'Break')}</Badge></h2>
                    </Col>
                </Row>
                <br/>
                <Jumbotron>
                <h1 className="text-center">{timerConvert(count)}</h1>
                </Jumbotron>
                <Row>
                    <Col>
                        <Button variant="success" size="lg" block onClick={() => startTimer()} disabled={!paused}>Start</Button>
                    </Col>
                    <Col>
                        <Button variant="light" size="lg" block onClick={() => setPaused(true)} disabled={paused}>Stop</Button>
                    </Col>
                    <Col>
                        <Button variant="light" size="lg" block onClick={() => resetTimer()}>Reset</Button>
                    </Col>
                </Row>

                <br/>

                <Jumbotron style={{padding: '20px'}}>
                    <Row>
                        <Col className="text-center">
                            <h5>Session</h5>
                            <Row className="justify-content-center">
                                <Button variant="light" onClick={() => updateSessionTime(sessionTime + 60)}>+</Button>
                                <h4 style={{padding: '0 20px'}}>{sessionTime / 60}</h4>
                                <Button variant="light" onClick={() => updateSessionTime(sessionTime - 60)}>-</Button>
                            </Row>
                        </Col>
                        <Col className="text-center">
                            <h5>Break</h5>
                            <Row className="justify-content-center">
                                <Button variant="light" onClick={() => updateBreakTime(breakTime + 60)}>+</Button>
                                <h4 style={{padding: '0 20px'}}>{breakTime / 60}</h4>
                                <Button variant="light" onClick={() => updateBreakTime(breakTime - 60)}>-</Button>
                            </Row>
                        </Col>
                    </Row>
                </Jumbotron>
            </Container>
        </>
    )
}