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
