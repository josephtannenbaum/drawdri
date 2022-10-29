import { useState } from "react";

import "./App.css";
import { doConfetti } from "./confetti";

import DrillPage from "./DrillPage";
import SettingsPage from "./SettingsPage";

enum Mode {
  SETTINGS,
  DRILL,
}

function App() {
  const [mode, setMode] = useState<Mode>(Mode.SETTINGS);

  const onStop = (props?: { confetti: boolean }) => {
    if (props?.confetti) {
      doConfetti();
    }
    setMode(Mode.SETTINGS);
  };
  return (
    <div className="App p-3">
      {mode === Mode.SETTINGS && (
        <SettingsPage onStart={() => setMode(Mode.DRILL)} />
      )}
      {mode === Mode.DRILL && <DrillPage onStop={onStop} />}
    </div>
  );
}

export default App;
