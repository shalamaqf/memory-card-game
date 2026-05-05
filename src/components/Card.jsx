export default function Card({src, alt, spaceObjectName, handleClick, cardData}) {
    return (
        <div className="card" onClick={() => handleClick(cardData)}>
            <div className="image-container">
                <img src={src} alt={alt} />
            </div>
            <div className="name-container">
                <p>{spaceObjectName}</p>
            </div>
        </div>
    )
}