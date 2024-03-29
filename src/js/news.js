document.addEventListener('DOMContentLoaded', () => {
  ScrollTrigger.create({
    trigger: ".form-box",
    start: "-200px top",
    endTrigger: document.querySelector('aside'),
    end: "bottom bottom",
    pin: ".form-box"
  });
});