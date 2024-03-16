let thresholdArray = []
let numOfThings = document.querySelectorAll('.row-of-things > div').length;
let triggerCount = 0
let prevRatio = 0.0

for (var i = 0; i <= numOfThings; i++) {
  thresholdArray.push(i / numOfThings)
}
console.info(thresholdArray)

/*
TODO: make this dynamic using window resize - or avoid
effect on mobile?
*/
let vertRootMargin = (window.innerHeight > 1024) ? "-30%" : "0px";
let options = {
  root: null,
  rootMargin: `${vertRootMargin} 0px`,
  threshold: thresholdArray,
};

const targetImage = document.querySelector('.photo-4 img')

let callback = (entries, observer) => {
  let entry = entries[0]
  if (triggerCount > 5 || entry.intersectionRatio < prevRatio) return

  console.log('count:', triggerCount)
  let thing = document.querySelector(`.row-of-things .thing-${triggerCount}`)
  if (thing) thing.classList.add('active')

  document.querySelector('.root-bounds').innerHTML = 'COUNT:<br>'+triggerCount

  triggerCount++
  prevRatio = entry.intersectionRatio
};

let observer = new IntersectionObserver(callback, options);
observer.observe(document.querySelector('.photo-1'));

// document.querySelectorAll('.photo').forEach( (el) => {
//     observer.observe(el)
// })