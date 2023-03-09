import * as React from "react";
import { useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

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
    await canvasRef.current.loadPaths(startingPaths);
    setScribbleExists(true);
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
    <div className="relative border-8 border-green-700 rounded-2xl">
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

      {scribbleExists && (
        <div className="animate-in fade-in duration-700 text-left">
          <button className="lil-button" onClick={undo}>
            Undo
          </button>
          <button className="lil-button" onClick={reset}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
