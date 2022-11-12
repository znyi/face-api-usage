import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import * as faceApi from "face-api.js"

function App(){
    let video = null

    const onPlay = async() => {
        //console.log(video instanceof HTMLVideoElement)
        if (video.paused || video.ended || !faceApi.nets.tinyFaceDetector.params) {
            setTimeout(() => onPlay());
            return;
        }
        
        const options = new faceApi.TinyFaceDetectorOptions();
        const results = await faceApi.detectAllFaces(video, options)
        if(results){
            console.log(`Number of face detected = ${results.length}`)
        }

        setTimeout(() => onPlay(), 1000);
    }
    
    const run = async() => {
        console.log("component is done!")
        const constraints = {
            video : true, 
            audio : false
        }
        try {
            await faceApi.nets.tinyFaceDetector.load("/models/").then(console.log("loaded tiny face detector!"))
            video = document.getElementById("vid")
            let mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
            if(mediaStream !== null){
                video.srcObject = mediaStream
                console.log("stream is done!")
            }
        } catch(e) {
            console.log(e)
        }
    }
    const init = () => {
        run()
    }

    useEffect(init, [])

    return (
    <div>
    <video id="vid" autoPlay onPlay={onPlay}></video>
    </div>)
}

export default App