const words = JSON.parse(localStorage.words || '[]')
const wordsToTrain = []

numberInp.onkeydown = timesInp.onkeydown = function (event) {
    if (event.key == 'Enter') {
        startTraining(+numberInp.value, +timesInp.value)
    }
}
typeInp.onkeydown = function (event) {
    if (event.key == 'Enter') {
        checkBtn.click()
    }
}

updMaxWords()

startTraining(Math.floor(words.length/2))

function updMaxWords() {
    numberInp.max = words.length
    numberInp.value = Math.floor(words.length/2)
}

function stepTraining() {
    if (wordsToTrain.length > 0) {
        checkBtn.disabled = false
        trainWord(wordsToTrain.pop())
    } else {
        checkBtn.disabled = true
        
    }
}

function trainWord(word) {
    for (const listItem of wordList.children) {
        if (listItem.innerText == word.eng + " - " + word.ukr) {
            listItem.remove()
            break
        }
    }
    showInp.value = word.ukr
    typeInp.value = ''
    typeInp.focus()
    checkBtn.onclick = function() {
        if (typeInp.value == word.eng) {
            typeInp.style.border = '1px solid green'
            typeInp.style.color = 'green'
            setTimeout(function () {
                typeInp.style.border = typeInp.style.color = null
                stepTraining()
            }, 700)
            word.hit++
        } else {
            word.miss++
            typeInp.style.border = '1px solid red'
            typeInp.style.color = 'red'
            setTimeout(function () {
                typeInp.style.border = null
                typeInp.value = word.eng
                typeInp.style.color = null
                setTimeout(stepTraining, 3000)
            }, 700)           
        }
        addWordToList(word)
        localStorage.words = JSON.stringify(words)
    }
}

function startTraining(num, times=1) {
    const selectedWords = selectWordsToTrain(num)
    wordsToTrain.splice(0, wordsToTrain.length)
    for (let i = 0; i<times; i++) {
        wordsToTrain.push(...selectedWords)
    }
    shuffle(wordsToTrain)
    stepTraining()
    wordList.innerHTML = ''
}

function shuffle(arr) {
    return arr.sort(function () {return 0.5 - Math.random()})
}

function selectWordsToTrain(num) {
    const selectedWords = cloneWords()
    for (const word of selectedWords) {
        word.weight = word.hit - word.miss * 3
    }
    selectedWords.sort(function (a, b) {
        return a.weight - b.weight
    })
    selectedWords.length = num
    return selectedWords.map(function (selectedWord) {
        return words.find(function (word) {
            return word.eng == selectedWord.eng && word.ukr == selectedWord.ukr
        })
    })
    
}

function cloneWords() {
    const wordsClone = []
    for (const word of words) {
        wordsClone.push({...word})
    }
    return wordsClone
}
function addWordToList(word) {
    const listItem = document.createElement("li")
    listItem.innerText = word.eng + ' - ' + word.ukr
    wordList.prepend(listItem)
}