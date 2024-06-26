/*

Contains code for working with serial communication

*/

import * as webserial from "./libraries/p5.webserial.js";

class StepchildSerialInterface{
    constructor(){
        this.connected = false;
        this.port = webserial.createSerial();
        this.options = {
            baudRate: 9600,
            bufferSize:255
        };

        //Commands
        this.DUMP_FILESYSTEM         = 0;
        this.DUMP_SETTINGS           = 1;
        this.ENTER_BOOTSEL           = 2;
        this.ENABLE_SCREENCAPTURE    = 3;
        this.DISABLE_SCREENCAPTURE   = 4;
        this.DOWNLOAD_FILE           = 5;
        this.SEND_NEXT_FILE_PLEASE   = 6;
        this.SEND_FIRMWARE_VERSION   = 7;
        this.RESET_SYSTEM            = 8;
        this.EXIT_INTERFACE          = 9;
        this.START_INTERFACE         = 10;
        this.SEND_FILE_COUNT         = 11;
    }

    logPortInfo(){
        if(this.port.opened()){
            console.log("----- Connected! ---------")
            console.log("baud: "+this.options.baudRate);
            let info = this.port.port.getInfo();
            console.log("Vendor ID:  "+info.usbVendorID);
            console.log("Product ID: "+info.usbProductID);
            console.log("--------------------------")
        }
        else{
            console.log("-- no ports connected --");
        }
    }
    async connect(){
        await this.port.open(this.options.baudRate);
        this.connected = true;
        this.logPortInfo();
    }
    disconnect(){
        if(this.port.opened()){
            this.port.close();
            this.connected = false;
        }
    }
    sendCommand(c){
        this.port.write(c);
    }
    getFileCount(){
        return new Promise((resolve,reject)=>{
            //wait for a byte
            setTimeout(()=>{
                let fileCount = this.port.readByte();
                if(fileCount != 0)
                    resolve(fileCount);
                else
                    reject("error: file count of 0");
            },200);
        });
    }
    async downloadFilesystem(){
        const files = [];
        this.sendCommand(this.SEND_FILE_COUNT);
        let numberOfFiles = await this.getFileCount();
        console.log("Grabbing "+numberOfFiles+" files from Stepchild...");
        this.sendCommand(this.DUMP_FILESYSTEM);
        for(let i = 0; i<numberOfFiles; i++){
            files.push(await this.downloadFile());
        }
        return files;
    }
    downloadFile(){
        return new Promise((resolve,reject) => {
            //wait for 100ms
            setTimeout(()=>{
                //read in the filename
                let filename = this.port.readUntil("\n");
                filename = filename.slice(0,-1);//remove \n
                //read the byte count
                let filesizeBuffer = this.port.readBytes(4);
                // crunch the 4-byte number into one val
                let fileSize = filesizeBuffer[0]<<24 | filesizeBuffer[1]<<16 | filesizeBuffer[2]<<8 | filesizeBuffer[3];
                let data = this.port.readBytes(fileSize);
                let stepchildFile = {
                    path: "/SAVES/"+filename,
                    name: filename,
                    fileSize: fileSize,
                    id:0,//unused
                    data: data
                };
                console.log(stepchildFile);
                if(fileSize)
                    resolve(stepchildFile);
                else
                    reject("error: file size of 0");
            },100);
        });
    }
}

export default StepchildSerialInterface;