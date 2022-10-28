import { useEffect, useState } from "react";
import { TrashIcon, PlusIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { INTERVAL_OPTIONS, SAMPLE_SAVE } from "./constants";
import Select from "react-select";
import { Drill } from "./types";
import DiscardModal from "./DiscardModal";
import Buttony from "./Buttony";
import { useLocalStorage } from "./useLocalStorage";

function SettingsPage({ onStart }: { onStart: () => void }) {
  const [drills, setDrills] = useLocalStorage<Drill[]>(
    "drills",
    SAMPLE_SAVE["drills"]
  );
  const [selectedDrillName, setSelectedDrillName] = useLocalStorage<
    string | null
  >("selectedDrillName", SAMPLE_SAVE["selectedDrillName"]);
  const [selectedInterval, setSelectedInterval] = useLocalStorage<number>(
    "selectedInterval",
    SAMPLE_SAVE["selectedInterval"]
  );

  const selectedDrill = drills?.find(({ name }) => name === selectedDrillName);
  const selectedIntervalOption = INTERVAL_OPTIONS.find(
    ({ value }) => selectedInterval === value
  );

  const [urlInput, setUrlInput] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (urlInput) {
        setUrlInput("");
        setDrills(
          drills?.map((drill) => {
            if (drill.name === selectedDrillName) {
              drill.urls.push(urlInput);
            }
            return drill;
          })
        );
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  });

  const [selectInterval, setSelectInterval] = useState(false);
  const onSelectInterval = (value: number) => {
    setSelectInterval(false);
    setSelectedInterval(value);
  };

  const [discardModal, setDiscardModal] = useState(false);
  const toggleDiscardModal = () => setDiscardModal(!discardModal);
  const onDiscardClick = () => toggleDiscardModal();
  const onDiscardConfirm = () => {
    toggleDiscardModal();
    if (!drills) return;
    const drillIdx = drills.findIndex(({ name }) => name === selectedDrillName);
    const newDrills = drills.filter(({ name }) => name !== selectedDrillName);
    const nextIdx = Math.min(Math.max(drillIdx, 0), newDrills.length - 1);
    setSelectedDrillName(newDrills[nextIdx]?.name || null);
    setDrills(newDrills);
  };

  const onNewDrillClick = () => {
    if (!drills) return;
    const drillName = prompt("drill name:");
    if (!drillName) return;
    setDrills([...drills, { name: drillName, urls: [] }]);
    setSelectedDrillName(drillName);
  };

  const onChangeDrill = (value: string) => {
    setSelectedDrillName(value);
  };

  const onDeleteDrillImage = (url: string) => {
    setDrills(
      drills?.map((drill) => {
        if (drill.name === selectedDrillName) {
          const newUrls = [...drill.urls];
          newUrls.splice(
            drill.urls.findIndex((drillUrl) => drillUrl === url),
            1
          );
          drill.urls = newUrls;
        }
        return drill;
      })
    );
  };

  const drillSelectOptions = drills?.map(({ name }) => ({
    label: name,
    value: name,
  }));
  return (
    <div className="row">
      <div className="col-2 settingsPanel">
        <div className="d-flex flex-row align-items-center mb-2">
          <Select
            options={drillSelectOptions}
            value={
              drillSelectOptions?.find(
                ({ value }) => value === selectedDrillName
              ) || null
            }
            className="flex-grow-1 me-1"
            placeholder="Select a drill"
            onChange={(e) => (e?.value ? onChangeDrill(e?.value) : undefined)}
          />
          <TrashIcon
            className="icon text-secondary me-1"
            onClick={() => onDiscardClick()}
          />
          <PlusIcon
            className="icon text-secondary"
            onClick={() => onNewDrillClick()}
          />
        </div>
        <div
          style={{ height: "3em" }}
          className="mb-2 d-flex align-items-center"
        >
          {!selectInterval && (
            <div className="fs-3">
              <Buttony
                onClick={() => (selectedDrill?.urls.length ? onStart() : null)}
              >
                start
              </Buttony>
              <span
                className="cursor-pointer text-decoration-underline"
                onClick={() => setSelectInterval(true)}
              >
                {selectedIntervalOption?.label}
              </span>
            </div>
          )}
          {selectInterval && (
            <div className="d-flex">
              {INTERVAL_OPTIONS.map(({ label, value }, i) => (
                <span
                  className="cursor-pointer text-decoration-underline me-1"
                  key={i}
                  onClick={() => onSelectInterval(value)}
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="mb-1">
          <input
            type="text"
            placeholder="paste URL"
            className="form-control w-100"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
        </div>
        <div className="text-secondary">
          {selectedDrill?.urls.length} <PhotoIcon className="icon " />
        </div>
      </div>
      <div className="position-absolute top-0 start-0 p-2 w-100 overflow-scroll">
        <div className="row align-content-start pb-2">
          <div className="col-lg-2 col-md-4 col-xs-6" />
          {selectedDrill
            ? [...selectedDrill.urls].map((image, i) => (
                <div key={i} className="col-lg-2 col-md-4 col-xs-6 mb-4">
                  <div
                    className="img-fluid img-thumbnail settingsThumbnail w-100"
                    style={{
                      backgroundImage: `url(${image})`,
                    }}
                  >
                    <TrashIcon
                      onClick={() => onDeleteDrillImage(image)}
                      className="position-absolute icon settingsThumbnailTrash"
                    />
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
      <DiscardModal
        isOpen={discardModal}
        toggleDiscardModal={toggleDiscardModal}
        onDiscardConfirm={onDiscardConfirm}
        selectedDrill={selectedDrillName || ""}
      />
    </div>
  );
}

export default SettingsPage;
