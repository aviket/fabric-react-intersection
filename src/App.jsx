import React, { useState, useEffect } from 'react'
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import "./App.css";
import myGif from './assets/0001-1000.gif';

function App() {

  const { editor, onReady } = useFabricJSEditor();
  const [showImage, setShowImage] = useState(false);


  const canvasSize = {
    height: window.innerHeight,
    width: window.innerWidth,
  };

  useEffect(() => {

    if (!editor || !fabric) {
      return;
    }
    editor.canvas.setHeight(canvasSize.height);

    editor.canvas.setBackgroundColor('pink');







    if (!editor.canvas.__eventListeners["mouse:move"]) {
      editor.canvas.on("mouse:move", function (opt) {
        findIntersects(editor.canvas._objects)

      });
    }





    editor.canvas.renderAll();
  }, [editor]);

  const addRect = () => {
    editor.canvas.add(new fabric.Rect({
      left: 150,
      top: 150,
      fill: 'blue',
      stroke: 'red',
      strokeWidth: 1,
      width: 100,
      height:100
    }));

  }




  function findIntersectingObjects(objects) {
    const intersectingObjects = [];
    const seenObjects = new Set();

    for (const object of objects) {
      for (const otherObject of objects) {
        if (object !== otherObject && object.intersectsWithObject(otherObject)) {
          if (!seenObjects.has(object)) {
            intersectingObjects.push(object);
            seenObjects.add(object);
          }

          if (!seenObjects.has(otherObject)) {
            intersectingObjects.push(otherObject);
            seenObjects.add(otherObject);
          }
        }
      }
    }

    return intersectingObjects;
  }

  function findIntersects() {
    let objs = findIntersectingObjects(editor.canvas._objects);

    editor.canvas._objects.forEach(function (obj) {
      obj.opacity = 1;
    }

    )
    editor.canvas.renderAll();
    objs.forEach(function (obj) {
      obj.opacity = 0.4;
    }
    )

    editor.canvas.renderAll();
  }








  return (
    <>
    <div style={{ display: "flex" }}>
      <button onClick={addRect} >Add Rectangle</button>
      <button onClick={() => setShowImage(!showImage)}>Show/Hide Demo</button>
    </div>
    {showImage && <img src={myGif} alt='demo' />}
    <FabricJSCanvas onReady={onReady} />
  </>
  )
}

export default App
