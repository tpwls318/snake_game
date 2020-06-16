const col_length = 32;
const row_length = 18;
const EAST = { x: 1, y: 0 };
const WEST = { x: -1, y: 0 };
const NORTH = { x: 0, y: 1 };
const SOUTH = { x: 0, y: -1 };

const randPos = ({ col, row }) => ({ x: Math.floor(Math.random() * col), y: Math.floor(Math.random() * row) });
const posEq = (p1, p2) => !(p1.x - p2.x || p1.y - p2.y);
const willEat = (nextHead, apple) => posEq(nextHead, apple);
const nextHead = ({ snake, dir }) => ({ x: snake[0].x + dir.x, y: snake[0].y + dir.y });
const nextSnake = (state) => state.snake.unshift(nextHead(state)) && (willEat(nextHead(state), state.apple) || state.snake.pop()) && state.snake;
const nextApple = state => willEat(nextHead(state), state.apple) ? randPos(state) : state.apple;
// const nextDir = () => 0

const initialState = () => ({
  col: col_length,
  row: row_length,
  snake: [{ x: 2, y: 2 }],
  apple: { x: col_length - 3, y: 2 },
  dir: EAST,
})
const next = spec({
  col: x => x.col,
  row: x => x.row,
  snake: nextSnake,
  apple: nextApple,
  dir: x => x.dir,
})
const changeDirState = (dir, prev_state) => ({
  ...prev_state,
  dir,
})