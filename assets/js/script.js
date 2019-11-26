$(document).ready(initializeApp);

var cardArray = ['bird', 'bird', 'jerrywest', 'jerrywest', 'kareem', 'kareem', 'kobe', 'kobe', 'lebron', 'lebron', 'magic', 'magic', 'mj', 'mj', 'shaq', 'shaq', 'wilt', 'wilt'];
// var cardArray = [ 'css', 'css', 'docker', 'docker', 'github', 'github', 'html', 'html', 'js', 'js', 'mysql', 'mysql', 'node', 'node', 'php', 'php', 'react', 'react' ];

var firstCardClicked = null
var secondCardClicked = null

var matches = 0;
var attempts = 0;
var clicks = 0;

var gamesPlayed = 0;

function initializeApp(){
  shuffleArray(cardArray);
  addCardClasses();
  $('.card').on('click', openCard);
  $('.play-again').on('click', newGame);
  console.table(cardArray);
}

function newGame(){
  removeCardClasses();
  shuffleArray(cardArray);
  addCardClasses();
  $('.card').on('click', openCard);
  $('.modal').toggleClass('hidden');
}

function openCard(event){
  console.log(event);
  var cardClicked = event.currentTarget.children[0].children[2].className;
  clicks++;
  attempts = Math.floor(clicks / 2);

  $(this).toggleClass('opened');
  $(this).toggleClass('disabled');

  if(!firstCardClicked){
    firstCardClicked = cardClicked;
  }
  else{
    secondCardClicked = cardClicked;
  }
  if(clicks % 2 === 0){
    if (firstCardClicked === secondCardClicked) {
      console.log('match');
      matches++;
      firstCardClicked = null;
      secondCardClicked = null;
      $('.opened').addClass('matched').removeClass('opened').off();
    }
    else{
      console.log('no match');
      firstCardClicked = null, secondCardClicked = null;
      closeCards();
    }
  }
  updateDisplay()
  checkWin();
}

function updateDisplay(){
  $('#attempts').text(attempts);
  $('#games-played').text(gamesPlayed);
  if(attempts > 1){
    $('#accuracy').text(((matches / attempts) * 100).toFixed(1) + "%");
  }
}

function closeCards(){
  $(".card-container").addClass('disabled');
  setTimeout(function(){
    $('.opened').removeClass('opened');
    $('.disabled').removeClass('disabled');
  }, 500);
}

function shuffleArray(array){
  for(var currentIndex = array.length - 1; currentIndex > 0; currentIndex--){
    var randomIndex = Math.floor(Math.random() * currentIndex);
    var temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
}

function addCardClasses(){
  var cards = $('.card-player');
  for(var i = 0; i < cards.length; i++){
    cards[i].className += ` ${cardArray[i]}`
  }
}
function removeCardClasses(){
  $('.card').removeClass('matched').removeClass('disabled');
  var cards = $('.card-player');
  for(var i = 0; i < cards.length; i++){
    cards[i].className = 'card-player';
  }
}

function checkWin(){
  if(matches === 9){
    matches = 0;
    attempts = 0;
    clicks = 0;
    $('.modal').toggleClass('hidden');
    gamesPlayed++;
    updateDisplay();
  }
}
