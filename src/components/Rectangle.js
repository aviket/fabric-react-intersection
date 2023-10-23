import React, { useEffect, useState } from "react";
import { fabric } from "fabric";


const rect = new fabric.Rect({

    fill: 'yellow',
    selectable: true,
    hasControls: true,
    evented: true,
   
    

}



)



const Rectangle = (height = 100, width = 100) => {
    rect.width = width;
    rect.height = height;
    return rect;



}

export default Rectangle;