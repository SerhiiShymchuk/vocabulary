const words = JSON.parse(localStorage.words || '[]')
const wordsToTrain = []

updMaxWords()

startTraining(words.length/2)

function updMaxWords() {
    numberInp.max = numberInp.value = words.length
}

function stepTraining() {
    if (wordsToTrain.length > 0) {
        trainWord(wordsToTrain.pop())
    } else {
        checkBtn.disabled = true
        
    }
}

function trainWord(word) {
    showInp.value = word.ukr
    typeInp.value = ''
    typeInp.focus()
    checkBtn.onclick = function() {
        if (typeInp.value == word.eng) {
            typeInp.style.border = '1px solid green'
            setTimeout(function () {
                typeInp.style.border = null
                stepTraining()
            }, 700)
            word.hit++
        } else {
            word.miss++
            typeInp.style.border = '1px solid red'
            setTimeout(function () {
                typeInp.style.border = null
                typeInp.value = word.eng
                setTimeout(stepTraining, 3000)
            }, 700)           
        }
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