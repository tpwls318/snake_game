const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let state = initialState();

const x = p => p * canvas.width / state.col;
const y = p => p * canvas.height / state.row;
const draw = () => {
  // bgc
  ctx.fillStyle = '#94949c';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // snake
  ctx.fillStyle = 'rgb(0, 200, 50)';
  state.snake.forEach(b => ctx.fillRect(x(b.x), y(b.y), x(1), y(1)));

  // apple
  ctx.fillStyle = 'rgb(225, 50, 0)';
  ctx.fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1));

  // crash
  if(!state){
    ctx.fillStyle = 'rgb(255, 40, 40)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
const step = t0 => t1 => {
  if(t1 - t0 > 100){
    state = next(state);
    draw();
    window.requestAnimationFrame(step(t1));
  } else {
    window.requestAnimationFrame(step(t0));
  }
}

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'w': case 'ArrowUp':    state = state; break;
    case 'a': case 'ArrowLeft':  state = state; break;
    case 's': case 'ArrowDown':  state = state; break;
    case 'd': case 'ArrowRight': state = state; break;
  }
})

window.requestAnimationFrame(step(0));