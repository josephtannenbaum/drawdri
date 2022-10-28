import { useCallback, useEffect, useState } from "react";
import Buttony from "./Buttony";
import { INTERVAL_OPTIONS, SAMPLE_SAVE } from "./constants";
import { load } from "./saving";
import { Drill } from "./types";
import { useCountdown } from "./useCountDown";

function DrillPage({ onStop }: { onStop: () => void }) {
  const [drills, setDrills] = useState<Drill[]>([]);
  const [selectedDrillName, setSelectedDrillName] = useState<
    string | undefined
  >();
  const [timerTotalMs, setTimerTotalMs] = useState(INTERVAL_OPTIONS[4].value);

  useEffect(() => {
    let loadedData = load();
    if (!loadedData) {
      loadedData = SAMPLE_SAVE;
    }
    setDrills(loadedData.drills);
    setSelectedDrillName(loadedData.selectedDrill);
    setTimerTotalMs(loadedData.selectedInterval);
  }, [setDrills, setSelectedDrillName, setTimerTotalMs]);

  const selectedDrill = drills.find(({ name }) => name === selectedDrillName);

  const [drillIdx, setDrillIdx] = useState(0);
  const { timeLeft, timeLeftMs, isOn, toggle, start, pause, reset } =
    useCountdown(timerTotalMs);

  useEffect(() => {
    if (timeLeftMs < 1) {
      const nextDrillIdx = drillIdx + 1;
      if (selectedDrill?.urls[nextDrillIdx]) {
        setDrillIdx(nextDrillIdx);
        reset();
      } else {
        pause();
      }
    }
  }, [drillIdx, pause, reset, selectedDrill?.urls, timeLeftMs, timerTotalMs]);

  useEffect(() => {
    start();
  }, [start]);

  const imageUrl = selectedDrill?.urls[drillIdx];

  const onPrev = () => {
    if (!selectedDrill?.urls[drillIdx - 1]) return;
    setDrillIdx(drillIdx - 1);
    reset();
  };
  const onNext = () => {
    if (!selectedDrill?.urls[drillIdx + 1]) return;
    setDrillIdx(drillIdx + 1);
    reset();
  };
  const onPlayPause = useCallback(() => {
    toggle(!isOn);
  }, [isOn, toggle]);

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <span className="position-absolute top-0 end-0 py-2 px-3 fs-4">
        {timeLeft.minutes}:{`${timeLeft.seconds}`.padStart(2, "0")}
      </span>
      <div className="mb-3" style={{ height: "85vh" }}>
        {imageUrl ? (
          <img className="h-100" alt={selectedDrill.name} src={imageUrl} />
        ) : null}
      </div>
      <div className="mb-1">
        <Buttony className="fs-4 pb-1" onClick={() => onPrev()}>
          prev
        </Buttony>
        <Buttony className="fs-4 pb-1" onClick={() => onPlayPause()}>
          {isOn ? "playing" : "paused"} {drillIdx + 1}/
          {selectedDrill?.urls.length}
        </Buttony>
        <Buttony className="fs-4 pb-1" onClick={() => onNext()}>
          next
        </Buttony>
      </div>
      <div>
        <Buttony className="fs-4" onClick={() => onStop()}>
          back
        </Buttony>
      </div>
    </div>
  );
}

export default DrillPage;
