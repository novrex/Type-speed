/**
 * TypingTest Component
 *
 * This component implements a typing speed test with real-time feedback.
 * It calculates WPM, accuracy, and provides visual highlighting of typed characters.
 *
 * Features:
 * - Real-time WPM and accuracy calculation
 * - Visual feedback with color-coded characters (correct: green, incorrect: red, untyped: gray)
 * - Case-insensitive matching
 * - Timer starts on first keystroke
 * - Reset and stop test functionality
 *
 * @returns {JSX.Element} The TypingTest component JSX
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './TypingTest.css';

const sampleText = "The quick brown fox jumps over the lazy dog . this is a typing test to measure your speed and accuracy.";

const TypingTest = () => {
  // State variables
  const [userInput, setUserInput] = useState('');
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState({ wpm: 0, accuracy: 0, errors: 0 });

  // Refs for timer and input
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  // Effect: Start timer on first keystroke
  useEffect(() => {
    if (userInput.length > 0 && !timerStarted) {
      setTimerStarted(true);
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
  }, [userInput, timerStarted]);

  // Effect: Cleanup timer on unmount or finish
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Effect: Focus input on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);



  // Calculate live results (real-time)
  const calculateLiveResults = useCallback(() => {
    const words = userInput.trim().split(' ').length;
    const wpm = Math.round((words / (timeElapsed / 60)) || 0);
    const correctChars = matchChars(userInput, sampleText);
    const accuracy = Math.round((correctChars / Math.max(userInput.length, 1)) * 100);
    setResults({ wpm, accuracy, errors: userInput.length - correctChars });
  }, [userInput, timeElapsed]);

  // Calculate final results
  const calculateResults = useCallback(() => {
    const words = sampleText.trim().split(' ').length;
    const wpm = Math.round((words / (timeElapsed / 60)) || 0);
    const correctChars = matchChars(userInput, sampleText);
    const accuracy = Math.round((correctChars / sampleText.length) * 100);
    setResults({ wpm, accuracy, errors: sampleText.length - correctChars });
  }, [timeElapsed, userInput]);

  // Effect: Calculate results when input changes or finishes
  useEffect(() => {
    if (isFinished || userInput === sampleText) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      calculateResults();
    } else if (timerStarted && !isFinished) {
      calculateLiveResults();
    }
  }, [userInput, timeElapsed, isFinished, calculateLiveResults, calculateResults, timerStarted]);

  // Handle input change
  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);
    if (input.toLowerCase() === sampleText.toLowerCase()) {
      setIsFinished(true);
    }
  };

  // Helper: Count matching characters (case insensitive)
  const matchChars = (input, target) => {
    return input.split('').reduce((count, char, i) => {
      return i < target.length && char.toLowerCase() === target[i].toLowerCase() ? count + 1 : count;
    }, 0);
  };

  // Reset function
  const resetTest = () => {
    setUserInput('');
    setTimerStarted(false);
    setTimeElapsed(0);
    setIsFinished(false);
    setResults({ wpm: 0, accuracy: 0, errors: 0 });
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    inputRef.current.focus();
  };

  return (
    <div className="typing-test">
      <div className="text-display">
        <p className={userInput.length > 0 ? 'started' : ''}>
          {sampleText.split('').map((char, index) => (
            <span
              key={index}
              className={
                index < userInput.length
                  ? userInput[index].toLowerCase() === char.toLowerCase()
                    ? 'correct'
                    : 'incorrect'
                  : 'untyped'
              }
            >
              {char}
            </span>
          ))}
        </p>
      </div>

      <textarea
        ref={inputRef}
        value={userInput}
        onChange={handleInputChange}
        placeholder="Start typing the text above..."
        disabled={isFinished}
        className="input-area"
      />

      <div className="stats">
        <div>Time: {timeElapsed}s</div>
        <div>WPM: {results.wpm}</div>
        <div>Accuracy: {results.accuracy}%</div>
        <div>Errors: {results.errors}</div>
      </div>

      {isFinished && (
        <div className="results">
          <h2>Finished!</h2>
          <p>Your WPM: {results.wpm}</p>
          <p>Accuracy: {results.accuracy}%</p>
          <p>Time Taken: {timeElapsed}s</p>
          <button onClick={resetTest}>Reset</button>
        </div>
      )}

      {!isFinished && (
        <button onClick={() => { setIsFinished(true); calculateResults(); }}>Stop Test</button>
      )}
    </div>
  );
};

export default TypingTest;