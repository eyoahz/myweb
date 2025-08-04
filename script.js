const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');  // canvas默认宽高300*150
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;
let playerState = 'idle';

let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = {};
const animationStates = [
  { name: 'idle', frames: 7 },
  { name: 'jump', frames: 7 },
  { name: 'fall', frames: 7 },
  { name: 'run', frames: 9 },
  { name: 'dizzy', frames: 11 },
  { name: 'sit', frames: 5 },
  { name: 'roll', frames: 7 },
  { name: 'bite', frames: 7 },
  { name: 'ko', frames: 12 },
  { name: 'getHit', frames: 4 }
]
animationStates.forEach((state, index) => {
  let frames = {
    loc: []
  }
  for(let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY })
  }
  spriteAnimations[state.name] = frames;
})
console.log(spriteAnimations);

const select = document.querySelector('#select1');
animationStates.forEach((state, index) => {
  let option = document.createElement('option');
  option.textContent = state.name;
  option.value = state.name;
  select.appendChild(option);
})
select.addEventListener('change', (e) => {
  playerState = e.target.value;
})


function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // 清除画布,各个参数分别代表x,y坐标和宽高
  // ctx.fillRect(50, 50, 100, 100); // 绘制矩形,各个参数分别代表x,y坐标和宽高
  let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length; // 计算当前帧的图片位置
  let frameX = spriteAnimations[playerState].loc[position].x;
  let frameY = spriteAnimations[playerState].loc[position].y;
  ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // 绘制图片,各个参数分别代表图片裁剪区域的x,y坐标和宽高,canvas的x,y坐标和宽高
  gameFrame++;
  requestAnimationFrame(animate)  // 请求下一帧动画
}
animate();
