# Typing Speed Calculator

A React-based web application to test and measure your typing speed and accuracy. The app provides real-time feedback on words per minute (WPM), accuracy percentage, and error count.

## Features

- Real-time typing speed calculation (WPM)
- Accuracy tracking with visual feedback (correct/incorrect/untyped characters)
- Case-insensitive matching
- Timer starts on first keystroke
- Stop test early or complete by typing the full text
- Reset functionality to start over
- Responsive design with full-screen layout

## Demo

You can view the live demo at [http://localhost:3000]
after running the app locally.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/typing-speed-app.git
   cd typing-speed-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The app will open in your browser at [http://localhost:3000](http://localhost:3000).

## Usage

1. Start typing the displayed text in the textarea.
2. The timer begins automatically on the first keystroke.
3. Characters are highlighted: green for correct, red for incorrect, gray for untyped.
4. View real-time stats: Time, WPM, Accuracy, Errors.
5. Complete the text or click "Stop Test" to finish.
6. Click "Reset" to start a new test.

## Project Structure

- `src/App.js`: Main app component
- `src/TypingTest.js`: Core typing test logic and UI
- `src/App.css`: Styles for the app layout
- `src/TypingTest.css`: Styles for the typing test component
- `src/index.js`: Entry point
- `public/index.html`: HTML template

## Tech Used

- React 19
- JavaScript (ES6+)
- CSS3
- Create React App

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request
