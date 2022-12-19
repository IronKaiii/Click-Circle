import React, { useState } from "react";

function App() {
  const [points, SetPoints] = useState([]);
  const [popped, SetPopped] = useState([]);

  function handlePlaceCircle(e) {
    const {clientX, clientY} = e;
    SetPoints([
      ...points,
      {
        x: clientX,
        y: clientY,
      },
    ]);
  }

  function handleUndo() {
    const newPoints = [...points];
    const newPopped = [...popped];
    const poppedPoint = newPoints.pop();
    if (!poppedPoint) return;
    newPopped.push(poppedPoint);
    SetPoints(newPoints);
    SetPopped(newPopped);
  }

  function handleRedo() {
    const newPoints = [...points];
    const newPopped = [...popped];
    const redoPoint = newPopped.pop();
    if (!redoPoint) return;
    newPoints.push(redoPoint);
    SetPoints(newPoints);
    SetPopped(newPopped);
  }

  return (
    <>
      <button onClick={handleUndo} disabled={points.length == 0}
        className="absolute m-5 px-5 py-2 text-lg font-bold bg-slate-200 disabled:bg-slate-700 rounded-md z-10">
        Undo
      </button>
      <button onClick={handleRedo} disabled={popped.length == 0}
        className="absolute m-5 mx-32 px-5 py-2 text-lg font-bold bg-slate-200 disabled:bg-slate-700 rounded-md z-10">
        Redo
      </button>
      <div className="h-screen bg-[#0f172a]" onClick={handlePlaceCircle}>
        {points.map((point, index) => (
          <div 
            key={index}
            className="absolute inline-block span h-5 w-5 rounded-full bg-white"
            style={{
              left: point.x - 10 + 'px',
              top: point.y - 10 + 'px',
            }}
          >
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
