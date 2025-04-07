import DraggableCard from "./DraggableCard";
interface Card {
  id: number;
  title: string;
}
const CardContainer = ({
  cards,
  onDragStart,
  onDragOver,
  onDrop,
  currentId,
  onClick,
}) => {
  return (
    <div className="w-full overflow-auto">
      {cards.map((card:Card, index:number) => {
        return (
          <DraggableCard
            key={card.id}
            card={card}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            currentId={currentId}
            onClick={onClick}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default CardContainer;
