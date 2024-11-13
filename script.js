let score = 0;
const targetScores = [10, 15, 20, 25, 30];

const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score-display');
const portfolioDisplay = document.getElementById('portfolio-display');
const portfolioDetails = portfolioDisplay.querySelectorAll('.fade');

// Split portfolio details into five parts
const segmentSize = Math.ceil(portfolioDetails.length / 5);
const portfolioSegments = Array.from({ length: 5 }, (_, i) => 
    Array.from(portfolioDetails).slice(i * segmentSize, (i + 1) * segmentSize)
);

function createFruit() {
    const fruit = document.createElement('div');
    fruit.classList.add('fruit');
    
    // Set random position
    fruit.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
    fruit.style.top = '0px';

    // Add random fall duration
    const fallDuration = Math.random() * 5 + 3; // 3 to 8 seconds
    fruit.style.transition = `top ${fallDuration}s linear`;

    // Append fruit to container
    gameContainer.appendChild(fruit);

    // Start falling
    setTimeout(() => {
        fruit.style.top = `${window.innerHeight - 50}px`;
    }, 100);

    // Handle click (cut) event
    fruit.addEventListener('click', () => cutFruit(fruit));

    // Remove fruit after it falls
    fruit.addEventListener('transitionend', () => {
        gameContainer.removeChild(fruit);
    });
}

function cutFruit(fruit) {
    // Remove fruit when clicked
    gameContainer.removeChild(fruit);

    // Increase score
    score++;
    scoreDisplay.textContent = `Score: ${score}`;

    // Show portfolio parts based on score milestones
    targetScores.forEach((target, index) => {
        if (score === target) {
            showPortfolio(portfolioSegments[index]);
        }
    });
}

function showPortfolio(details) {
    portfolioDisplay.classList.add('visible');
    details.forEach((detail, index) => {
        setTimeout(() => {
            detail.style.display = 'block';
            detail.classList.add('fade-in');
        }, index * 1000); // Show each detail with a delay
    });
}

// Spawn fruits at intervals
setInterval(createFruit, 1000);
