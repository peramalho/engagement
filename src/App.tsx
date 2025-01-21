import { useState } from "react";

const MAX_HEALTH_POINTS = 5;

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
  const [healthPoints, setHealthPoints] = useState(MAX_HEALTH_POINTS);

  return (
    <div className="flex items-center flex-col p-8">
      <h1 className="text-4xl mb-4 bg-blue-200 p-4 rounded-md">
        Descubra o que o Mario está falando para a Peach!
      </h1>
      <div className="w-[650px] flex gap-4 flex-wrap bg-blue-300 justify-center p-4 rounded-md">
        {cards.map((item, index) => (
          <button key={index} className="bg-neutral-200 rounded-xl p-1">
            <img src={`/${item.type}.png`} width={80} />
          </button>
        ))}
      </div>
      <img src="question.png" width={88} />
    </div>
  );
}

export default App;
