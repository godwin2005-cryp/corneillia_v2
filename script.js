document.addEventListener('DOMContentLoaded', function () {
    // Créer les coeurs flottants
    createFloatingHearts();

    // Animation des sections au scroll
    setupScrollReveal();

    // Bouton cœur avec message caché
    setupHeartButton();

    // Effet de particules au survol
    setupParticleEffect();

    // Photo reveal effect
    setupPhotoReveal();
});

function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const heartEmojis = ['❤️', '�', '💕', '💗', '✨', '�', '💘'];

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createHeart(container, heartEmojis);
        }, i * 600);
    }

    // Continue d'ajouter des coeurs
    setInterval(() => {
        createHeart(container, heartEmojis);
    }, 2000);
}

function createHeart(container, emojis) {
    const heart = document.createElement('span');
    heart.classList.add('heart');
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDelay = Math.random() * 5 + 's';

    container.appendChild(heart);

    // Supprimer après l'animation
    setTimeout(() => {
        heart.remove();
    }, 20000);
}

function setupScrollReveal() {
    const sections = document.querySelectorAll('.section-reveal');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

function setupHeartButton() {
    const heartBtn = document.getElementById('heartBtn');
    const hiddenMessage = document.getElementById('hiddenMessage');

    if (heartBtn && hiddenMessage) {
        heartBtn.addEventListener('click', function () {
            hiddenMessage.classList.toggle('show');

            if (hiddenMessage.classList.contains('show')) {
                heartBtn.querySelector('span').textContent = '💛 Message ouvert';

                // Effet de confettis
                createConfetti(heartBtn);
            } else {
                heartBtn.querySelector('span').textContent = '❤️ Clique ici';
            }
        });
    }
}

function createConfetti(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#e74c3c', '#ff6b6b', '#c9a227', '#ffe4e1', '#ffffff'];

    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = rect.left + rect.width / 2 + 'px';
        confetti.style.top = rect.top + 'px';
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '10000';
        document.body.appendChild(confetti);

        const angle = (Math.random() * Math.PI * 2);
        const velocity = Math.random() * 150 + 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 100;

        confetti.animate([
            { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
            { transform: `translate(${vx}px, ${vy + 300}px) scale(0) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 1200,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => confetti.remove();
    }
}

function setupPhotoReveal() {
    const revealBtn = document.getElementById('revealBtn');
    const photoFrame = document.getElementById('photoFrame');

    if (revealBtn && photoFrame) {
        revealBtn.addEventListener('click', function () {
            // Hide button
            revealBtn.classList.add('hidden');

            // Reveal photo with animation
            photoFrame.classList.remove('hidden');
            photoFrame.classList.add('revealed');

            // Create romantic confetti
            createHeartConfetti(photoFrame);

            // Scroll to photo
            setTimeout(() => {
                photoFrame.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    }
}

function createHeartConfetti(element) {
    const rect = element.getBoundingClientRect();
    const hearts = ['❤️', '💕', '💖', '💗', '💓'];

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * 200) + 'px';
            heart.style.top = (rect.top + rect.height / 2) + 'px';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '10000';
            document.body.appendChild(heart);

            heart.animate([
                { transform: 'translate(0, 0) scale(0)', opacity: 0 },
                { transform: 'translate(0, -50px) scale(1.5)', opacity: 1, offset: 0.3 },
                { transform: `translate(${(Math.random() - 0.5) * 300}px, ${Math.random() * 200 + 100}px) scale(0)`, opacity: 0 }
            ], {
                duration: 2000,
                easing: 'ease-out'
            }).onfinish = () => heart.remove();
        }, i * 100);
    }
}

function setupParticleEffect() {
    const cards = document.querySelectorAll('.moment-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Smooth scroll pour l'indicateur
document.querySelector('.scroll-indicator')?.addEventListener('click', function () {
    document.querySelector('.intro').scrollIntoView({ behavior: 'smooth' });
});

// Compteur d'amour
function setupLoveCounter() {
    const startDate = new Date('2026-02-28T00:00:00'); // Date de la rencontre

    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }

    updateCounter();
    setInterval(updateCounter, 1000);
}

// Lettre d'amour interactive
function setupLoveLetter() {
    const envelope = document.getElementById('letterEnvelope');
    const front = envelope?.querySelector('.envelope-front');
    const content = document.getElementById('letterContent');

    if (envelope && front && content) {
        front.addEventListener('click', function () {
            front.style.display = 'none';
            content.classList.remove('hidden');

            // Créer une pluie de cœurs
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    createFloatingHeartEmoji();
                }, i * 100);
            }
        });
    }
}

function createFloatingHeartEmoji() {
    const hearts = ['❤️', '💖', '💕', '💗', '💓', '🌹'];
    const heart = document.createElement('span');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '-50px';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '10000';
    heart.style.animation = `float ${Math.random() * 5 + 5}s linear forwards`;
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 10000);
}

// Pétales de rose
function createRosePetals() {
    const container = document.querySelector('.rose-petals');
    if (!container) return;

    const petals = ['🌹', '🥀', '🌸', '🌺', '💮'];

    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createPetal(container, petals);
        }, i * 1000);
    }

    setInterval(() => {
        createPetal(container, petals);
    }, 3000);
}

function createPetal(container, petals) {
    const petal = document.createElement('span');
    petal.classList.add('rose-petal');
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (Math.random() * 5 + 10) + 's';
    petal.style.fontSize = (Math.random() * 15 + 15) + 'px';

    container.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 15000);
}

// Appeler les nouvelles fonctions
document.addEventListener('DOMContentLoaded', function () {
    setupLoveCounter();
    setupLoveLetter();
    createRosePetals();
    setupLoveYouButton();
    setupReasonCards();
});

// Bouton Je t'aime avec effet spécial
function setupLoveYouButton() {
    const btn = document.getElementById('loveYouBtn');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
        // Créer explosion de cœurs
        createLoveExplosion(e.clientX, e.clientY);

        // Message spécial
        showLoveMessage();

        // Changer le texte temporairement
        const originalText = btn.textContent;
        btn.textContent = '💕 Je t\'aime plus 💕';
        btn.style.background = 'linear-gradient(135deg, #ff1744 0%, #ff4081 100%)';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 3000);
    });
}

function createLoveExplosion(x, y) {
    const explosion = document.createElement('div');
    explosion.classList.add('love-explosion');
    explosion.style.left = x + 'px';
    explosion.style.top = y + 'px';
    document.body.appendChild(explosion);

    const emojis = ['❤️', '💖', '💕', '💗', '💓', '🌹', '💘', '💝'];
    const messages = ['Je t\'aime', 'Ma Reine', 'Pour toujours', 'Mon amour', 'Corneillia', 'SEGNANKA'];

    for (let i = 0; i < 30; i++) {
        const span = document.createElement('span');
        span.textContent = Math.random() > 0.7 ? messages[Math.floor(Math.random() * messages.length)] : emojis[Math.floor(Math.random() * emojis.length)];

        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 100 + Math.random() * 200;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        span.style.setProperty('--tx', tx + 'px');
        span.style.setProperty('--ty', ty + 'px');
        span.style.fontSize = (Math.random() * 20 + 15) + 'px';

        explosion.appendChild(span);
    }

    setTimeout(() => explosion.remove(), 2000);
}

function showLoveMessage() {
    const messages = [
        'Tu es l\'amour de ma vie !',
        'Ma Reine Corneillia',
        'Je veux passer ma vie avec toi',
        'Tu es ma destinée',
        'Nagnini SEGNANKA, je t\'adore'
    ];

    const msg = document.createElement('div');
    msg.textContent = messages[Math.floor(Math.random() * messages.length)];
    msg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #e74c3c, #ff6b6b);
        color: white;
        padding: 2rem 3rem;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 10001;
        animation: fadeInOut 3s ease;
        box-shadow: 0 20px 60px rgba(231, 76, 60, 0.5);
    `;

    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
}

// Cartes de raisons avec animation
function setupReasonCards() {
    const cards = document.querySelectorAll('.reason-card');

    cards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.2) + 's';
        card.classList.add('animate-in');
    });
}
