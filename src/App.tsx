import { useState } from "react";

import "./App.css";

import DrillPage from "./DrillPage";
import SettingsPage from "./SettingsPage";

enum Mode {
  SETTINGS,
  DRILL,
}

function App() {
  const [mode, setMode] = useState<Mode>(Mode.SETTINGS);
  return (
    <div className="App p-3">
      {mode === Mode.SETTINGS && (
        <SettingsPage onStart={() => setMode(Mode.DRILL)} />
      )}
      {mode === Mode.DRILL && (
        <DrillPage onStop={() => setMode(Mode.SETTINGS)} />
      )}
    </div>
  );
}

export default App;
