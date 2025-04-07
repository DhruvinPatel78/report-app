"use client";
import React, { useEffect, useRef, useState } from "react";
import CardContainer from "@/components/CardContainer";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Save, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Card {
  id: number;
  title: string;
}

const initialCards: Card[] = [
  { id: 1, title: "Cover Page" },
  { id: 2, title: "Tab of Contents" },
  { id: 3, title: "PPC Report Summary" },
];

const Dashboard = () => {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [draggedCardId, setDraggedCardId] = useState<number | null>(null);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newSection, setNewSection] = useState<string>("");
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [selectedContent, setSelectedContent] = useState<Card | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [editTitle, setEditTitle] = useState<string>("");

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    setDraggedCardId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const editHandler = (id: number) => {
    const filteredCards = cards.map((card) =>
      card.id === id
        ? {
            ...card,
            title: editTitle,
          }
        : card,
    );
    setSelectedContent((prevState) =>
      prevState ? { ...prevState, title: editTitle } : null,
    );
    setCards(filteredCards);
    setIsEdit(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    const draggedCardIndex = cards.findIndex(
      (card) => card.id === draggedCardId,
    );
    const targetCardIndex = cards.findIndex((card) => card.id === id);

    if (
      draggedCardIndex !== -1 &&
      targetCardIndex !== -1 &&
      draggedCardIndex !== targetCardIndex
    ) {
      const newCards = [...cards];
      const [movedCard] = newCards.splice(draggedCardIndex, 1);
      newCards.splice(targetCardIndex, 0, movedCard);
      setCards(newCards);
    }

    setDraggedCardId(null);
  };

  const handleCardClick = (id: number, key: number) => {
    const cardRef = cardRefs.current[key];
    if (cardRef) {
      cardRef.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setSelectedContent(null);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const number = Number(entry.target.id);
          setCurrentId(number);
        }
      });
    });

    cardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [cards]);

  return (
    <div className="flex flex-row bg-[#e7e9ed] h-screen">
      <div className="max-w-[300px] w-full flex flex-col justify-between bg-white">
        <CardContainer
          cards={cards}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          currentId={currentId}
          onClick={handleCardClick}
        />
        <div className="m-4 flex flex-col gap-4">
          {isAdd && (
            <Input
              placeholder="Enter Section"
              value={newSection}
              onChange={(e) => setNewSection(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setCards((prev) => [
                    ...prev,
                    { id: Date.now(), title: newSection },
                  ]);
                  setNewSection("");
                  setIsAdd(false);
                }
              }}
            />
          )}
          <Button
            className="p-[20px] cursor-pointer"
            onClick={() => setIsAdd(true)}
          >
            <Plus />
            Add Section
          </Button>
        </div>
      </div>
      <div
        className="w-full h-screen overflow-auto flex flex-col gap-6 p-6"
        id={"content"}
      >
        {cards.map((item:Card, index:number) => (
          <div
            className="card bg-white w-full h-full p-4 min-h-screen cursor-pointer"
            key={item.id}
            id={item.id.toString()}
            ref={(el) => (cardRefs.current[index] = el!)}
            onClick={() => {
              setSelectedContent(item);
              setEditTitle(item.title);
            }}
          >
            <h2 className="text-center font-bold text-4xl">{item.title}</h2>
          </div>
        ))}
      </div>
      {selectedContent && (
        <div
          className={
            "w-full flex flex-col max-w-[300px] h-screen overflow-auto bg-white p-4"
          }
        >
          <div className={"flex justify-end"}>
            <X
              onClick={() => {
                setSelectedContent(null);
                setEditTitle("");
                setIsEdit(false);
              }}
              className={"cursor-pointer"}
            />
          </div>
          <div
            className={
              "flex flex-row justify-between items-center h-[40px] gap-4 w-full"
            }
          >
            {isEdit ? (
              <Input
                placeholder={"Enter Section"}
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              <div
                className={
                  "font-bold w-full flex flex-row gap-2 text-xl items-center"
                }
              >
                <span className={"truncate"}>{selectedContent.title}</span>
                <Pencil
                  className={"w-5 h-5 cursor-pointer"}
                  onClick={() => setIsEdit(!isEdit)}
                />
              </div>
            )}
            {isEdit ? (
              <Button
                variant="outline"
                size="icon"
                className={"cursor-pointer"}
                onClick={() => editHandler(selectedContent?.id as number)}
              >
                <Save />
              </Button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
