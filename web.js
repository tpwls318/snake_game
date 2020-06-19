const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let padding;
let state = initialState();
let last_score;
let apple = document.getElementById("apple");
apple.style.visibility = 'hidden';
const x = p => p * canvas.width / state.col;
const y = p => p * canvas.height / state.row;
const getMessage = start => start ? 'press space to start' : `Your score :${last_score || state.snake.length}`
const showMessage = (pause, t0) => {
  document.getElementById('message').innerHTML = pause ? getMessage(!t0) : 'press space to pause';
}
const draw = () => {
  // init last score
  last_score = 0;

  // bgc
  ctx.fillStyle = '#94949c';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // snake
  ctx.fillStyle = 'rgb(0, 200, 50)';
  pd = state.col / 16;
  state.snake.forEach(b => ctx.fillRect(x(b.x) + pd, y(b.y) + pd, x(1) - pd * 2, y(1) - pd * 2));

  // apple
  var oc = document.createElement('canvas'), octx = oc.getContext('2d');
  octx.drawImage(apple, 0, 0, x(1) - 6, y(1) - 6);
  ctx.drawImage(oc, x(state.apple.x) + 3, y(state.apple.y) + 2);

  // crash
  for (let i = 1; i < state.snake.length; i++) {
    if(JSON.stringify(state.snake[0]) == JSON.stringify(state.snake[i])){
      ctx.fillStyle = 'rgb(255, 40, 40)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      window.setTimeout(() => {
        ctx.fillStyle = '#94949c';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }, 100);
      last_score = state.snake.length;
      state = initialState();
      break;
    }
  }
}
const step = t0 => t1 => {
  showMessage(state.pause, t0);
  if(state.pause || t1 - t0 < 100 - state.snake.length * 2) {
    window.requestAnimationFrame(step(t0));
  } else {
      state = next(state);
      draw();
      window.requestAnimationFrame(step(t1)); 
  }
}

window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'w': case 'ArrowUp':    state = enqueueMove(state, NORTH); break;
    case 'a': case 'ArrowLeft':  state = enqueueMove(state, WEST); break;
    case 's': case 'ArrowDown':  state = enqueueMove(state, SOUTH); break;
    case 'd': case 'ArrowRight': state = enqueueMove(state, EAST); break;
    case ' ': case 'Escape': state = togglePause(state); break;
  }
})

window.requestAnimationFrame(step(0));