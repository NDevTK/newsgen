"use strict";
function getRandom(max) {
    return Math.floor((Math.random() * 10) % max)
}

window.speechSynthesis.getVoices();

let TTSKeepAlive;
let SleepTimer;
let bg;

async function THENEWS() {
    if(bg && !bg.paused) {
    clearInterval(TTSKeepAlive);
    clearInterval(SleepTimer);
    bg.pause();
    speechSynthesis.cancel();
    bg.currentTime = 0;
    thenews.innerText = "THE NEWS!";
    return
    }
    TTSKeepAlive = setInterval(_ => {
    speechSynthesis.pause();
    speechSynthesis.resume();
    }, 5000);
    if (!bg) bg = new Audio("/bg.mp3");
    let voices = window.speechSynthesis.getVoices().filter(voice => {
	return voice.lang.startsWith("en-");
    });
    let voice = voices[getRandom(voices.length)];
    bg.loop = true;
    bg.volume = 1;
    bg.play();
    thenews.innerText = "Stop Audio";
    await sleep(6000);    
    bg.volume = 0.3;
    reader(voice);
}

async function reader(voice) {
    if (bg.paused) return
    let text = new SpeechSynthesisUtterance(content.innerText);
    text.voice = voice;
    text.onerror = () => reader();
    text.onend = () => reader();
    speechSynthesis.cancel();
    speechSynthesis.speak(text);
}

function sleep(ms) {
  return new Promise(resolve => {
	  SleepTimer = setTimeout(resolve, ms);
  });
}
