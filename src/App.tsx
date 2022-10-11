import "./App.css";
import { Button } from "reactstrap";
import { useEffect, useState } from "react";
import DDropdown from "./DDropdown";

const SAMPLE_SAVE: SaveData = {
  interval: 300,
  set: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Georges_Rochegrosse_-_Poster_for_the_pr%C3%A8miere_of_Claude_Debussy_and_Maurice_Maeterlinck%27s_Pell%C3%A9as_et_M%C3%A9lisande.jpg/1024px-Georges_Rochegrosse_-_Poster_for_the_pr%C3%A8miere_of_Claude_Debussy_and_Maurice_Maeterlinck%27s_Pell%C3%A9as_et_M%C3%A9lisande.jpg
https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Gibson%27s_Albatross_0A2A4153.jpg/1599px-Gibson%27s_Albatross_0A2A4153.jpg
https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/White-faced_Storm-petrel_0A2A9606.jpg/1600px-White-faced_Storm-petrel_0A2A9606.jpg
https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Sonoma_chipmunk_at_Samuel_P._Taylor_State_Park.jpg/1600px-Sonoma_chipmunk_at_Samuel_P._Taylor_State_Park.jpg`,
  sets: [],
};

const DURATION_OPTIONS = [
  { value: 30, label: "30s" },
  { value: 60, label: "1m" },
  { value: 2 * 60, label: "2m" },
  { value: 3 * 60, label: "3m" },
  { value: 300, label: "5m" },
  { value: 10 * 60, label: "10m" },
  { value: 3, label: "3s(!?)" },
];

interface PicSet {
  name: string;
  urls: string;
}
interface SaveData {
  interval: number;
  set: string;
  sets: PicSet[];
}

function save(data: SaveData) {
  localStorage.setItem("save", JSON.stringify(data));
}

function load(): SaveData | null {
  return JSON.parse(localStorage.getItem("save") || "null") as SaveData;
}

function StartScreen({
  picSet,
  interval,
  onSetPicSet,
  onSetInterval,
  onStart,
}: {
  picSet: string;
  interval: number;
  onSetPicSet: (text: string) => void;
  onSetInterval: (interval: number) => void;
  onStart: () => void;
}) {
  const [saveData, setSaveData] = useState<SaveData | null>(null);
  const [sets, setSets] = useState<PicSet[]>([]);
  const [selectedSet, setSelectedSet] = useState<string | null>(null);

  useEffect(() => {
    let loadedData = load();
    if (!loadedData) {
      loadedData = SAMPLE_SAVE;
    }
    setSets(loadedData.sets);
    onSetPicSet(loadedData.set);
    onSetInterval(loadedData.interval);

    setSaveData(loadedData);
  }, [setSaveData, onSetPicSet, onSetInterval]);

  if (!saveData) {
    return <></>;
  }

  const onChangeSelectedSet = (value: string) => {
    setSelectedSet(value);
  };

  const onLoadClick = () => {
    const textToLoad = sets.find((set) => set.name === selectedSet)?.urls;
    if (textToLoad) onSetPicSet(textToLoad);
  };

  const onDiscardClick = () => {
    console.log(`[87] saveData:`, JSON.stringify(saveData));
    const newSets = saveData.sets.filter((set) => set.name !== selectedSet);
    save({
      ...saveData,
      sets: newSets,
    });
    setSets(newSets);
  };

  const onSaveClick = () => {
    const newName = prompt("enter name:");
    if (!newName) {
      return;
    }
    const newSets = [...sets, { name: newName, urls: picSet }];
    save({ interval, set: picSet, sets: newSets });
    setSets(newSets);
  };

  return (
    <div className="d-flex flex-row justify-content-around">
      <div className="mr-3 d-flex flex-column">
        <DDropdown
          options={sets.map(({ name }) => ({ value: name, label: name }))}
          onChangeValue={onChangeSelectedSet}
          value={selectedSet || "Select a preset"}
          className="mb-2"
        />
        <Button onClick={() => onLoadClick()} className="mb-2">
          load {selectedSet}
        </Button>
        <Button
          onClick={() => onDiscardClick()}
          className="mb-2"
          disabled={!selectedSet}
        >
          discard {selectedSet}
        </Button>
        <Button onClick={() => onSaveClick()} className="mb-2">
          save current
        </Button>
      </div>
      <div className="w-50">
        <h3 className="w-100 text-center">picture urls:</h3>
        <textarea
          className="w-100"
          rows={15}
          value={picSet}
          wrap="off"
          onChange={(event) => onSetPicSet(event.target.value)}
        />
        <div className="w-100">{picSet.split("\n").length} urls</div>
        <div className="mb-2 d-inline-flex w-100 justify-content-center align-items-center">
          <span className="me-2">interval:</span>
          <DDropdown
            options={DURATION_OPTIONS}
            onChangeValue={(value) => onSetInterval(value)}
            value={interval}
          />
        </div>
        <div className="text-center">
          <Button onClick={() => onStart()}>start</Button>
        </div>
      </div>
      <div>Thumbnails</div>
    </div>
  );
}

function Slideshow({
  picSet,
  onExit,
}: {
  picSet?: string;
  onExit: () => void;
}) {
  if (!picSet) {
    return <></>;
  }
  return (
    <div>
      <span>5:00</span>
      <div>image</div>
      <div>
        <Button>prev</Button>
        <Button>1/4</Button>
        <Button>next</Button>
      </div>
      <Button onClick={() => onExit()}>back</Button>
    </div>
  );
}

enum MODE {
  START,
  SLIDESHOW,
}

function App() {
  const [mode, setMode] = useState<MODE>(MODE.START);
  const [picSet, setPicSet] = useState<string | undefined>(undefined);
  const [interval, setTheInterval] = useState<number>(300);

  return (
    <div className="App p-3">
      {mode === MODE.START && (
        <StartScreen
          interval={interval}
          onSetInterval={(value) => setTheInterval(value)}
          picSet={picSet || ""}
          onSetPicSet={(text) => setPicSet(text)}
          onStart={() => setMode(MODE.SLIDESHOW)}
        />
      )}
      {mode === MODE.SLIDESHOW && (
        <Slideshow picSet={picSet} onExit={() => setMode(MODE.START)} />
      )}
    </div>
  );
}

export default App;
