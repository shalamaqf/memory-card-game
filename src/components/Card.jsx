export default function Card({src, alt, spaceObjectName, handleClick, cardId}) {
    return (
        <div className="card" onClick={() => handleClick(cardId)}>
            <div className="image-container">
                <img src={src} alt={alt} />
            </div>
            <div className="name-container">
                <p>{spaceObjectName}</p>
            </div>
        </div>
    )
}