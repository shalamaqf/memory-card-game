import { useEffect, useRef, useState } from 'react'
import './App.css'
import data from '../data/spaceObjectsData.js';

export default function App() {
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    function handleClick(isClicked) {
        let newScore;

        if (isClicked) {
        setCurrentScore(0);
        return;
        } else {
        newScore = currentScore + 1;
        setCurrentScore(newScore);

        if (newScore > bestScore) {
            setBestScore(newScore);
        }
        }
    }

    return (
        <>
        
        </>
    )
}