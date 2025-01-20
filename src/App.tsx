import { useState } from "react";

type Card = {
  type: string;
  status: "hidden" | "selected" | "completed";
};

const itemTypes = [
  "bullet-bill",
  "coin",
  "flower-fire-2",
  "flower-fire",
  "goomba",
  "paper-bowser",
  "paper-mario",
  "question",
  "shyguy",
  "star",
  "super-mushroom-2",
  "super-mushroom",
  "yoshis-egg",
];

// Fisher-Yates Shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateInitialCards = (itemTypes: string[]): Card[] => {
  // Each item type is duplicated so they can match each other
  const cards: Card[] = itemTypes.reduce((acc, item) => {
    const newItem: Card = { type: item, status: "hidden" };
    return [...acc, newItem, newItem];
  }, [] as Card[]);

  return shuffleArray(cards);
};

function App() {
  const [cards, setCards] = useState(generateInitialCards(itemTypes));

  return (
    <div className="flex justify-center">
      <div className="w-[800px] flex gap-4 flex-wrap">
        {cards.map((item, index) => (
          <div key={index} className="bg-neutral-300">
            <img src={`/${item.type}.png`} width={60} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
