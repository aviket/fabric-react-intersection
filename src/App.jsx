import React, { useState, useEffect } from 'react'
import CustomDropdown from './components/CustomDropdown'
import Rectangle from './components/Rectangle';
import Circlex from './components/Circle';
import fText from './components/Text';
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import "./App.css";

function App() {
  const history = [];
  const { editor, onReady } = useFabricJSEditor();
  const [data, setData] = useState(undefined);
  const [lastpos, setlastpos] = useState([]);
  const [canvas, setCanvas] = useState('');


  const canvasSize = {
    height: window.innerHeight,
    width: window.innerWidth,
  };
  var elepos = [];
  useEffect(() => {
    console.log(lastpos)
    elepos = lastpos;
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.setHeight(canvasSize.height);

    editor.canvas.setBackgroundColor('pink');



    if (!editor.canvas.__eventListeners["mouse:wheel"]) {
      editor.canvas.on("mouse:wheel", function (opt) {
        var delta = opt.e.deltaY;
        var zoom = editor.canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        editor.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });
    }

    if (!editor.canvas.__eventListeners["mouse:down"]) {
      editor.canvas.on("mouse:down", function (opt) {
        var evt = opt.e;
        if (evt.ctrlKey === true) {
          this.isDragging = true;
          this.selection = false;
          this.lastPosX = evt.clientX;
          this.lastPosY = evt.clientY;
        }
      });
    }

    if (!editor.canvas.__eventListeners["mouse:move"]) {
      editor.canvas.on("mouse:move", function (opt) {
        if (this.isDragging) {
          var e = opt.e;
          var vpt = this.viewportTransform;
          vpt[4] += e.clientX - this.lastPosX;
          vpt[5] += e.clientY - this.lastPosY;
          this.requestRenderAll();
          this.lastPosX = e.clientX;
          this.lastPosY = e.clientY;
        }
      });
    }

    if (!editor.canvas.__eventListeners["mouse:up"]) {
      editor.canvas.on("mouse:up", function (opt) {
        // on mouse up we want to recalculate new interaction
        // for all objects, so we call setViewportTransform
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
        this.selection = true;
      });
    }

    editor.canvas.renderAll();
  }, [editor]);

  const lstpos = (arr) =>
  {
    //console.log(arr);
    setlastpos(arr);
  } 




  const testIntersects = (e, fabobj) => {
    let flg = 0;
    // console.log(e.transform.target.left);
    if (e.isClick) {

    }
    else {
      // console.log(lastpos);
      editor.canvas._objects.forEach(function (canObj) {
        if (canObj.intersectsWithObject(fabobj)) {
          if (canObj === fabobj) {
            flg = 0;
            //console.log("llll");
            //setlastpos([e.transform.target.left , e.transform.target.top])
            
            lstpos([fabobj.top , fabobj.left]);
          }
          else {
            flg = 1;
            console.log(elepos);
            fabobj.top = elepos[0];
            fabobj.left = elepos[1];
            // fabobj.top = lastpos[1];
            // fabobj.left = lastpos[0];
          }
        }
      });
      
      // object moving
      //check collision
      // if colliding , move to prev state
      // update state only of not colliding
    }
 

    // console.log(e.isClick)

    return flg;
  }


  const undo = () => {
    if (editor.canvas._objects.length > 0) {
      history.push(editor.canvas._objects.pop());
    }
    editor.canvas.renderAll();
  };
  const redo = () => {
    if (history.length > 0) {
      editor.canvas.add(history.pop());
    }
  };

  const onItemSelect = (event) => {
    setData(event.target.value);

    //console.log(event.target.value)
    switch (event.target.value) {
      case "Rectangle":
        const rect = Rectangle(100, 100);
        rect.on("mouseup", function (e) {
          testIntersects(e, rect);
        });
        rect.on("moving", function (e) {
          testIntersects(e, rect);
        });
        editor.canvas.add(rect);
        editor.canvas.renderAll();

        break;
      case "Circle":
        
        const circle = Circlex();
        editor.canvas.add(circle);
        editor.canvas.renderAll();
        // Code to be executed if expression matches value2
        break;
      // Add more cases as needed
      case "Text":
        const txt = fText("abcd");
        editor.canvas.add(txt);
        editor.canvas.renderAll();
      //

      default:
      // Code to be executed if none of the cases match
    }





    console.log(
      "User Selected Value - ",
      event.target.value
    );
  };

  const openModel = (showPopup) => {
    { showPopup && <Popup content="This is the content of the popup." onClose={() => setShowPopup(false)} /> }
  }
  const clearCanvas = () => {
    editor.canvas.clear();
  }


  return (
    <>
      <div style={{ display: "flex" }}>
        <CustomDropdown dropdownItems={["Rectangle", "Circle", "Text", "d", "e", "f", "g", "h", "i"]} onItemSelect={onItemSelect} />
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>
      <FabricJSCanvas onReady={onReady} />
    </>
  )
}

export default App
