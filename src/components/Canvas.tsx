import * as React from "react";
import { useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import {ArrowUturnLeftIcon, TrashIcon} from "@heroicons/react/20/solid";

type Props = {
    startingPaths: any;
    onScribble: (scribble: any) => void;
    scribbleExists: boolean;
    setScribbleExists: (exists: boolean) => void;
}
export default function Canvas({
  startingPaths,
  onScribble,
  scribbleExists,
  setScribbleExists,
}: Props) {
  const canvasRef = React.useRef(null);

  useEffect(() => {
    loadStartingPaths();
  }, []);

  async function loadStartingPaths() {
    // @ts-ignore
    //await canvasRef.current.loadPaths(startingPaths);
    //setScribbleExists(true);
    onChange();
  }

  const onChange = async () => {
    // @ts-ignore
    const paths = await canvasRef.current.exportPaths();
    localStorage.setItem("paths", JSON.stringify(paths, null, 2));

    if (!paths.length) return;

    setScribbleExists(true);

    // @ts-ignore
    const data = await canvasRef.current.exportImage("png");
    // @ts-ignore
    //const blob = await canvasRef.current.toBlob("image/png");
    onScribble(data);
  };

  const undo = () => {
    // @ts-ignore
    canvasRef.current.undo();
  };

  const reset = () => {
    setScribbleExists(false);
    // @ts-ignore
    canvasRef.current.resetCanvas();
  };

  return (
    <div className="relative">
      {scribbleExists || (
        <div>
          <div className="absolute grid w-full h-full p-3 place-items-center pointer-events-none text-xl">
            <span className="opacity-40">Draw something here.</span>
          </div>
        </div>
      )}

      <ReactSketchCanvas
        ref={canvasRef}
        className="w-full aspect-square border-none cursor-crosshair"
        strokeWidth={4}
        strokeColor="black"
        onChange={onChange}
        withTimestamp={true}
      />

      <div className="flex flex-row divide-gray-200 justify-around">
        <div className="bg-pink-500 w-full py-1 rounded-md mt-2 mr-1">
          <button className="flex-row flex w-full justify-center h-full items-center"  onClick={undo} disabled={!scribbleExists}>
            <ArrowUturnLeftIcon className="h-5 w-5 text-white" aria-hidden="true" />
            <span className="px-3 h-5 text-white">Undo</span>
          </button>
        </div>
        <div className="bg-pink-500 w-full py-1  rounded-md mt-2 ml-1">
          <button className="flex-row flex w-full justify-center h-full items-center"  onClick={reset} disabled={!scribbleExists}>
            <TrashIcon className="h-5 w-5 text-white" aria-hidden="true" />
            <span className="px-3 h-5 text-white">Clear</span>
          </button>
        </div>
      </div>
    </div>
  );
}
