import React, { useState } from 'react'
import './Timer.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Up from '../../assests/Up.svg'
import Down from '../../assests/Down.svg'


function Timer() {
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [timerCompleted, setTimerCompleted] = useState(false);

    const formatValue = (value) => {
        return value < 10 ? `0${value}` : value;
    };


    const increaseHours = () => {
        setHours(hours + 1);
        if (hours == 23) {
            setHours(0)
        }
    }

    const increaseMinutes = () => {
        setMinutes(minutes + 1);
        if (minutes == 59) {
            setMinutes(0)
        }
    }

    const increaseSeconds = () => {
        setSeconds(seconds + 1)
        if (seconds == 59) {
            setSeconds(0)
        }
    }

    const decreaseHours = () => {
        setHours(hours - 1);
        if (hours == 0) {
            setHours(23)
        }
    }

    const decreaseMinutes = () => {
        setMinutes(minutes - 1);
        if (minutes == 0) {
            setMinutes(59)
        }
    }

    const decreaseSeconds = () => {
        setSeconds(seconds - 1)
        if (seconds == 0) {
            setSeconds(59)
        }
    }

    function toHoursAndMinutes(totalSeconds) {
        const totalMinutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${formatValue(hours)} : ${formatValue(minutes)} : ${formatValue(seconds)}`;
    }

    return (
        <div className='container4'>
            <div className='Timer'>
                <div className='Countdown'>
                    <CountdownCircleTimer
                        key={timerCompleted ? "playing" : "paused"}
                        isPlaying={playing}
                        duration={seconds + minutes * 60 + hours * 60 * 60}
                        colors={timerCompleted ? ["white"] : ["#FF6A6A"]}
                        onComplete={() => {
                            setPlaying(false);
                            setTimerCompleted(true);
                        }}
                    >
                        {({ remainingTime }) => <span style={{ fontSize: "20px" }}> {timerCompleted ? "Over!" : toHoursAndMinutes(remainingTime)}</span>}
                    </CountdownCircleTimer>
                </div>
                <div className='Hours'>
                    <p>Hours</p>
                    <img src={Up} onClick={increaseHours} />
                    <h2>{formatValue(hours)} </h2>
                    <img src={Down} onClick={decreaseHours} />
                </div>
                <h1 >:</h1>
                <div className='Minutes'>
                    <p>Minutes</p>
                    <img src={Up} onClick={increaseMinutes} />
                    <h2>{formatValue(minutes)}</h2>
                    <img src={Down} onClick={decreaseMinutes} />
                </div>
                <h1>:</h1>
                <div className='Seconds'>
                    <p>Seconds</p>
                    <img src={Up} onClick={increaseSeconds} />
                    <h2>{formatValue(seconds)}</h2>
                    <img src={Down} onClick={decreaseSeconds} />
                </div>
            </div>
            <button className='start' onClick={() => {
                if (timerCompleted) {
                    setTimerCompleted(false);
                    setPlaying(false);
                    setHours(0);
                    setMinutes(0);
                    setSeconds(0);
                } else {
                    setPlaying((play) => !play);
                }
            }}>
                {timerCompleted ? <p>RESET</p> : (playing ? <p>PAUSE</p> : <p>START</p>)}
            </button>
        </div>
    )
}

export default Timer