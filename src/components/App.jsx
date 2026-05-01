import { useEffect, useRef, useState } from 'react'
import './App.css'
import data from '../data/spaceObjectsData.js';

export default function App() {
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [spaceObjects, setSpaceObjects] = useState([]);

    let isMounted = useRef(true);

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

    // Space objects creation
    async function createSpaceObjects() {
        let imageUrl = await fetchData();
        let tempArray = [];

        for (let i = 0; i < 12; i++) {
            const object = {name: `${data[i].name}`,
                            imageSrc: imageUrl[i],
                            imageAlt : `A photo of ${data[i].name}`,
                            cardId: i + 1,
                            isClicked: false};
            tempArray.push(object);
        }

        return tempArray;
    }

    function shuffleArr(arr) {
        let shuffled = [];

        for (let i = 0; i < arr.length; i++) {
            let num = Math.floor(Math.random() * arr.length) + 1;
            let cardObj = arr.find(obj => obj.cardId === num);

            while (shuffled.includes(cardObj)) {
                num = Math.floor(Math.random() * arr.length) + 1;
                cardObj = arr.find(obj => obj.cardId === num);
            }

            shuffled.push(cardObj);
        }

        return shuffled;
    }

    // Set space objects
    useEffect( () => {
        async function handleSpaceObjects() {
            const arr = await createSpaceObjects();

            if (isMounted.current) {
                setSpaceObjects(shuffleArr(arr));
            }
        }


        handleSpaceObjects();

        return (() => isMounted.current = false);
    }, []);

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

        setSpaceObjects(prev => shuffleArr(prev));
    }

    return (
        <>
        
        </>
    )
}