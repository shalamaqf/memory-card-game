import { useEffect, useRef, useState } from 'react'
import '../styles/App.css'
import data from '../data/spaceObjectsData.js';
import Header from './Header.jsx';
import CardGrid from './CardGrid.jsx';

export default function App() {
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [spaceObjects, setSpaceObjects] = useState([]);
    const [gameMessage, setGameMessage] = useState("Get points by clicking on an image but don't click on any more than once!");
    const [count, setCount] = useState(5);

    let isMounted = useRef(true);

    // Fetching data images
    async function fetchData() {
        try {
            const fetchPromises = data.map(item => fetch(`https://images-api.nasa.gov/asset/${item.nasaId}`));
            const responses = await Promise.all(fetchPromises);
            const jsonArray = await Promise.all(responses.map(res => res.json()));
            const imageUrl = jsonArray.map(item => {
                if (item.collection.items[0]) {
                    return item.collection.items[0].href;
                } else {
                    return 'https://via.placeholder.com/200?text=No+Image';
                }
            });

            return imageUrl;
        } catch {
            console.log('Fetch is failed.')
            return data.map(() => 'https://via.placeholder.com/200?text=No+Image');

        }
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

        console.log(shuffled)

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

        isMounted.current = true;
        handleSpaceObjects();

        return (() => isMounted.current = false);
    }, []);

    function handleWinMessage() {
        setGameMessage(`You guessed all card! Mission accomplished 🚀 . New game will starts in ${count} ...`)
    }

    function handleClick(id) {
        let newScore;
        let newArray;
        let updatedArray;

        const cardObj = spaceObjects.find(item => item.cardId === id);

        if (cardObj.isClicked) {
            setCurrentScore(0);
            newArray = spaceObjects.map(item => ({...item, isClicked: false}));
            setSpaceObjects(shuffleArr(newArray));
        } else {
            setCurrentScore(prev => {
                newScore = prev + 1;
                updatedArray = spaceObjects.map(item => {
                        return item.cardId === id ? ({...item, isClicked: true}) : item;
                    }
                )

                setBestScore(prev => newScore > prev ? newScore : prev);
                setSpaceObjects(shuffleArr(updatedArray))

                return newScore;
            })
        }
    }

    return (
        <>
            <Header currentScore={currentScore} bestScore={bestScore} />
            <CardGrid handleClick={handleClick} spaceObjects={spaceObjects} />
        </>
    )
}