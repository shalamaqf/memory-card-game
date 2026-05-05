import Card from "./Card"

export default function CardGrid({handleClick, spaceObjects}) {
    return (
        <main className="card-grid">
            {spaceObjects.map(item => {
                return <Card 
                            src={item.imageSrc} 
                            alt={item.imageAlt} 
                            spaceObjectName={item.name}
                            handleClick={handleClick}
                            key={item.cardId} 
                        />
            })}
        </main>
    )
}