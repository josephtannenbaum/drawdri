import { useEffect, useState } from "react";
import { TrashIcon, PlusIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { INTERVAL_OPTIONS, SAMPLE_SAVE } from "./constants";
import Select from "react-select";
import { load } from "./saving";
import { Drill } from "./types";
import DiscardModal from "./DiscardModal";
// import { Button, Input } from "reactstrap";

function SettingsPage({ onStart }: { onStart: () => void }) {
  const [drills, setDrills] = useState<Drill[]>([]);
  const [selectedDrillName, setSelectedDrillName] = useState<
    string | undefined
  >();
  const [selectedInterval, setTimeInterval] = useState(
    INTERVAL_OPTIONS[4].value
  );
  const selectedDrill = drills.find(({ name }) => name === selectedDrillName);
  const selectedIntervalOption = INTERVAL_OPTIONS.find(
    ({ value }) => selectedInterval === value
  );

  const [urlInput, setUrlInput] = useState("");

  useEffect(() => {
    let loadedData = load();
    if (!loadedData) {
      loadedData = SAMPLE_SAVE;
    }
    setDrills(loadedData.drills);
    setSelectedDrillName(loadedData.selectedDrill);
    setTimeInterval(loadedData.selectedInterval);
  }, [setDrills, setSelectedDrillName, setTimeInterval]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (urlInput) {
        setUrlInput("");
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  });

  const [selectInterval, setSelectInterval] = useState(false);
  const onSelectInterval = (value: number) => {
    setSelectInterval(false);
    setTimeInterval(value);
  };

  const [discardModal, setDiscardModal] = useState(false);
  const toggleDiscardModal = () => setDiscardModal(!discardModal);
  const onDiscardClick = () => toggleDiscardModal();
  const onDiscardConfirm = () => {
    toggleDiscardModal();
  };

  const onChangeDrill = (value: string | undefined) => {};

  const onDeleteDrillImage = (url: string) => {};

  if (!selectedDrill) {
    return null;
  }
  const drillSelectOptions = drills.map(({ name }) => ({
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
              drillSelectOptions.find(
                ({ value }) => value === selectedDrillName
              ) || null
            }
            className="flex-grow-1 me-1"
            placeholder="Select a drill"
            onChange={(e) => onChangeDrill(e?.value)}
          />
          <TrashIcon
            className="icon text-secondary me-1"
            onClick={() => onDiscardClick()}
          />
          <PlusIcon className="icon text-secondary" />
        </div>
        <div
          style={{ height: "3em" }}
          className="mb-2 d-flex align-items-center"
        >
          {!selectInterval && (
            <div className="fs-3">
              <span className="border border-dark px-1 me-1 cursor-pointer">
                start
              </span>
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
          {[...selectedDrill.urls].map((image, i) => (
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
          ))}
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
