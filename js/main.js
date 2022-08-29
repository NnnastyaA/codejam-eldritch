import ancientsData from '../data/ancients.js';
import blueCards from '../data/mythicCards/blue/index.js';
import brownCards from '../data/mythicCards/brown/index.js';
import greenCards from '../data/mythicCards/green/index.js';

const ancients = document.querySelectorAll('.ancients');
const difficultyLevels = document.querySelectorAll('.difficulty');
const shuffleDeckBtn = document.querySelector('.shuffle-deck');
const mythicCardBg = document.querySelector('.mythic-card-background');

let selectedAncient;
let selectedDifficulty;
let firstLevelCards = [];
let secondLevelCards = [];
let thirdLevelCards = [];

ancients.forEach(x => x.addEventListener('click', selectAncient));
difficultyLevels.forEach(x => x.addEventListener('click', selectDifficulty));
shuffleDeckBtn.addEventListener('click', shuffleDeck);
mythicCardBg.addEventListener('click', moveNext);

function moveNext() {
    let element;

    if (firstLevelCards.length !== 0) {
        element = firstLevelCards.shift();

        switch (element.color) {
            case 'green':
                document.querySelectorAll('.dot.green')[0].innerHTML = document.querySelectorAll('.dot.green')[0].innerHTML - 1;
                break;
            case 'brown':
                document.querySelectorAll('.dot.brown')[0].innerHTML = document.querySelectorAll('.dot.brown')[0].innerHTML - 1;
                break;
            case 'blue':
                document.querySelectorAll('.dot.blue')[0].innerHTML = document.querySelectorAll('.dot.blue')[0].innerHTML - 1;
                break;
        }
    }
    else if (secondLevelCards.length !== 0) {
        element = secondLevelCards.shift();

        switch (element.color) {
            case 'green':
                document.querySelectorAll('.dot.green')[1].innerHTML = document.querySelectorAll('.dot.green')[1].innerHTML - 1;
                break;
            case 'brown':
                document.querySelectorAll('.dot.brown')[1].innerHTML = document.querySelectorAll('.dot.brown')[1].innerHTML - 1;
                break;
            case 'blue':
                document.querySelectorAll('.dot.blue')[1].innerHTML = document.querySelectorAll('.dot.blue')[1].innerHTML - 1;
                break;
        }
    }
    else if (thirdLevelCards.length !== 0) {
        element = thirdLevelCards.shift();

        switch (element.color) {
            case 'green':
                document.querySelectorAll('.dot.green')[2].innerHTML = document.querySelectorAll('.dot.green')[2].innerHTML - 1;
                break;
            case 'brown':
                document.querySelectorAll('.dot.brown')[2].innerHTML = document.querySelectorAll('.dot.brown')[2].innerHTML - 1;
                break;
            case 'blue':
                document.querySelectorAll('.dot.blue')[2].innerHTML = document.querySelectorAll('.dot.blue')[2].innerHTML - 1;
                break;
        }

        if (thirdLevelCards.length === 0) {
            mythicCardBg.style.display = 'none';
        }
    }

    let img = document.createElement('img');
    img.src = `./assets/MythicCards/${element.color}/${element.id}.png`;
    img.alt = element.id;
    img.id = element.id;
    img.className = 'current-card-image';

    document.querySelector('.current-card').innerHTML = '';
    document.querySelector('.current-card').append(img);
}

function renderDeck(ancientObject) {
    document.querySelectorAll('.dot.green')[0].innerHTML = ancientObject.firstStage.greenCards;
    document.querySelectorAll('.dot.brown')[0].innerHTML = ancientObject.firstStage.brownCards;
    document.querySelectorAll('.dot.blue')[0].innerHTML = ancientObject.firstStage.blueCards;

    document.querySelectorAll('.dot.green')[1].innerHTML = ancientObject.secondStage.greenCards;
    document.querySelectorAll('.dot.brown')[1].innerHTML = ancientObject.secondStage.brownCards;
    document.querySelectorAll('.dot.blue')[1].innerHTML = ancientObject.secondStage.blueCards;

    document.querySelectorAll('.dot.green')[2].innerHTML = ancientObject.thirdStage.greenCards;
    document.querySelectorAll('.dot.brown')[2].innerHTML = ancientObject.thirdStage.brownCards;
    document.querySelectorAll('.dot.blue')[2].innerHTML = ancientObject.thirdStage.blueCards;

    shuffleDeckBtn.style.display = 'none';
    document.querySelector('.deck-with-state').style.display = 'flex';
}

function selectAncient(event) {
    selectedAncient = event.target.id;
    console.log(selectedAncient);
}

function selectDifficulty(event) {
    selectedDifficulty = event.target.id;
    console.log(selectedDifficulty);
}

