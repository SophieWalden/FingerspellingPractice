import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [word, setWord] = useState("test");
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [correct, setCorrect] = useState(false); // New state to trigger the green indicator
  const [wrong, setWrong] = useState(false);

  // Speed values in milliseconds
  const speedOptions = {
    slow: 2000, // 2 seconds per letter
    medium: 1000,    // 1 second per letter
    fast: 500, // 0.5 seconds per letter
    extreme: 250      // 0.25 seconds per letter
  };
  const [speed, setSpeed] = useState(speedOptions.medium); // Default speed: medium

  // List of words to choose randomly from
  const wordsList = [
    'hello', 'world', 'react', 'fingerspell', 'example', 'quick', 'brown',
    'jumps', 'lazy', 'dog', 'apple', 'orange', 'water', 'river', 'mountain', 
    'happy', 'school', 'class', 'teacher', 'learn', 'sign', 'language', 
    'friend', 'family', 'summer', 'winter', 'flower', 'garden', 'forest', 
    'breeze', 'ocean', 'calm', 'peace', 'energy', 'music', 'dance', 'color', 
    'story', 'artist', 'travel', 'joyful', 'honest', 'freedom', 'future', 
    'dream', 'gift', 'nature', 'open', 'unity', 'brave', 'honor', 'bright',
    'light', 'shadow', 'star', 'moon', 'sunrise', 'sunset', 'peaceful',
    'silence', 'mountain', 'river', 'valley', 'desert', 'island', 'lake',
    'canyon', 'beach', 'city', 'village', 'community', 'hope', 'smile',
    'love', 'trust', 'strength', 'courage', 'wisdom', 'gratitude', 'respect',
    'faith', 'dream', 'inspire', 'create', 'imagine', 'discover', 'explore',
    'adventure', 'joy', 'harmony', 'balance', 'serenity', 'growth', 'kindness',
    'passion', 'wonder', 'serene', 'radiant', 'sparkle', 'shine', 'glow',
    'refresh', 'vibrant', 'elegant', 'delight', 'charm', 'grace', 'beauty',
    'tranquil', 'warmth', 'comfort', 'cuddle', 'friendship', 'compassion'
  ];
  

  // Function to start or restart the spelling of the current word
  const startPlaying = (newWord = false) => {
    setIsPlaying(true);
    setIndex(0);
    setResult("");
    setGuess("");
    setCorrect(false);  // Reset the correct indicator
    setWrong(false)

    if (newWord) {
      setWord(wordsList[Math.floor(Math.random() * wordsList.length)]);
    }
  };

  // Effect to play the word index by index
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex < word.length - 1) {
          return prevIndex + 1;
        } else {
          clearInterval(interval);
          setIsPlaying(false);
          return word.length - 1;  // End on the last index
        }
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, index, word, speed]);

  // Function to check the player's guess
  const checkGuess = () => {
    if (guess.toLowerCase() === word) {
      setResult("Correct!");
      setScore((prevScore) => prevScore + 1);
      setCorrect(true); // Trigger the green border and scale effect
      setTimeout(() => startPlaying(true), 1500); // Move to the next word after a delay
    } else {
      setResult("False! The word was " + word);
      setWrong(true)
      setTimeout(() => startPlaying(), 1500);
    }
  };

  return (
    <div id="container">
      <div id="title">
        <h1>ASL Fingerspelling - ALS 101 Practice</h1>
        <h3>By Sophie Walden</h3>
        <p id="score">Score: {score}</p>
      </div>

    
      <div className={`fingerspell-container ${correct ? 'correct' : ''} ${wrong ? 'wrong' : ''}`}>
        {word && <img src={`https://asl.ms/()/images/${word[index]}.gif`} alt={word[index]} />}
      </div>

      <div id="selectors">
        <button onClick={() => startPlaying()}>Restart Current Word</button>
        <button onClick={() => startPlaying(true)}>Get New Word</button>

        <label id="speed-selector">
          <p id="speed">Speed:</p>
          <select onChange={(e) => setSpeed(speedOptions[e.target.value])}>
            <option value="slow">Slow</option>
            <option value="medium" selected>Medium</option>
            <option value="fast">Fast</option>
            <option value="extreme">Extreme</option>
          </select>
        </label>
      </div>

      <div className="guess-section">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              checkGuess();
            }
          }}
          placeholder="Guess the word"
        />
        <button onClick={checkGuess}>Submit Guess</button>
      </div>
    </div>
  );
}

export default App;
