
const img = document.getElementById("music-container");
const playBtn = document.getElementById('play')
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title')
const cover = document.getElementById('cover')


function playMusic() {
    // add the "rotate" class to trigger the rotation effect on the image element
    if (img.classList.contains("play")) {

        img.classList.remove("play");

        playBtn.innerHTML = `
            <i class="fa fa-play fa-2x"></i>
        `
        // playBtn.style.height = "10px";
        audio.pause();
    }
    else {
        img.classList.add("play");
        // audio.currentTime = 94.62626;

        playBtn.innerHTML = `
            <i class="fa fa-stop fa-2x"></i>
        `
        audio.play();
    }
}


playBtn.addEventListener('click', playMusic);


const songs = ['hey', 'summer', 'ukulele']
var index = 0

loadMusic(songs[index])

function loadMusic(song) {
    title.innerText = song;
    audio.src = `${song}.mp3`
    cover.src = `${song}.jpg`



}

next.addEventListener('click', () => {
    // if it's the last song , return to the beginning
    if (index === 2) {
        index = 0
    }
    // else , move forward to the next song
    else if (index >= 0) {
        index += 1
    }
    loadMusic(songs[index])
    playMusic();

});

prev.addEventListener('click', () => {
    if (index === 0) {
        index = 2
    }
    else if (index > 0) {
        index -= 1
    }
    loadMusic(songs[index])
    playMusic();
});


function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`
    progress.style.backgroundColor = 'blue';

}


function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    if (!isFinite(duration)) return; // Add this check 

    audio.currentTime = (clickX / width) * duration;

    console.log(width, clickX, duration);

    console.log(audio.currentTime)
    console.log((clickX / width) * duration)
}



audio.addEventListener('timeupdate', updateProgress)


audio.addEventListener('loadedmetadata', function () {
    // This event is triggered when the metadata has been loaded (including duration).
    console.log('Metadata loaded:', audio.duration);
});

audio.addEventListener('loadeddata', function () {
    // This event is triggered when the whole audio file has been loaded (including audio data).
    console.log('Audio loaded and ready to play!');
});

progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;

    const duration = audio.duration;
    let seekTime = (clickX / width) * duration;
    seekTime = parseFloat(seekTime.toFixed(6));
    // console.log(typeof (seekTime))

    audio.currentTime = seekTime;
    console.log(seekTime, audio.currentTime);

});
