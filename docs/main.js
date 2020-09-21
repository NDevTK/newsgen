function getRandom(max) {
    return Math.floor((Math.random() * 10) % max)
}

async function THENEWS() {
    if(window.hasOwnProperty("bg") && !bg.paused) {
    clearInterval(TTSKeepAlive);
    bg.pause();
    delete TheNewsIntro;
    speechSynthesis.cancel();
    bg.currentTime = 0;
    thenews.innerText = "THE NEWS!";
    return
    }
    TTSKeepAlive = setInterval(_ => {
    speechSynthesis.pause();
    speechSynthesis.resume();
    }, 5000);
    if (!window.hasOwnProperty("bg")) bg = new Audio("https://news.ndev.tk/bg.mp3");
    voices = window.speechSynthesis.getVoices().filter(voice => {
	return voice.lang.startsWith("en-");
    });
    voice = voices[getRandom(voices.length)];
    bg.loop = true;
    bg.volume = 1;
    bg.play();
    thenews.innerText = "Stop Audio";
    TheNewsIntro = sleep(6000);
    await TheNewsIntro
    bg.volume = 0.3;
    reader();
}

async function reader() {
    if(bg.paused) return
    speechSynthesis.cancel();
    text = new SpeechSynthesisUtterance(content.innerText);
    text.voice = voice;
    text.onerror = () => reader();
    text.onend = () => reader();
    speechSynthesis.speak(text);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
