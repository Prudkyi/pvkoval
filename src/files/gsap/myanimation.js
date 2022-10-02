console.log('go');

// GSAP Анімація

let timeLine = gsap.timeline();
/*
timeLine.from('.topImg__title', {opacity: 0, y: 50, duration: 0.7})
    .from('.topImg__desc', {opacity: 0, y: 50, duration: 0.7}, "-=0.7")
    .from('.topImg__content-button', {opacity: 0, duration: 0.7});
*/
timeLine.from('.item', {opacity: 0, y: 100, duration: 1});

ScrollTrigger.create({
    animation: timeLine,
    trigger: '#oneSection',
    start: 'top top',
    end: 'bottom',
    scrub: true,
    pin: true
});

