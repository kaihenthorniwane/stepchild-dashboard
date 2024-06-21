
// Midi writer library
import MidiWriter from 'midi-writer-js';

export function convertStepchildTimestepsToMIDITicks(timesteps){
    return timesteps * 128/24;
}

export function writeMIDIFileFromSequenceObject(seqObj){
    const newSeq = new MidiWriter.Track();
    for(let track of seqObj.tracks){
        for(let note of track.notes){
            const newNote = new MidiWriter.NoteEvent({
                pitch: track.pitch,
                //duration needs to be converted? for some reason
                //midi-writer-js uses 128t = 1/4 note instead of 24t = 1/4 note
                duration: convertStepchildTimestepsToMIDITicks(note.end-note.start),
                channel: track.channel,
                velocity: note.velocity,
                tick: convertStepchildTimestepsToMIDITicks(note.start)
            });
            newSeq.addEvent(newNote);
        }
    }
    // Generate a data URI
    const write = new MidiWriter.Writer(newSeq);
    console.log(write.dataUri());
}

export function convertFileToSequenceObject(file){
    if(!file.data){
        throw("Error! File doesn't contain a 'data' member variable.");
    }
    //codes that correspond to the file header
    const id = {
        BLANK               : 0,
        SEQ_DATA            : 1,
        TRACK_AND_NOTE_DATA : 2,
        AUTOTRACK_DATA      : 3,
        LOOP_DATA           : 4,
        CLOCK_DATA          : 5,
        MIDI_PORT_DATA      : 6,
        PC_DATA             : 7,
    };

    //object to hold the seq data "json" style
    let sequenceObject = {
        start:0,
        end:0,
        tracks: []//tracks also holds note data
    };

    //convert file data to a uint8 array
    const data = new Uint8Array(file.data);
    //grab the number of header bytes
    const headerByteSize = data[0];
    //grab the file header, iterate over each entry in the header
    const header = new Uint8Array(file.data.slice(0,headerByteSize));
    let filePosition = headerByteSize+1;//start right after the file header
    for(const section of header){
        switch(section){
            case id.BLANK:
                break;
            case id.SEQ_DATA:
                const seqData = data.slice(filePosition,filePosition+4);
                sequenceObject.start = (seqData[0]<<8) | seqData[1];
                filePosition+=4;
                break;
            case id.TRACK_AND_NOTE_DATA:
                const trackCount = data[filePosition];
                filePosition++;
                let noteCount = [];
                for(let i = 0; i<trackCount; i++){
                    const trackData = data.slice(filePosition, filePosition+6);
                    filePosition+=6;
                    noteCount.push(trackData[0]<<8|trackData[1]);
                    //create a new track
                    let newTrack = {
                        pitch: trackData[2],
                        channel: trackData[3],
                        muteGroup: trackData[4],
                        flags: trackData[5],
                        notes:[]
                    };
                    //add the track to the sequence 
                    sequenceObject.tracks.push(newTrack);
                }
                for(let i = 0; i<trackCount; i++){
                    for(let j = 0; j<noteCount[i]; j++){
                        //grab note data
                        const noteData = data.slice(filePosition,filePosition+7);
                        filePosition+=7;
                        let newNote = {
                            start: noteData[0]<<8|noteData[1],
                            end: noteData[2]<<8|noteData[3],
                            velocity: noteData[4],
                            chance: noteData[5],
                            flags: noteData[6]
                        }
                        //store the note on the corresponding track
                        sequenceObject.tracks[i].notes.push(newNote);
                    }
                }
                break;
            case id.AUTOTRACK_DATA:
                break;
            case id.LOOP_DATA:
                break;
            case id.CLOCK_DATA:
                break;
            case id.MIDI_PORT_DATA:
                break;
            case id.PC_DATA:
                break;
        }
    }
    console.log(sequenceObject);
}