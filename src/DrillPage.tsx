import { useCallback, useEffect, useMemo, useState } from "react";
import Buttony from "./Buttony";
import { SAMPLE_SAVE } from "./constants";
import shuffle from "./shuffle";
import { Drill } from "./types";
import { useCountdown } from "./useCountDown";
import { useLocalStorage } from "./useLocalStorage";

function DrillPage({ onStop }: { onStop: () => void }) {
  const [drills] = useLocalStorage<Drill[]>("drills", []);
  const [selectedDrillName] = useLocalStorage<string>("selectedDrillName", "");
  const [selectedInterval] = useLocalStorage<number>(
    "selectedInterval",
    SAMPLE_SAVE["selectedInterval"]
  );

  const selectedDrill = drills.find(({ name }) => name === selectedDrillName);
  const drillUrlList = useMemo(() => {
    return selectedDrill ? shuffle(selectedDrill.urls) : [];
  }, [selectedDrill]);

  const [drillIdx, setDrillIdx] = useState(0);
  const { timeLeft, timeLeftMs, isOn, toggle, start, pause, reset } =
    useCountdown(selectedInterval);

  useEffect(() => {
    if (timeLeftMs < 1) {
      const nextDrillIdx = drillIdx + 1;
      if (drillUrlList[nextDrillIdx]) {
        setDrillIdx(nextDrillIdx);
        reset();
      } else {
        pause();
      }
    }
  }, [drillIdx, pause, reset, drillUrlList, timeLeftMs]);

  useEffect(() => {
    start();
  }, [start]);

  const imageUrl = drillUrlList[drillIdx];

  const onPrev = () => {
    if (!drillUrlList[drillIdx - 1]) return;
    setDrillIdx(drillIdx - 1);
    reset();
  };
  const onNext = () => {
    if (!drillUrlList[drillIdx + 1]) return;
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
          <img className="h-100" alt={selectedDrill?.name} src={imageUrl} />
        ) : null}
      </div>
      <div className="mb-1">
        <Buttony className="fs-4 pb-1" onClick={() => onPrev()}>
          prev
        </Buttony>
        <Buttony className="fs-4 pb-1" onClick={() => onPlayPause()}>
          {isOn ? "playing" : "paused"} {drillIdx + 1}/{drillUrlList.length}
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
