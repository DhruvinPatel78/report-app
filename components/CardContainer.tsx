import React from "react";
import DraggableCard from "./DraggableCard";

// Define the type for a card object
interface Card {
  id: number;
  title: string;
}

interface CardContainerProps {
  cards: Card[];
  onDragStart: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
  currentId: string;
  onClick: (card: Card) => void;
}

const CardContainer: React.FC<CardContainerProps> = ({
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
