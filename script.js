class Game {
  /** @type {number} Largeur de la grille de jeu en cellules */
  WIDTH = 100;

  /** @type {number} Hauteur de la grille de jeu en cellules */
  HEIGHT = 100;

  /** @type {number} Vitesse des ticks du jeu en millisecondes */
  TICKSPEED = 200;

  /** @type {HTMLElement} Élément racine du DOM */
  rootElement;

  /** @type {number|undefined} ID de l’intervalle principal du jeu */
  mainLoop;

  constructor() {
    this.rootElement = document.getElementById("root");
    this.#init();
  }

  /**
   * Initialise le plateau de jeu en créant toutes les cellules
   * @private
   */
  #init() {
    for (let i = 0; i < this.HEIGHT; i++) {
      const divParent = document.createElement("div");
      divParent.className = "line";
      for (let j = 0; j < this.WIDTH; j++) {
        const div = document.createElement("div");
        div.className = "cell";
        div.addEventListener("click", (e) => {
          if (this.isAlive(e.target)) {
            this.kill(e.target);
          } else {
            this.revive(e.target);
          }
        });
        divParent.appendChild(div);
      }
      this.rootElement.appendChild(divParent);
    }
  }

  /**
   * Détermine si une cellule est vivante
   * @param {HTMLElement} el - L’élément cellule à vérifier
   * @returns {boolean} True si la cellule est vivante, false sinon
   */
  isAlive(el) {
    return el.className.includes("alive");
  }

  /**
   * Rend une cellule vivante
   * @param {HTMLElement} el - L’élément cellule à rendre vivant
   */
  revive(el) {
    el.classList.add("alive");
  }

  /**
   * Tue une cellule
   * @param {HTMLElement} el - L’élément cellule à tuer
   */
  kill(el) {
    el.classList.remove("alive");
  }

  /**
   * Récupère la cellule aux coordonnées spécifiées
   * @param {number} x - La coordonnée x
   * @param {number} y - La coordonnée y
   * @returns {HTMLElement} L’élément DOM de la cellule aux coordonnées spécifiées
   */
  getCell(x, y) {
    return this.rootElement.children[x].children[y];
  }

  /**
   * Compte le nombre de voisins vivants autour d’une cellule
   * @param {number} i - La coordonnée x de la cellule
   * @param {number} j - La coordonnée y de la cellule
   * @returns {number} Le nombre de voisins vivants
   */
  neighborsAlive(i, j) {
    let alive = 0;
    for (let x = i - 1; x <= i + 1; x++) {
      for (let y = j - 1; y <= j + 1; y++) {
        if (
          x < 0 ||
          y < 0 ||
          y >= this.WIDTH ||
          x >= this.HEIGHT ||
          (x == i && y == j)
        )
          continue;
        const el = this.getCell(x, y);
        if (this.isAlive(el)) alive++;
      }
    }
    return alive;
  }

  /**
   * Fait avancer l’état du jeu d’un tick selon les règles du Jeu de la Vie de Conway
   * Règles :
   * 1. Toute cellule vivante ayant moins de deux voisins vivants meurt (sous-population)
   * 2. Toute cellule vivante ayant deux ou trois voisins vivants survit
   * 3. Toute cellule vivante ayant plus de trois voisins vivants meurt (surpopulation)
   * 4. Toute cellule morte ayant exactement trois voisins vivants devient vivante (reproduction)
   */
  tick() {
    const callbacks = [];
    for (let i = 0; i < this.HEIGHT; i++) {
      for (let j = 0; j < this.WIDTH; j++) {
        let alive = this.neighborsAlive(i, j);
        const cell = this.getCell(i, j);
        if (alive < 2 || alive > 3) {
          callbacks.push(() => this.kill(cell));
        } else if (alive == 3) {
          callbacks.push(() => this.revive(cell));
        }
      }
    }
    callbacks.forEach((func) => func());
  }

  /**
   * Vide le plateau de jeu en rendant toutes les cellules mortes
   */
  clear() {
    for (let i = 0; i < this.HEIGHT; i++) {
      for (let j = 0; j < this.WIDTH; j++) {
        this.kill(this.getCell(i, j));
      }
    }
  }

  /**
   * Démarre la simulation du jeu en lançant l’intervalle de ticks
   */
  start() {
    if (!this.mainLoop) {
      this.mainLoop = setInterval(() => this.tick(), this.TICKSPEED);
    }
  }

  /**
   * Arrête la simulation du jeu en annulant l’intervalle de ticks
   */
  stop() {
    if (this.mainLoop) {
      clearInterval(this.mainLoop);
      this.mainLoop = undefined;
    }
  }
}

const game = new Game();

window.addEventListener("keydown", (e) => {
  switch (e.key.toLowerCase()) {
    case "s":
      game.start();
      break;
    case "q":
      game.stop();
      break;
    case "c":
      game.stop();
      game.clear();
      break;
    case "t":
      game.tick();
      break;
  }
});
