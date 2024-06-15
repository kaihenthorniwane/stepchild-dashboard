class SerialPort{
    constructor(){
        this.connected = false;
        this.port = createSerial();
        this.baudRate = 9600;
    }
    logPortInfo(){
        if(this.port.opened()){
            console.log("----- Connected! ---------")
            console.log("baud: "+this.baudRate);
            let info = this.port.port.getInfo();
            console.log("Vendor ID:  "+info.usbVendorID);
            console.log("Product ID: "+info.usbProductID);
            console.log("--------------------------")
        }
        else{
            console.log("-- no ports connected --");
        }
    }
    connect(){
        if(!this.port.opened()){
            this.port.open(this.baudRate);
            this.connected = true;
            this.logPortInfo();
        }
    }
    disconnect(){
        if(this.port.opened()){
            this.port.close();
            this.connected = false;
        }
    }
}

let port;
function setup(){
    port = new SerialPort();
}
