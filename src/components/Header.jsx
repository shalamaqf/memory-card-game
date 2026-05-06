import HeaderLeftSection from "./HeaderLeftSection";
import HeaderRightSection from "./HeaderRightSection";

export default function Header({currentScore, bestScore, gameMessage}) {
    return (
        <header>
            <HeaderLeftSection gameMessage={gameMessage}/>
            <HeaderRightSection currentScore={currentScore} bestScore={bestScore} />
        </header>
    )
}