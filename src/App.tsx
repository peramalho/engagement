import clsx from "clsx";
import { useState } from "react";

const MARIO_ACTOR = "Pedro";
const PEACH_ACTOR = "Raiany";

type CardStatus = "hidden" | "selected" | "completed";

type Card = {
  id: string;
  type: string;
  status: CardStatus;
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
    return [
      ...acc,
      { id: `${item}-1`, type: item, status: "hidden" },
      { id: `${item}-2`, type: item, status: "hidden" },
    ];
  }, [] as Card[]);

  return shuffleArray(cards);
};

function App() {
  const [cards, setCards] = useState(generateInitialCards(itemTypes));
  const [isLoading, setIsLoading] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);

  const handleSelectCard = (selectedIndex: number) => {
    const selectedCard = cards[selectedIndex];

    // Do nothing if card is revealed
    if (selectedCard.status !== "hidden") {
      return;
    }

    const newCards: Card[] = cards.map((item, index) => {
      if (selectedIndex === index) {
        return { ...item, status: "selected" };
      }
      return item;
    });
    setCards(newCards);

    const selectedCards = newCards.filter((item) => item.status === "selected");
    const isSecondGuess = selectedCards.length === 2;
    const isMatched = selectedCards[0]?.type === selectedCards[1]?.type;

    if (isSecondGuess) {
      setIsLoading(true);
      setTimeout(() => {
        if (isMatched) {
          const completedCards = resolveSelectedCards(newCards, "completed");
          setCards(completedCards);
          if (completedCards.every((item) => item.status === "completed")) {
            setIsGameEnded(true);
          }
        } else {
          const cleanedCards = resolveSelectedCards(newCards, "hidden");
          setCards(cleanedCards);
        }
        setIsLoading(false);
      }, 500);
    }
  };

  const resolveSelectedCards = (cards: Card[], status: CardStatus) => {
    const resolvedCards: Card[] = cards.map((item) => {
      if (item.status === "selected") {
        return { ...item, status };
      }
      return item;
    });
    return resolvedCards;
  };

  return (
    <div className="flex items-center flex-col p-8">
      <h1
        className={clsx(
          "text-4xl mb-4 text-white p-4 rounded-md",
          isGameEnded ? "bg-red-600" : "bg-blue-600"
        )}
      >
        {isGameEnded
          ? `Descubra o que o ${MARIO_ACTOR} esta pedindo para a ${PEACH_ACTOR}!`
          : "Descubra o que o Mario esta dizendo para a Peach!"}
      </h1>
      <div
        className={clsx(
          "w-[650px] flex gap-4 flex-wrap justify-center p-4 rounded-md",
          isGameEnded ? "bg-red-600" : "bg-blue-600"
        )}
      >
        {cards.map((item, index) => {
          if (item.status === "hidden") {
            return (
              <button
                key={index}
                onClick={() => handleSelectCard(index)}
                disabled={isLoading}
                className={clsx(
                  "select-none",
                  isLoading ? "cursor-normal" : "hover:opacity-85"
                )}
              >
                <img src="question-block.png" width={88} />
              </button>
            );
          }

          return (
            <div
              key={index}
              className="p-1 rounded-xl bg-neutral-200 select-none"
            >
              <img src={`${item.type}.png`} width={80} />
            </div>
          );
        })}
      </div>
      <div className="flex gap-[600px]">
        <div className="relative">
          <div className="w-72 bg-white absolute -left-32 -top-32 p-3 rounded-xl flex gap-4 flex-wrap border border-red-400">
            {isGameEnded ? (
              <div>
                <p className="leading-8 text-2xl">
                  Raiany, voce aceita se casar comigo?????{" "}
                </p>
                <span className="text-xs">(PS: aperta espaço)</span>
              </div>
            ) : (
              <>
                {itemTypes.map((item) => (
                  <span className="shrink-0">
                    <img src={`${item}.png`} width={30} />
                  </span>
                ))}
                . . .
              </>
            )}
          </div>
          <img src="mario.png" />
        </div>
        <div>
          <img src="peach.png" />
        </div>
      </div>
    </div>
  );
}

export default App;
