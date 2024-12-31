const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const videoContainer = document.querySelector('.video');

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

let gameStarted = false;

const startGame = () => {
    if (gameStarted) return; // Impede que o jogo seja iniciado novamente

    gameStarted = true;

    // Faz o vídeo desaparecer
    videoContainer.style.transition = "opacity 0.5s ease";
    videoContainer.style.opacity = "0";

    setTimeout(() => {
        videoContainer.style.display = "none"; // Remove o vídeo após a transição
    }, 500);

    // Adiciona um atraso de 1 segundo antes de iniciar o jogo
    setTimeout(() => {
        pipe.classList.add('pipe-active');
        clouds.classList.add('clouds-active');

        const loop = setInterval(() => {
            const pipePosition = pipe.offsetLeft;
            const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

            if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
                pipe.style.animation = 'none';
                pipe.style.left = `${pipePosition}px`;

                mario.style.animation = 'none';
                mario.style.bottom = `${marioPosition}px`;

                mario.src = 'img/game-over.png';
                mario.style.width = '75px';
                mario.style.marginLeft = '50px';

                clearInterval(loop);
            }
        }, 10);

        document.addEventListener('keydown', jump);
    }, 100); // Atraso de 1 segundo
};

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        startGame();
    }
});
