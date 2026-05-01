import { useEffect, useRef, useState } from 'react'
import './App.css'
import data from '../data/spaceObjectsData.js';

export default function App() {
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    // Fetching data images
    async function fetchData() {
        const fetchPromises = data.map(item => fetch(`https://images-api.nasa.gov/search?q=${item.nasaId}`));
        const responses = await Promise.all(fetchPromises);
        const jsonArray = await Promise.all(responses.map(res => res.json()));
        const imageUrl = jsonArray.map(item => {
            if (item.collection.items[0]) {
                if (item.collection.items[0].links[0]) {
                    return item.collection.items[0].links[0].href;
                }
            }

            return 'https://via.placeholder.com/200?text=No+Image';
        });

        return imageUrl;
    }

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