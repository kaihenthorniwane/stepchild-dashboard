let connectButton;
let screenCanvas;
let serial;
let connected = false;
let screen;
let border = 60;

function setup() {
  connectButton = createButton("Connect to Stepchild");
  connectButton.mousePressed(connect);
  screen = new OLED;
  screenCanvas = createCanvas(border*2+128*windowScale,border*2+64*windowScale);
  serial = createSerial();
  serial.bufferSize(2048);
  checkBuffer();
}

function draw() {
  // screen.getPixelsFromSerial();
  screen.render();
}


function connect(){
  if (!serial.opened()) {
    serial.open(921600);
    //updating vars
    connected = true;
    connectButton.mousePressed(disconnect);
    connectButton.html("Disconnect");
    serial.clear();
  }
} 

function disconnect(){
  serial.close();
  connectButton.mousePressed(connect);
  connectButton.html("Connect to Stepchild");
}


let windowScale = 4;
let color0 = 0;
let color1 = 255;

class OLED{
  constructor(){
    this.rows = 64;
    this.columns = 128;
    this.currentPixels = [];
    this.newUpdate = false;
  }
  //draws the current pixels to the canvas
  render(){
    if(!this.newUpdate)
      return;
    background(0);
    noStroke();
    //go thru each byte in the buffer
    for(let px = 0; px<1024; px++){
      //and then thru each bit in the byte
      for(let bit = 0; bit<8; bit++){
        //get the bit in the "bit"th place
        let c = (this.currentPixels[px]>>bit)&1;
        //set fill color to black or white
        fill(c?color1:color0);
        //fancy coordinate-getting (weird because the screen is actually upside-down)
        //these trunc calls are necessary so little float errors don't skew the image (idk how to force javascript to do integer math)
        let y = (63 - (Math.trunc(px/128)*8+bit));
        let x = Math.trunc(127 - (px%128));
        push();
        translate(border+x*windowScale,border+y*windowScale);
        rect(0,0,windowScale);
        pop();
      }
    }
    this.newUpdate = false;
  }
  getPixelsFromSerial(){
    if(!serial.opened())
      return;
    //return if there aren't enough bytes
    if(serial.availableBytes()==1024){
      this.currentPixels = serial.readBytes();
      this.newUpdate = true;
      return;
    }
    else if(serial.availableBytes()>1024){
      serial.clear();
    }
  }
}

function checkBuffer(){
  screen.getPixelsFromSerial();
  setTimeout(checkBuffer,1);
}
