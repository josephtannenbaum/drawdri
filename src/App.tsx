import "./App.css";
// import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
// import { useCallback, useEffect, useState } from "react";
// import DDropdown from "./DDropdown";
// import Gallery, { PhotoProps } from "react-photo-gallery";
// import Thumbnail from "./Thumbnail";

// const Gallar = ({ items }: { items: PhotoProps[] }) => (
//   <Gallery photos={items} renderImage={(props) => <Thumbnail {...props} />} />
// );

// function StartScreen({
//   picSet,
//   interval,
//   onSetPicSet,
//   onSetInterval,
//   onStart,
// }: {
//   picSet: string;
//   interval: number;
//   onSetPicSet: (text: string) => void;
//   onSetInterval: (interval: number) => void;
//   onStart: () => void;
// }) {
//   const [saveData, setSaveData] = useState<SaveData | null>(null);
//   const [sets, setSets] = useState<PicSet[]>([]);
//   const [selectedSet, setSelectedSet] = useState<string | null>(null);
//   const [thumbnailUrls, setThumbnailUrls] = useState<{ src: string }[]>([]);

//   const [discardModal, setDiscardModal] = useState(false);
//   const toggleDiscardModal = () => setDiscardModal(!discardModal);

//   useEffect(() => {
//     let loadedData = load();
//     if (!loadedData) {
//       loadedData = SAMPLE_SAVE;
//     }
//     setSets(loadedData.sets);
//     onSetPicSet(loadedData.set);
//     onSetInterval(loadedData.interval);

//     setSaveData(loadedData);
//   }, [setSaveData, onSetPicSet, onSetInterval]);

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       setThumbnailUrls(
//         picSet
//           .split("\n")
//           .filter((url) => url.trim())
//           .map((url) => ({ src: url.trim(), width: 1, height: 1 }))
//       );
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [picSet]);

//   if (!saveData) {
//     return <></>;
//   }

//   const onChangeSelectedSet = (value: string) => {
//     setSelectedSet(value);
//   };

//   const onLoadClick = () => {
//     const textToLoad = sets.find((set) => set.name === selectedSet)?.urls;
//     if (textToLoad) onSetPicSet(textToLoad);
//   };

//   const onDiscardClick = () => {
//     toggleDiscardModal();
//     const newSets = saveData.sets.filter((set) => set.name !== selectedSet);
//     save({
//       ...saveData,
//       sets: newSets,
//     });
//     setSets(newSets);
//   };

//   const onSaveClick = () => {
//     const newName = prompt("enter name:");
//     if (!newName) {
//       return;
//     }
//     const newSets = [...sets, { name: newName, urls: picSet }];
//     save({ interval, set: picSet, sets: newSets });
//     setSets(newSets);
//     setSelectedSet(newName);
//   };

//   return (
//     <div className="d-flex flex-row justify-content-around">
//       <div className="mr-3 d-flex flex-column">
//         <DDropdown
//           options={sets.map(({ name }) => ({ value: name, label: name }))}
//           onChangeValue={onChangeSelectedSet}
//           value={selectedSet || "Select a preset"}
//           className="mb-2"
//         />
//         <Button onClick={() => onLoadClick()} className="mb-2">
//           load [{selectedSet}]
//         </Button>
//         <Button
//           onClick={() => toggleDiscardModal()}
//           className="mb-2"
//           disabled={!selectedSet}
//         >
//           discard [{selectedSet}]
//         </Button>
//         <Button onClick={() => onSaveClick()} className="mb-2">
//           save current
//         </Button>
//       </div>
//       <div className="w-50">
//         <h3 className="w-100 text-center">picture urls:</h3>
//         <textarea
//           className="w-100"
//           rows={15}
//           value={picSet}
//           wrap="off"
//           onChange={(event) => onSetPicSet(event.target.value)}
//         />
//         <div className="w-100">{thumbnailUrls?.length} urls</div>
//         <div className="mb-2 d-inline-flex w-100 justify-content-center align-items-center">
//           <span className="me-2">interval:</span>
//           <DDropdown
//             options={DURATION_OPTIONS}
//             onChangeValue={(value) => onSetInterval(value)}
//             value={interval}
//           />
//         </div>
//         <div className="text-center">
//           <Button onClick={() => onStart()}>start</Button>
//         </div>
//       </div>
//       <div>
//         <div>thumbnails</div>
//         {/* <div
//           className="d-flex flex-column overflow-scroll pb-5"
//           style={{ height: "100vh" }}
//         >
//           {thumbnailUrls?.map((url) => (
//             <img src={url} alt={url} style={{ maxWidth: "200px" }} />
//           ))}
//         </div> */}
//         <Gallar items={thumbnailUrls} />
//       </div>
//       <Modal isOpen={discardModal} toggle={toggleDiscardModal}>
//         <ModalBody>You want to delete {selectedSet}?</ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={onDiscardClick}>
//             Yes
//           </Button>{" "}
//           <Button color="secondary" onClick={toggleDiscardModal}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// }

// function Slideshow({
//   picSet,
//   onExit,
// }: {
//   picSet?: string;
//   onExit: () => void;
// }) {
//   if (!picSet) {
//     return <></>;
//   }
//   return (
//     <div>
//       <span>5:00</span>
//       <div>image</div>
//       <div>
//         <Button>prev</Button>
//         <Button>1/4</Button>
//         <Button>next</Button>
//       </div>
//       <Button onClick={() => onExit()}>back</Button>
//     </div>
//   );
// }

// enum MODE {
//   START,
//   SLIDESHOW,
// }

// function App() {
//   const [mode, setMode] = useState<MODE>(MODE.START);
//   const [picSet, setPicSet] = useState<string | undefined>(undefined);
//   const [interval, setTheInterval] = useState<number>(300);

//   const onSetInterval = useCallback(
//     (value: number) => setTheInterval(value),
//     []
//   );
//   const onSetPicSet = useCallback((text: string) => setPicSet(text), []);

//   return (
//     <div className="App p-3">
//       {mode === MODE.START && (
//         <StartScreen
//           interval={interval}
//           onSetInterval={onSetInterval}
//           picSet={picSet || ""}
//           onSetPicSet={onSetPicSet}
//           onStart={() => setMode(MODE.SLIDESHOW)}
//         />
//       )}
//       {mode === MODE.SLIDESHOW && (
//         <Slideshow picSet={picSet} onExit={() => setMode(MODE.START)} />
//       )}
//     </div>
//   );
// }

// export default App;
