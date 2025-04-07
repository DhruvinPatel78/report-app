import React from "react";
import { Card } from "@/components/ui/card";
import { GripVertical } from "lucide-react";

interface DraggableCardProps {
  card: {
    id: number;
    title: string;
  };
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
  currentId?: string;
  onClick: (id: number, index: number) => void;
  index: number;
}

const DraggableCard: React.FC<DraggableCardProps> = ({
  card,
  onDragStart,
  onDragOver,
  onDrop,
  currentId,
  onClick,
  index,
}) => {
  return (
    <Card
      draggable
      onDragStart={(e) => onDragStart(e, card.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, card.id)}
      onClick={() => onClick(card.id, index)}
      className={`p-4 ${currentId?.toString() === card.id.toString() ? "bg-[#ebebeb] font-bold" : "bg-white"} shadow-none cursor-pointer flex flex-row gap-2 rounded-none border-b border-gray-200 `}
    >
      <GripVertical
        className={`${currentId?.toString() === card.id.toString() ? "text-black" : "text-[#747474]"}`}
      />
      <span className={"truncate"}>{card.title}</span>
    </Card>
  );
};

export default DraggableCard;
