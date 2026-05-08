export default function HeaderLeftSection({gameMessage}) {
    return (
        <div className="header-left-section">
            <div className="title-container">
                <h1>Space Memory Card Game</h1>
            </div>
            <p className="game-guide-text">{gameMessage}</p>
        </div>
    )
}