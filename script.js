const WIDTH = 100;
const HEIGHT = 100;
const TICKSPEED = 200;

const rootElement = document.getElementById("root");
let mainLoop;

function isAlive(el) {
  return el.className.includes("alive");
}

function revive(el) {
  el.className += " alive";
}

function kill(el) {
  el.className = el.className.replaceAll("alive");
}

function init() {
  for (let i = 0; i < HEIGHT; i++) {
    const divParent = document.createElement("div");
    divParent.className = "line";
    for (let j = 0; j < WIDTH; j++) {
      const div = document.createElement("div");
      div.className = "block";
      div.onclick = (e) => {
        if (isAlive(e.target)) {
          kill(e.target);
        } else {
          e.target.className += " alive";
        }
      };
      divParent.appendChild(div);
    }
    rootElement.appendChild(divParent);
  }
}

function neighborsAlive() {
  for (let x = i - 1; x <= i + 1; x++) {
    for (let y = j - 1; y <= j + 1; y++) {
      if (x < 0 || y < 0 || y >= WIDTH || x >= HEIGHT || (x == i && y == j))
        continue;
      const el = lines[x].children[y];
      if (isAlive(el)) alive++;
    }
  }
}

function tick() {
  const lines = rootElement.children;
  const callbacks = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].children;
    for (let j = 0; j < line.length; j++) {
      let alive = 0;
      const block = line[j];
      if (alive < 2 || alive > 3) {
        callbacks.push(() => kill(block));
      } else if (alive == 3) {
        callbacks.push(() => revive(block));
      }
    }
  }
  callbacks.forEach((func) => func());
}

function clear() {
  const lines = rootElement.children;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].children;
    for (let j = 0; j < line.length; j++) {
      kill(line[j]);
    }
  }
}

function start() {
  mainLoop = setInterval(tick, TICKSPEED);
}
function stop() {
  clearInterval(mainLoop);
  mainLoop = undefined;
}

window.addEventListener("keydown", (e) => {
  if (e.key == "s" && !mainLoop) {
    start();
  }
  if (e.key == "q" && mainLoop) {
    stop();
  }
  if (e.key == "c") {
    clear();
  }
});
