// Initial Data
let square = {
  a1: '', a2: '', a3: '',
  b1: '', b2: '', b3: '',
  c1: '', c2: '', c3: '',
};
let player = '';
let warning = '';
let playing = false;

reset();

// Events
document.querySelector('.reset').addEventListener('click', reset);
// Pega todos os items 
document.querySelectorAll('.item').forEach(item => {
  // Percorre todos da classe item e coloca click
  item.addEventListener('click', itemClick);
});

// Functions
function itemClick(event) {
  //console.log( event.target );// Pega item clicado
  let item = event.target.getAttribute('data-item');
  //console.log("Clicou em: ", item);
  if(playing && square[item] === '') {// Se item tiver vazio
    square[item] = player;// Jogador da vez
    renderSquare();// Mostra na tela
    togglePlayer();// Alternar jogador
  }
}

function reset() {
  warning = '';
  let random = Math.floor(Math.random() * 2);
  player = (random === 0) ? 'x' : 'o';

  for(let i in square) {
    square[i] = '';
  }

  playing = true;

  renderSquare();
  renderInfo();
}

function renderSquare() {
  for(let i in square) {
    //console.log("ITEM: ", i);
    let item = document.querySelector(`div[data-item=${i}]`);
    item.innerHTML = square[i];// Se tiver põe senão é vazio
  }
  checkGame();
}
function renderInfo() {
  // Jogador da vez
  document.querySelector('.vez').innerHTML = player;
  // Se tiver mensagem
  document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {// Se for 'x' põe 'o' e vice-versa
  player = (player === 'x') ? 'o' : 'x';
  renderInfo();// Mostra na tela
}

function checkGame() {// Verifica o jogo
  if(checkWinnerFor('x')) {// Verifica se o 'x' venceu
    warning = '"X" VENCEU!';
    playing = false; // Pausa o jogo
  } else if(checkWinnerFor('o')) {
    warning = '"O" VENCEU!';
    playing = false;
  } else if(isFull()) {// Se empatou
    warning = 'Deu EMPATE!';
    playing = false;
  }
}

function checkWinnerFor(player) {
  let pos = [// Possibilidades de vitória
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    'a1,b2,c3',
    'a3,b2,c1'
  ];

  for(let w in pos) {// Pega cada possibilidade
    let pArray = pos[w].split(',');// a1, a2, a3
    let hasWon = pArray.every(option=>square[option] === player);// Vencedor
    if(hasWon) {// Se venceu
      return true;
    }
  }
  return false;// Não venceu
}
function isFull() {
  for(let i in square) {
    if(square[i] === '') {//Verifica se tem vazio
      return false;
    } 
  }
  return true;// Tudo preenchido
}