//Wrapper for p5
import p5 from "p5";
import "./libraries/p5.webserial.js";
import StepchildSerialInterface from "./interface.js"

export const sketch = (p) => {
  
  let stepchildSerialPort;

  p.setup = () => {
    stepchildSerialPort = new StepchildSerialInterface();
    console.log("hello from P5");
    p.noCanvas();
  };
  //draw is empty!
  p.draw = () => {
  };
};

export const createP5Instance = (containerElement) => {
  new p5(sketch, containerElement);
};