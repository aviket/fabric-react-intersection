import React, { useEffect, useState } from "react";
import { fabric } from "fabric";




const Circlex = (radius=50) => {

    const circle = new fabric.Circle({
        radius: radius,
        fill: "red",
        left: 100,
        top: 100,
      });

    return circle;
    


}

export default Circlex;