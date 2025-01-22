import clsx from "clsx";
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
  const [firstCardSelected, setFirstCardSelected] = useState<
    undefined | number
  >(undefined);

  const handleSelectCard = (index: number) => {
    const selectedCard = cards[index];

    // Do nothing if card is revealed
    if (selectedCard.status !== "hidden") {
      return;
    }

    const newSelectedCard: Card = { ...selectedCard, status: "selected" };
    const newCards: Card[] = [
      ...cards.slice(0, index),
      newSelectedCard,
      ...cards.slice(index + 1),
    ];
    setCards(newCards);
  };

  return (
    <div className="flex items-center flex-col p-8">
      <h1 className="text-4xl mb-4 text-white bg-blue-600 p-4 rounded-md">
        Descubra o que o Mario esta dizendo para a Peach!
      </h1>
      <div className="w-[650px] flex gap-4 flex-wrap bg-blue-600 justify-center p-4 rounded-md">
        {cards.map((item, index) => {
          if (item.status === "hidden") {
            return (
              <button
                key={index}
                onClick={() => handleSelectCard(index)}
                className="select-none hover:opacity-85"
              >
                <img src="question.png" width={88} />
              </button>
            );
          }

          return (
            <button
              key={index}
              onClick={() => handleSelectCard(index)}
              className="p-1 rounded-xl bg-neutral-200 cursor-default select-none"
            >
              <img src={`${item.type}.png`} width={80} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
