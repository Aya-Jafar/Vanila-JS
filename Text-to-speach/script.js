
const text = document.getElementById('input');
const btn = document.getElementById('speek-btn');
const selectOptions = document.getElementById('drop-down');

let synth = window.speechSynthesis;
voices = []

function getVoices() {
    voices = synth.getVoices();
    console.log(voices)
    voices.forEach((voice) => {   
        const option = document.createElement('option');
        option.value = `${voice.name}`;
        option.innerText =  `${voice.name} ${voice.lang}`;
        selectOptions.appendChild(option);
    });
}

synth.addEventListener('voiceschanged' , getVoices)


btn.addEventListener('click', () => {
    const selectedVoiceName = selectOptions.value;
    const utterance = new SpeechSynthesisUtterance(text.value);
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find((voice) => voice.name === selectedVoiceName);
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }
    speechSynthesis.speak(utterance);
});
