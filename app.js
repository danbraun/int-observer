let thresholdArray = []

for (var i = 0; i <= 20; i++) {
  thresholdArray.push(i / 20)
}
console.log(thresholdArray)

let options = {
  root: null,
  rootMargin: "-30%",
  threshold: thresholdArray,
};

const targetImage = document.querySelector('.photo-4 img')

let callback = (entries, observer) => {
  let entry = entries[0]
  let ratio = entry.intersectionRatio
  let targetName = entry.target.classList
  document.querySelector('.root-bounds').innerHTML = targetName +'<br>'+ratio
  // targetImage.style.opacity = ratio;

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.setAttribute('aria-hidden', false)
      const id = entry.target.dataset.photo
      const display = document.querySelector(`#ssb${id}`)
      display.innerHTML = "show"
      display.classList.add('green')
    } else {
      entry.target.setAttribute('aria-hidden', true)
      const id = entry.target.dataset.photo
      const display = document.querySelector(`#ssb${id}`)
      display.innerHTML = "hide"
      display.classList.remove('green')
    }

  });
};

let observer = new IntersectionObserver(callback, options);
// observer.observe(document.querySelector('.photo-4'));

document.querySelectorAll('.photo').forEach( (el) => {
    observer.observe(el)
})