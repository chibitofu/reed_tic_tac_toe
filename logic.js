//Variables
var turn = 0;
var won = 0;


//HTML Elements
var gameboard = document.getElementById('gameboard');

var topLeft = document.getElementById('topLeft');
var topMiddle = document.getElementById('topMiddle');
var topRight = document.getElementById('topRight');

var middleLeft = document.getElementById('middleLeft');
var middleMiddle = document.getElementById('middleMiddle');
var middleRight = document.getElementById('middleRight');

var bottomLeft = document.getElementById('bottomLeft');
var bottomMiddle = document.getElementById('bottomMiddle');
var bottomRight = document.getElementById('bottomRight');

var allElements = [topLeft, topMiddle, topRight,
                   middleLeft, middleMiddle, middleRight,
                   bottomLeft, bottomMiddle, bottomRight];

var clear = document.getElementById('clear');
var turnBox = document.getElementById('turnBox');

//Set board to a consistent state
for (i in allElements) {
    allElements[i].innerHTML = '';
}

//Game logic
var play = {
    placePiece  : function(e, thisElement) {
                        if (won === 1) {
                            return;
                        } else if (thisElement.innerHTML == '<p>X</p>'
                            || thisElement.innerHTML == '<p>O</p>' ){
                            return;
                        } else if (turn % 2 === 0) {
                            thisElement.innerHTML = '';
                            thisElement.style.backgroundColor = '#91CC14';
                            thisElement.innerHTML = '<p>X</p>';
                            turn++;
                            turnBox.innerHTML = '<b>Turn:</b> O';
                        } else {
                            thisElement.innerHTML = '';
                            thisElement.style.backgroundColor = '#FF3D19';
                            thisElement.innerHTML = '<p>O</p>';
                            turn++;
                            turnBox.innerHTML = '<b>Turn:</b> X';
                        }
                    },
    clear       : function(e, allElements) {
                        for (var i = 0; i < allElements.length; i++) {
                            allElements[i].innerHTML = '';
                            allElements[i].style.backgroundColor = 'slategrey';
                        }
                            turnBox.innerHTML = '<b>Turn:</b> X';
                            turn = 0;
                            won = 0;
                    },
    checkWin   : function(e, player) {
                        //All winning variations. IndexOf returns 3 when a player is found
                        var topWin = topLeft.innerHTML.indexOf(player)
                            * topMiddle.innerHTML.indexOf(player)
                            * topRight.innerHTML.indexOf(player);
                        var bottomWin = bottomLeft.innerHTML.indexOf(player)
                            * bottomMiddle.innerHTML.indexOf(player)
                            * bottomRight.innerHTML.indexOf(player);
                        var leftWin = topLeft.innerHTML.indexOf(player)
                            * middleLeft.innerHTML.indexOf(player)
                            *bottomLeft.innerHTML.indexOf(player);
                        var rightWin = topRight.innerHTML.indexOf(player)
                            * middleRight.innerHTML.indexOf(player)
                            * bottomRight.innerHTML.indexOf(player);
                        var middleHorizWin = middleLeft.innerHTML.indexOf(player)
                            *middleMiddle.innerHTML.indexOf(player)
                            *middleRight.innerHTML.indexOf(player);
                        var middleVertWin = topMiddle.innerHTML.indexOf(player)
                            *middleMiddle.innerHTML.indexOf(player)
                            *bottomMiddle.innerHTML.indexOf(player);
                        var diagLeftWin = topLeft.innerHTML.indexOf(player)
                            * middleMiddle.innerHTML.indexOf(player)
                            *bottomRight.innerHTML.indexOf(player);
                        var diagRightWin = topRight.innerHTML.indexOf(player)
                            * middleMiddle.innerHTML.indexOf(player)
                            * bottomLeft.innerHTML.indexOf(player);

                        //3 cubed gets 27. If any win variation hit, set winner
                        if (topWin === 27 || bottomWin === 27 || leftWin === 27
                                || rightWin === 27 || middleHorizWin === 27
                                || middleVertWin === 27 || diagLeftWin === 27
                                || diagRightWin === 27)
                        {
                            won = 1;
                            turnBox.innerHTML = 'Winner is ' + player + '!';
                        } else if (turn == 9 && won == 0) {
                            //Won set to prevent new moves
                            won = 1;
                            turnBox.innerHTML = 'Tie game';
                        }
                    },
    aiRandom    : function (e, allElements) {
                        var randomMove = Math.abs(Math.ceil(Math.random()*10) - 2);
                        var moveNotMade = true;
                        var count = 0;
                        //Count < 50 to allow a lot of chances for the random generator
                        while(moveNotMade && (count < 50)){
                            if (allElements[randomMove].innerHTML == '') {
                                allElements[randomMove].innerHTML = '';
                                allElements[randomMove].style.backgroundColor = '#FF3D19';
                                allElements[randomMove].innerHTML = '<p>O</p>';
                                turn++;
                                moveNotMade = false;
                                turnBox.innerHTML = '<b>Turn:</b> X';
                                return;
                            }
                            count++;
                            randomMove = Math.abs(Math.ceil(Math.random()*10) - 2);
                        }
                    }
}

//Event Listeners.
topLeft.addEventListener('click', function () {
    play.placePiece(event, topLeft)
});
topMiddle.addEventListener('click', function () {
    play.placePiece(event, topMiddle)
});
topRight.addEventListener('click', function () {
    play.placePiece(event, topRight)
});
middleLeft.addEventListener('click', function () {
    play.placePiece(event, middleLeft)
});
middleMiddle.addEventListener('click', function() {
    play.placePiece(event, middleMiddle)
});
middleRight.addEventListener('click', function () {
    play.placePiece(event, middleRight)
});
bottomLeft.addEventListener('click', function () {
    play.placePiece(event, bottomLeft)
});
bottomMiddle.addEventListener('click', function () {
    play.placePiece(event, bottomMiddle)
});
bottomRight.addEventListener('click', function () {
    play.placePiece(event, bottomRight)
});
clear.addEventListener('click', function () {
    play.clear(event, allElements);
});

//Check for winner each turn
gameboard.addEventListener('click', function() {
    //Comment out the following if statement if playing with two human players
    play.checkWin(event, 'X');
    if (turn % 2 !== 0 && won !== 1) {
        play.aiRandom(event, allElements);
    }
    if( won !== 1) {
        play.checkWin(event, 'O');
    }
});
