const letterDelayMs = 500;
const pathDelayMs = 100;
const durationMs = 800;

const letterOrder = ['E', 'Q', 'U', 'I', 'N', 'O', 'X'];
const svg = document.querySelector('svg');
const logo = document.querySelector('.logo');

const currentPath = window.location.pathname;
const allSections = [...document.querySelectorAll('section')];
const availableSections = allSections.map((section) => section.id);

letterOrder.forEach((letterId, letterIndex) => {
  const letterGroup = svg.querySelector(`#${letterId}`);
  if (!letterGroup) return;

  const paths = letterGroup.querySelectorAll('path');

  paths.forEach((path, pathIndex) => {
    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    const letterDelay = letterIndex * letterDelayMs;
    const pathDelay = pathIndex * pathDelayMs;
    const totalDelay = letterDelay + pathDelay;

    setTimeout(() => {
      path.style.transition = `stroke-dashoffset ${durationMs}ms ease-out`;
      path.style.strokeDashoffset = '0';
    }, totalDelay);
  });
});
