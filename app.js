/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game


score for each player
round score
active player
dice = Math.floor(Math.random() * 6) + 1;
*/

var scores, roundScore, activePlayer, scoreLimit, gamePlaying;

init();

function init(){
    
    //return all all global variables to initial state
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    scoreLimit = 100;
    gamePlaying = true;
    alert('First player to reach ' + scoreLimit + ' points wins the game. Goodluck!');
    //hide dice
    document.querySelector('.dice').style.display = 'none';

    //display hidden roll and hold btns
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';

    //return score to zero
    document.querySelector('#score-0').innerHTML = scores[0];
    document.querySelector('#score-1').innerHTML = scores[1];

    //return round score to zero
    document.querySelector('#current-0').innerHTML = roundScore;
    document.querySelector('#current-1').innerHTML = roundScore;

    //return play names to normal
    document.querySelector('#name-0').innerHTML = 'Player 1';
    document.querySelector('#name-1').innerHTML = 'Player 2';

    //return active player indicator to player 1
    document.querySelector('.player-0-panel').classList = 'player-0-panel active';
    document.querySelector('.player-1-panel').classList = 'player-1-panel';
}

 //setter because it sets the value of a DOM
 //getter because it gets the value of a DOM
document.querySelector('.dice').style.display = 'none';//hide dice at beginning


/*
Message queue is where all events on the browser are stacked waiting for all functions to be executed from the execution stack.
*/


/*
A call back function is a function that we call by passing it as a variable in another function eg. functions called by the addEventListener('event', ourFunction) function.

An anonymous function is one that doesn't have a name so it cn't be reused. 
Anonymous functions look basically like this - addEventListener('event', function() {
    I am an anonymous function. Only to carry out something specific with this event.
})
*/

document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying){
        //Round Number 
    var dice = Math.floor(Math.random() * 6) + 1;
    
    //Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //Update the round score If the rolled number was NOT a 1
    if (dice !== 1){
        roundScore += dice;
        document.getElementById('current-' + activePlayer).innerHTML = roundScore;
        // scores[0] = roundScore;
        // document.querySelector('#score-' + activePlayer).innerHTML = scores[0];
    } else{
        nextPlayer();
         
    }
  }
    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        //Add current score to player's global score
    scores[activePlayer] += roundScore;
    

    //Update UI
    document.querySelector('#score-' + activePlayer).innerHTML = scores[activePlayer];
    
    //Check Winner
    if (scores[activePlayer] >= scoreLimit){
        document.querySelector('#name-' + activePlayer).innerHTML = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

        //end game state
        gamePlaying = false;
        
        if (gamePlaying === false){
            alert('Player ' + (activePlayer + 1) + ' won. Congratulations!');
        }
    }else{
        nextPlayer();  
    }
  }  
});

function nextPlayer(){
    document.querySelector('.dice').style.display = 'none';
    roundScore = 0;
    document.getElementById('current-' + activePlayer).innerHTML = roundScore;

    //switch active player to next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    
    //for some reason we have to separate the toggle querry
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('current-' + activePlayer).innerHTML = roundScore;
}

document.querySelector('.btn-new').addEventListener('click', init);