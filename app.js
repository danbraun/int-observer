let thresholdArray = []
let numOfChars = 0;
let triggerCount = 1
let prevRatio = 0.0

const wrapAndCountCharacters = function () {
  const wordsContainerParagraph = document.querySelector('#words-to-reveal p');
  let characters = wordsContainerParagraph.textContent.split('');
  characters = characters.map((char) => `<span>${char}</span>`)
  wordsContainerParagraph.innerHTML = characters.join('')
  numOfChars = characters.length;
  createThresholds()
}

const createThresholds = function () {
  console.log('numOfChars:', numOfChars)
  for (var i = 0; i <= numOfChars; i++) {
    thresholdArray.push(i / numOfChars)
  }
}

const intObsCallback = function (entries, observer) {

  const entry = entries[0]

  if (!entry.isIntersecting) {
    triggerCount = 0
    completeActive(true)
    return
  }

  const ratio = entry.intersectionRatio

  if (ratio === 1) {
    triggerCount = numOfChars
    completeActive(false)
    return
  }

  if (triggerCount > numOfChars) triggerCount = numOfChars
  if (triggerCount <= 0) triggerCount = 1

  console.log('triggerCount before selector', triggerCount)
  let character = document.querySelector(`#words-to-reveal p span:nth-child(${triggerCount})`)

  document.querySelector('.root-bounds').innerHTML = `triggerCount:<br> ${triggerCount}<br>numOfChars:<br>${numOfChars}`

  if (ratio < prevRatio) {
    character.classList.remove('active')
    triggerCount--
  } else {
    character.classList.add('active')
    triggerCount++
  }

  prevRatio = ratio
};


const setupIntObserver = function () {
  /*
  TODO: make this dynamic using window resize - or avoid
  effect on mobile?
  */
  console.log('window.innerHeight', window.innerHeight)
  let vertRootMargin = (window.innerHeight > 1024) ? "-20%" : "0px";
  let options = {
    root: null,
    rootMargin: `${vertRootMargin} 0px`,
    threshold: thresholdArray,
  };

  let observer = new IntersectionObserver(intObsCallback, options);
  observer.observe(document.querySelector('.photo-1'));
}

const completeActive = function (deactivate) {
  if (deactivate) {
    const inactive = document.querySelectorAll('#words-to-reveal p span.active')
    if (inactive) inactive.forEach((span) => span.classList.remove('active'))
    return
  }
  const inactive = document.querySelectorAll('#words-to-reveal p span:not(.active)')
  inactive.forEach((span) => span.classList.add('active'))
}

window.addEventListener("DOMContentLoaded", (event) => {
  wrapAndCountCharacters()
  setupIntObserver()
})