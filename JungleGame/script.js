score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');

// audio.play();
setTimeout(() => {
    audio.play()
}, 1000);

document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        myPlayer = document.querySelector('.myPlayer');
        myPlayer.classList.add('animatePlayer');
        setTimeout(() => {
            myPlayer.classList.remove('animatePlayer')
        }, 1000);
    }
    else if (e.keyCode == 39) {
        myPlayer = document.querySelector('.myPlayer');
        playerX = parseInt(window.getComputedStyle(myPlayer, null).getPropertyValue('left'));
        myPlayer.style.left = playerX + 112 + "px";
    }
    else if (e.keyCode == 37) {
        myPlayer = document.querySelector('.myPlayer');

        playerY = parseInt(window.getComputedStyle(myPlayer, null).getPropertyValue('top'));
        myPlayer.style.left = (playerY - 112) + "px";
    }
}

setInterval(() => {
    myPlayer = document.querySelector('.myPlayer');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    //will give computed left value of myPlayer
    mPx = parseInt(window.getComputedStyle(myPlayer, null).getPropertyValue('left'));
    //will give computed top value of myPlayer
    mPy = parseInt(window.getComputedStyle(myPlayer, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(mPx - ox);
    offsetY = Math.abs(mPy - oy);
    console.log(offsetX, offsetY);
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "'<b>'GAME OVER'</b>'- Reload to play again";
        obstacle.classList.remove('obstacleDino');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }

    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDuration = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duartion'));
            newDuration = aniDuration - 0.3;
            obstacle.style.animationDuration = newDuration + 's';
            console.log('New Animation Duration', newDuration);
        }, 500);

    }
}, 10);

function updateScore(score) {
    scoreContainer.innerHTML = "Your Score: " + score
}