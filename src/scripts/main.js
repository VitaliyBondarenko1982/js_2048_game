'use strict';

import Game from '../modules/Game.class';

const game = new Game();

const button = document.querySelector('.button');
const board = document.querySelector('tbody');
const startMessage = document.querySelector('.message-start');
const loseMessage = document.querySelector('.message-lose');
const winMessage = document.querySelector('.message-win');
const gameScore = document.querySelector('.game-score');

function handleGame() {
  if (game.getStatus() === Game.STATUS.idle) {
    document.addEventListener('keydown', onMove);
    button.textContent = 'Restart';
    game.start();
  } else {
    button.textContent = 'Start';
    game.restart();
    stopGame();
  }

  button.classList.toggle('restart');
  button.classList.toggle('start');

  renderBoard();
  manageMessage();
}

function stopGame() {
  document.removeEventListener('keydown', onMove);
}

function onMove(e) {
  e.preventDefault();

  switch (e.key) {
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
    default:
      break;
  }

  renderBoard();

  if ([Game.STATUS.win, Game.STATUS.lose].includes(game.getStatus())) {
    stopGame();
    manageMessage();
  }
}

function renderBoard() {
  game.state.forEach((line, index) => {
    const tr = document.createElement('tr');

    tr.classList.add('field-row');

    line.forEach((item) => {
      const td = document.createElement('td');

      td.classList.add('field-cell');

      if (item) {
        td.classList.add(`field-cell--${item}`);
      }

      td.textContent = item || '';

      tr.appendChild(td);
    });

    board.replaceChild(tr, board.rows[index]);
  });

  gameScore.textContent = game.getScore().toString();
}

function manageMessage() {
  switch (game.getStatus()) {
    case Game.STATUS.idle:
      startMessage.classList.remove('hidden');
      winMessage.classList.add('hidden');
      loseMessage.classList.add('hidden');
      break;
    case Game.STATUS.playing:
      startMessage.classList.add('hidden');
      break;
    case Game.STATUS.win:
      winMessage.classList.remove('hidden');
      break;
    case Game.STATUS.lose:
      loseMessage.classList.remove('hidden');
      break;
    default:
      break;
  }
}

button.addEventListener('click', handleGame);
