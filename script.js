// Your code here.
const container = document.querySelector('.container') || document.querySelector('.items');
const cubes = document.querySelectorAll('.cube, .item');

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// Convert initial grid layout positions into explicit absolute coordinates inside the container
window.addEventListener('DOMContentLoaded', () => {
  if (!container) return;
  const containerRect = container.getBoundingClientRect();

  // Capture initial positions before switching to absolute
  const initialPositions = Array.from(cubes).map((cube) => {
    const rect = cube.getBoundingClientRect();
    return {
      left: rect.left - containerRect.left - container.clientLeft,
      top: rect.top - containerRect.top - container.clientTop,
    };
  });

  cubes.forEach((cube, index) => {
    cube.style.position = 'absolute';
    cube.style.left = `${initialPositions[index].left}px`;
    cube.style.top = `${initialPositions[index].top}px`;
    cube.style.margin = '0';
  });
});

cubes.forEach((cube) => {
  cube.addEventListener('mousedown', (e) => {
    activeCube = cube;
    activeCube.style.zIndex = '1000';

    const cubeRect = activeCube.getBoundingClientRect();
    offsetX = e.clientX - cubeRect.left;
    offsetY = e.clientY - cubeRect.top;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!activeCube || !container) return;

  const containerRect = container.getBoundingClientRect();

  // Calculate new position relative to container's inner area
  let newLeft = e.clientX - containerRect.left - container.clientLeft - offsetX;
  let newTop = e.clientY - containerRect.top - container.clientTop - offsetY;

  // Boundary constraints inside container
  const maxLeft = container.clientWidth - activeCube.offsetWidth;
  const maxTop = container.clientHeight - activeCube.offsetHeight;

  newLeft = Math.max(0, Math.min(newLeft, maxLeft));
  newTop = Math.max(0, Math.min(newTop, maxTop));

  activeCube.style.left = `${newLeft}px`;
  activeCube.style.top = `${newTop}px`;
});

document.addEventListener('mouseup', () => {
  if (activeCube) {
    activeCube.style.zIndex = '1';
    activeCube = null;
  }
});