function shuffleDeck() {
    const ancientObject = ancientsData.find(x => x.id === selectedAncient);
    const blueCardsCount = ancientObject.firstStage.blueCards + ancientObject.secondStage.blueCards + ancientObject.thirdStage.blueCards;
    const brownCardsCount = ancientObject.firstStage.brownCards + ancientObject.secondStage.brownCards + ancientObject.thirdStage.brownCards;
    const greenCardsCount = ancientObject.firstStage.greenCards + ancientObject.secondStage.greenCards + ancientObject.thirdStage.greenCards;
    
    let blueCardsDeck = shuffle(getCardsDeck(blueCards, blueCardsCount));
    let brownCardsDeck = shuffle(getCardsDeck(brownCards, brownCardsCount));
    let greenCardsDeck = shuffle(getCardsDeck(greenCards, greenCardsCount));

    // Fill first level
    for (let i = 0; i < ancientObject.firstStage.blueCards; i++) {
        let randomElement = getRandomElementFromArray(blueCardsDeck);
        blueCardsDeck = blueCardsDeck.filter(x => x.id !== randomElement.id);
        firstLevelCards.push(randomElement);
    }
    for (let i = 0; i < ancientObject.firstStage.brownCards; i++) {
        let randomElement = getRandomElementFromArray(brownCardsDeck);
        brownCardsDeck = brownCardsDeck.filter(x => x.id !== randomElement.id);
        firstLevelCards.push(randomElement);
    }
    for (let i = 0; i < ancientObject.firstStage.greenCards; i++) {
        let randomElement = getRandomElementFromArray(greenCardsDeck);
        greenCardsDeck = greenCardsDeck.filter(x => x.id !== randomElement.id);
        firstLevelCards.push(randomElement);
    }

    // Fill second level
    for (let i = 0; i < ancientObject.secondStage.blueCards; i++) {
        let randomElement = getRandomElementFromArray(blueCardsDeck);
        blueCardsDeck = blueCardsDeck.filter(x => x.id !== randomElement.id);
        secondLevelCards.push(randomElement);
    }
    for (let i = 0; i < ancientObject.secondStage.brownCards; i++) {
        let randomElement = getRandomElementFromArray(brownCardsDeck);
        brownCardsDeck = brownCardsDeck.filter(x => x.id !== randomElement.id);
        secondLevelCards.push(randomElement);
    }
    for (let i = 0; i < ancientObject.secondStage.greenCards; i++) {
        let randomElement = getRandomElementFromArray(greenCardsDeck);
        greenCardsDeck = greenCardsDeck.filter(x => x.id !== randomElement.id);
        secondLevelCards.push(randomElement);
    }

    // Fill third level
    for (let i = 0; i < ancientObject.thirdStage.blueCards; i++) {
        let randomElement = getRandomElementFromArray(blueCardsDeck);
        blueCardsDeck = blueCardsDeck.filter(x => x.id !== randomElement.id);
        thirdLevelCards.push(randomElement);
    }
    for (let i = 0; i < ancientObject.thirdStage.brownCards; i++) {
        let randomElement = getRandomElementFromArray(brownCardsDeck);
        brownCardsDeck = brownCardsDeck.filter(x => x.id !== randomElement.id);
        thirdLevelCards.push(randomElement);
    }
    for (let i = 0; i < ancientObject.thirdStage.greenCards; i++) {
        let randomElement = getRandomElementFromArray(greenCardsDeck);
        greenCardsDeck = greenCardsDeck.filter(x => x.id !== randomElement.id);
        thirdLevelCards.push(randomElement);
    }

    firstLevelCards = shuffle(firstLevelCards);
    secondLevelCards = shuffle(secondLevelCards);
    thirdLevelCards = shuffle(thirdLevelCards);

    renderDeck(ancientObject);

    console.log(firstLevelCards);
    console.log(secondLevelCards);
    console.log(thirdLevelCards);
}

function getCardsDeck(initialDeck, count) {
    let resultDeck = [];

    switch (selectedDifficulty) {
        case 'very-easy':
            let easyCards = initialDeck.filter(x => x.difficulty === 'easy');
            let normalCards = initialDeck.filter(x => x.difficulty === 'normal');

            if (count >= easyCards.length) {
                resultDeck = easyCards;

                while (resultDeck.length < count) {
                    let randomElement = getRandomElementFromArray(normalCards);
                    normalCards = normalCards.filter(x => x.id !== randomElement.id);
                    resultDeck.push(randomElement);
                }
            }
            else {
                while (resultDeck.length < count) {
                    let randomElement = getRandomElementFromArray(easyCards);
                    easyCards = easyCards.filter(x => x.id !== randomElement.id);
                    resultDeck.push(randomElement);
                }
            }

            break;
        case 'easy':
            let noHardCards = initialDeck.filter(x => x.difficulty !== 'hard');

            while (resultDeck.length < count) {
                let randomElement = getRandomElementFromArray(noHardCards);
                noHardCards = noHardCards.filter(x => x.id !== randomElement.id);
                resultDeck.push(randomElement);
            }

            break;
        case 'medium':
            while (resultDeck.length < count) {
                let randomElement = getRandomElementFromArray(initialDeck);
                initialDeck = initialDeck.filter(x => x.id !== randomElement.id);
                resultDeck.push(randomElement);
            }

            break;
        case 'hard':
            let noEasyCards = initialDeck.filter(x => x.difficulty !== 'easy');

            while (resultDeck.length < count) {
                let randomElement = getRandomElementFromArray(noEasyCards);
                noEasyCards = noEasyCards.filter(x => x.id !== randomElement.id);
                resultDeck.push(randomElement);
            }

            break;
        case 'very-hard':
            let hardCards = initialDeck.filter(x => x.difficulty === 'hard');
            let usualCards = initialDeck.filter(x => x.difficulty === 'normal');

            if (count >= hardCards.length) {
                resultDeck = hardCards;

                while (resultDeck.length < count) {
                    let randomElement = getRandomElementFromArray(usualCards);
                    usualCards = usualCards.filter(x => x.id !== randomElement.id);
                    resultDeck.push(randomElement);
                }
            }
            else {
                while (resultDeck.length < count) {
                    let randomElement = getRandomElementFromArray(hardCards);
                    hardCards = hardCards.filter(x => x.id !== randomElement.id);
                    resultDeck.push(randomElement);
                }
            }

            break;
    }

    return resultDeck;
}

function getRandomElementFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

console.log(ancientsData);
console.log(blueCards);
console.log(brownCards);
console.log(greenCards);