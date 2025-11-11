/**
 * App Component
 *
 * This is the main component of the Typing Speed Calculator application.
 * It renders the header and the TypingTest component.
 *
 * @returns {JSX.Element} The App component JSX
 */
import React from 'react';
import TypingTest from './TypingTest';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Typing Speed Calculator</h1>
        <p>Test your typing speed and accuracy!</p>
      </header>
      <main>
        <TypingTest />
      </main>
    </div>
  );
}

export default App;
