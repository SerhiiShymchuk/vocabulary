const words = JSON.parse(localStorage.words || '[]')

updMaxWords()

function updMaxWords() {
    numberInp.max = numberInp.value = words.length
}

function startTraining(num, times) {
    const selectedWords = selectWordsToTrain(num)
    const wordsToTrain = []
    for (let i = 0; i<times; i++) {
        wordsToTrain.push(...selectedWords)
    }
    shuffle(wordsToTrain)
    return wordsToTrain
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