let pressStartTime = 0;
let currentBitPos = 0;
let bitsSaved = [0, 0, 0, 0, 0, 0, 0, 0];

async function playSound(telegraphAudio) {
    telegraphAudio.currentTime = 0;
    try {
        await telegraphAudio.play();
    } catch (error) {
        console.error('Erreur lors de la lecture audio :', error);
    }
}

function stopSound(telegraphAudio) {
    telegraphAudio.pause();
}

function stopTimer(){
    const pressDuration = Date.now() - pressStartTime;
    return pressDuration;
}

function startTimer(){
    pressStartTime = Date.now();
}


async function changeToDown(telegraphButton, telegraphAudio) {
    startTimer();
    telegraphButton.style.backgroundImage = 'url(./media/telegraph_down.png)';
    await playSound(telegraphAudio);    
}

function sampleBit(timePressed){    
    let currentBit = null;
    console.log(timePressed);
    if (timePressed < 200) {
        currentBit = 0;
    } 
    else {
        currentBit = 1;
    }
    return currentBit;
}

function changeToUp(telegraphButton, telegraphAudio) {
    telegraphButton.style.backgroundImage = 'url(./media/telegraph_up.png)';
    stopSound(telegraphAudio);
    const timePressed = stopTimer();
    const newBit = sampleBit(timePressed);
    accumulateBits(newBit);

    
    
}

async function accumulateBits(newBit){
    
    bitsSaved[7 - currentBitPos] = newBit;     
    currentBitPos++;
    console.log(`Current bit(${currentBitPos}) : ${newBit}`);
    if (currentBitPos == 8) {
        currentBitPos = 0;
        console.log(bitsSaved);
        const asciiCode = calculateAscii(bitsSaved);
        console.log(`Current byte ${asciiCode}`);
        
        await sendCharacter(asciiCode);
    }
    
}

function calculateAscii(bitsArray){
    let characterAscii = 0; 
    
    for (let i = 0; i < 8; i++){
        characterAscii += bitsArray[i] * Math.pow(2, i);
    }
    return characterAscii;
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        playSound,
        stopSound,
        changeToDown,
        changeToUp
    };
}

// Ne pas modifier ces deux fonctions
function getBitsSaved(){
    return bitsSaved;
}

function clearBitsSaved(){
    bitsSaved = [0, 0, 0, 0, 0, 0, 0, 0];
}
