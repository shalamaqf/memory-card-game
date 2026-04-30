export default function Card({src, alt, spaceObjectName, handleClick}) {
    return (
        <div className="card" onClick={handleClick}>
            <div className="image-container">
                <img src={src} alt={alt} />
            </div>
            <div className="name-container">
                <p>{spaceObjectName}</p>
            </div>
        </div>
    )
}