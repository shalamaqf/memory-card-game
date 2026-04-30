import HeaderLeftSection from "./HeaderLeftSection";
import HeaderRightSection from "./HeaderRightSection";

export default function Header({currentScore, bestScore}) {
    return (
        <header>
            <HeaderLeftSection />
            <HeaderRightSection currentScore={currentScore} bestScore={bestScore} />
        </header>
    )
}