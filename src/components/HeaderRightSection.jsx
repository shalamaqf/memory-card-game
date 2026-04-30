export default function HeaderRightSection({currentScore, bestScore}) {
    return (
        <div className="score-board-container">
            <p className="current-score score">Current Score: {currentScore}</p>
            <p className="best-score score">Best Score: {bestScore}</p>
        </div>
    )
}