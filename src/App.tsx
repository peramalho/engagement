type Node = {
  name: string;
  status: "hidden" | "selected" | "completed";
};

const entities = [
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

function App() {
  return (
    <div className="flex justify-center">
      <div className="w-[800px]">
        {entities.map((item) => (
          <div key={item}>
            <img src={`/${item}.png`} width={60} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
