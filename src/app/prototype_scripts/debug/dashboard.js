class StepchildSerialInterface{
    constructor(){
        this.connected = false;
        this.port = createSerial();
        this.options = {
            baudRate: 9600,
            bufferSize:255
        };
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
            this.port.open(this.options.baudRate);
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
        this.sendCommand(cmd.SEND_FILE_COUNT);
        let numberOfFiles = await this.getFileCount();
        console.log("Grabbing "+numberOfFiles+" files from Stepchild...");
        this.sendCommand(cmd.DUMP_FILESYSTEM);
        for(let i = 0; i<numberOfFiles; i++){
            await this.downloadFile();
        }

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

const cmd =  {
    DUMP_FILESYSTEM         : 0,
    DUMP_SETTINGS           : 1,
    ENTER_BOOTSEL           : 2,
    ENABLE_SCREENCAPTURE    : 3,
    DISABLE_SCREENCAPTURE   : 4,
    DOWNLOAD_FILE           : 5,
    SEND_NEXT_FILE_PLEASE   : 6,
    SEND_FIRMWARE_VERSION   : 7,
    RESET_SYSTEM            : 8,
    EXIT_INTERFACE          : 9,
    START_INTERFACE         :10,
    SEND_FILE_COUNT         :11
};

let port;
let dumpButton;
let connectButton;

function connect(){
    port.connect();
}

function dumpFiles(){
    port.downloadFilesystem();
}

function setup(){
    port = new StepchildSerialInterface();
    connectButton = createButton("connect");
    connectButton.mousePressed(connect);
    dumpButton = createButton("dump files");
    dumpButton.mousePressed(dumpFiles);
}
