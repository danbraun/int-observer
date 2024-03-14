console.log("started!");

let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
};

let callback = (entries, observer) => {
    entries.forEach((entry) => {
        let classes = entry.target.classList
        if (entry.isIntersecting) {
            entry.target.setAttribute('aria-hidden', false)
        } else {
            entry.target.setAttribute('aria-hidden', true)
        }
        console.log(entry.target, entry.target.getAttribute('aria-hidden'))
        // console.log(
      // Each entry describes an intersection change for one observed
      // target element:
      //   entry.boundingClientRect
      //   entry.intersectionRatio
      //   entry.intersectionRect
        // entry.isIntersecting,
      //   entry.rootBounds
        // entry.target
      //   entry.time
    //   )
    });
  };

let observer = new IntersectionObserver(callback, options);

document.querySelectorAll('.photo').forEach( (el) => {
    observer.observe(el)
})