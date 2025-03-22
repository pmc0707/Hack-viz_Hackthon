import React, { useState, useEffect } from "react";
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from "recharts";
import "./timer.css";

const FocusTracker = () => {
  const [active, setActive] = useState(true);
  const [idleTime, setIdleTime] = useState(0);
  const [focusTime, setFocusTime] = useState(0);
  const [focusScore, setFocusScore] = useState(100);
  const [focusData, setFocusData] = useState([]);
  const idleThreshold = 10;

  useEffect(() => {
    let idleTimer, focusTimer;

    if (focusScore > 0 && !active) {
      idleTimer = setInterval(() => {
        setIdleTime((prev) => {
          if (prev + 1 >= idleThreshold) {
            setFocusScore((score) => {
              if (score - 5 <= 0) {
                alert("Warning: Your focus score is 0! Consider taking a break.");
                clearInterval(idleTimer);
                clearInterval(focusTimer);
              }
              return Math.max(score - 5, 0);
            });
            setFocusData((prevData) => [...prevData, { time: new Date().toLocaleTimeString(), focusTrend: -1 }]);
            setIdleTime(0);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    if (active) {
      focusTimer = setInterval(() => {
        setFocusTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= idleThreshold) {
            setFocusTime(0);
            setFocusData((prevData) => [...prevData, { time: new Date().toLocaleTimeString(), focusTrend: 1 }]);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(focusTimer);
    }

    const resetIdleTimer = () => {
      setIdleTime(0);
      setActive(true);
      clearInterval(idleTimer);
    };

    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);

    return () => {
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
      clearInterval(idleTimer);
      clearInterval(focusTimer);
    };
  }, [focusScore, active]);

  return (
    <div className="container" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
      <h1>Focus Tracker</h1>
      
      <div className="card">
        <p>Focus Score: {focusScore}</p>
        <p>Idle Timer: {idleTime} sec / {idleThreshold} sec</p>
        <p>Focused Timer: {focusTime} sec / {idleThreshold} sec</p>
        <p className={active ? "focused" : "distracted"}>{active ? "You are focused!" : "You got distracted!"}</p>
      </div>
      
      <button className="reset-btn" onClick={() => { setFocusScore(100); setFocusTime(0); setIdleTime(0); setFocusData([]); }}>
        Reset Focus Score
      </button>
      
      <div className="chart-container">
        <h2>Focus & Distraction Trend</h2>
        <LineChart width={600} height={300} data={focusData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="focusTrend" stroke="#4c6ef5" name="Focus Trend" />
        </LineChart>
      </div>
    </div>
  );
};

export default FocusTracker;
