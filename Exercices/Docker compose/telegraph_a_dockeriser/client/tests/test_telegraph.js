function assert(condition, message) {
    const resultsDiv = document.getElementById('test-results');
    const result = document.createElement('div');
    if (condition) {
        result.style.color = 'green';
        result.textContent = `Test réussi: ${message}`;
    } else {
        result.style.color = 'red';
        result.textContent = `Test échoué: ${message}`;
    }
    resultsDiv.appendChild(result);
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function testTelegraphButtonSize() {
    const telegraphButton = document.getElementById('telegraphButton');
    
    // Obtient le style calculé de l'élément
    const computedStyle = window.getComputedStyle(telegraphButton);
    
    // Récupère les propriétés de taille
    const width = computedStyle.getPropertyValue('width');
    const height = computedStyle.getPropertyValue('height');
    
    // Convertit les valeurs en nombre entier (retire "px" à la fin)
    const parsedWidth = parseInt(width, 10);
    const parsedHeight = parseInt(height, 10);
    
    // Assert pour vérifier les dimensions
    assert(parsedWidth === 378 && parsedHeight === 248, `Dimensions du bouton : ${parsedWidth}px x ${parsedHeight}px`);
}


async function testShortPressBitCalculation() {
    const expectedBit = 0;
    startTimer();    
    await sleep(50);
    const pressedTime = stopTimer();
    const bit = sampleBit(pressedTime);
    
    assert(bit === expectedBit, `(Appui court) Test des fonctions startTimer(), stopTimer() et sampleBit(). (Paramètre : une durée de 50ms. Valeur attendue : ${expectedBit}, valeur obtenue : ${bit}`);

}

async function testLongPressBitCalculation() {
    const expectedBit = 1;
    startTimer();    
    await sleep(500);
    const pressedTime = stopTimer();
    const bit = sampleBit(pressedTime);
    
    assert(bit === expectedBit, `(Appui long) Test des fonctions startTimer(), stopTimer() et sampleBit(). (Paramètre : une durée de 500ms. Valeur attendue : ${expectedBit}, valeur obtenue : ${bit}`);

}

function testBitAccumulation() {
    let characterAscii = 0;
    const bits = [0, 0, 1, 1, 0, 1, 0, 1];   
    const expectedValue = 172;
    const calculatedValue = calculateAscii(bits);
    assert(calculatedValue === expectedValue, `Test de la fonction calculateAscii(). (Paramètre : [${bits}]. Valeur attendue : ${expectedValue}, valeur obtenue : ${calculatedValue})`);
}

document.addEventListener('DOMContentLoaded', async() => {    
    await testShortPressBitCalculation();
    await testLongPressBitCalculation();
    testBitAccumulation();
    testTelegraphButtonSize();
});
