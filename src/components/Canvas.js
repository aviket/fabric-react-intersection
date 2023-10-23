import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";



const Canvas = (size) => {

  
    return new fabric.Canvas('canvas', {
            height: size.height,
            width: size.width,
            backgroundColor: 'pink'
          })
}

export default Canvas;