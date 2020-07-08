const words = JSON.parse(localStorage.words || '[]')
// const words = JSON.parse(localStorage.words !== undefined ? localStorage.words : '[]')
const wordsToShow = words.slice((words.length > 20) ? words.length-21 : 0)
for (const word of wordsToShow) {
    addWordToList(word)
}

saveBtn.onclick = function () {
    const duplicates = isDuplicate(engInp.value, ukrInp.value)
    if (duplicates) {
        if (duplicates == 'eng') engInp.style.border = '1px solid red'
        else ukrInp.style.border = '1px solid red'
        setTimeout(function () {
            engInp.style.border = ukrInp.style.border = null
        }, 3000)
    } else {
        addWord(engInp.value, ukrInp.value)
        engInp.value = ''
        ukrInp.value = ''
        localStorage.words = JSON.stringify(words)
        addWordToList(words[words.length-1])  
    }
    engInp.focus()    
}

function addWord(eng, ukr) {
    const word = {
        eng: eng,
        ukr: ukr,
        date: new Date,
        hit: 0,
        miss: 0,
    }
    words.push(word)
}

function isDuplicate(eng, ukr) {
    for (let i = 0; i < words.length; i++) {
        if (words[i].eng === eng) return 'eng'
        if (words[i].ukr === ukr) return 'ukr'
    }
    return false
}

function addWordToList(word) {
    const listItem = document.createElement('li')
    listItem.innerText = word.eng + ' - ' + word.ukr
    wordList.prepend(listItem)
}