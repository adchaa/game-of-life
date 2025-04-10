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
    // Obtenir l’élément avec l’identifiant 'root'
    // .....
    this.#init();
  }

  /**
   * Initialise le plateau de jeu en créant toutes les cellules
   * @private
   */
  #init() {}

  /**
   * Détermine si une cellule est vivante
   * @param {HTMLElement} el - L’élément cellule à vérifier
   * @returns {boolean} True si la cellule est vivante, false sinon
   */
  isAlive(el) {}

  /**
   * Rend une cellule vivante
   * @param {HTMLElement} el - L’élément cellule à rendre vivant
   */
  revive(el) {}

  /**
   * Tue une cellule
   * @param {HTMLElement} el - L’élément cellule à tuer
   */
  kill(el) {}

  /**
   * Récupère la cellule aux coordonnées spécifiées
   * @param {number} x - La coordonnée x
   * @param {number} y - La coordonnée y
   * @returns {HTMLElement} L’élément DOM de la cellule aux coordonnées spécifiées
   */
  getCell(x, y) {}

  /**
   * Compte le nombre de voisins vivants autour d’une cellule
   * @param {number} i - La coordonnée x de la cellule
   * @param {number} j - La coordonnée y de la cellule
   * @returns {number} Le nombre de voisins vivants
   */
  neighborsAlive(i, j) {}

  /**
   * Vide le plateau de jeu en rendant toutes les cellules mortes
   */
  clear() {}

  /**
   * Fait avancer l’état du jeu d’un tick selon les règles du Jeu de la Vie de Conway
   * Règles :
   * 1. Toute cellule vivante ayant moins de deux voisins vivants meurt (sous-population)
   * 2. Toute cellule vivante ayant deux ou trois voisins vivants survit
   * 3. Toute cellule vivante ayant plus de trois voisins vivants meurt (surpopulation)
   * 4. Toute cellule morte ayant exactement trois voisins vivants devient vivante (reproduction)
   */
  tick() {}

  /**
   * Démarre la simulation du jeu en lançant l’intervalle de ticks
   */
  start() {}

  /**
   * Arrête la simulation du jeu en annulant l’intervalle de ticks
   */
  stop() {}
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
