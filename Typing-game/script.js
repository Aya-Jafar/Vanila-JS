
// Get the value of the diffeculity
const textInput = document.getElementById("input");
const wordToType = document.getElementById("word-to-type");
let time = document.getElementById('time');
let scoreElement = document.getElementById('score');

let score = 0
let totalTime = 10 // 10 seconds
time.innerText = `Time left: ${totalTime}s`
scoreElement.innerText = `score: ${score}`
let interval;
let selectedOption = document.getElementById("drop-down");



function getRandomWord() {
    const words = [
        'apple', 'banana', 'cherry', 'date',
        'forest', 'ocean', 'fish', 'red', 'Java'
    ];
    return words[Math.floor(Math.random() * words.length)];
}

// Start decrement time by 5 seconds if the choice was easy 
function decrementTime() {
    totalTime -= 5;
    time.innerText = `Time left: ${totalTime}s`
    if (totalTime <= 0) {
        clearInterval(interval); // stop the interval once totalTime is zero
        alert("Time out");
    }

}
wordToType.innerText = getRandomWord();

let optionValue = selectedOption.value;

selectedOption.addEventListener("change", () => {
    optionValue = selectedOption.value;
    totalTime = 10
    time.innerText = `Time left: ${totalTime}s`;
});


if (totalTime > 0) {
    time.innerText = `Time left: ${totalTime}s`;
    interval = setInterval(decrementTime, 5000); // runs every 5 seconds
}



textInput.addEventListener('keyup', (e) => {
    const typedWord = textInput.value

    if (e.key === 'Enter' && typedWord === wordToType.innerText) {
        updateScore();
        addBasedOnDifficulity();
        time.innerText = `Time left: ${totalTime}s`
        wordToType.innerText = getRandomWord();
        textInput.value = '';
    }

    else if (e.key === 'Enter' && typedWord !== wordToType.innerText){
        updateScore(false);
        totalTime = 10;
        time.innerText = `Time left: ${totalTime}s`
        wordToType.innerText = getRandomWord();
        textInput.value = '';
    }


    if (score === 6 || totalTime === 0) {
        alert(`Your final score is ${score}`)
        totalTime = 10;
        time.innerText = `Time left: ${totalTime}s`
    }
})



function updateScore(isCorrect=true) {
    if (isCorrect) {
        score += 1;
    }
    else{
        score -= 1;
    }
    scoreElement.innerText = `score: ${score}`;
}

function addBasedOnDifficulity() {
    if (optionValue === 'Easy') {
        totalTime += 5;
    } else if (optionValue === 'Medium') {
        totalTime += 3;
    } else if (optionValue === 'Hard') {
        totalTime += 1;
    }
}

