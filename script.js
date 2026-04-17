const typingPhrases = [
  "RAG-powered applications",
  "production AI workflows",
  "cloud-native data platforms",
  "LLM-enabled user experiences",
  "reliable engineering systems"
];

const typedText = document.getElementById("typed-text");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const current = typingPhrases[phraseIndex];
  typedText.textContent = current.substring(0, charIndex);

  let delay = isDeleting ? 42 : 82;

  if (!isDeleting && charIndex < current.length) {
    charIndex++;
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
  } else if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    delay = 1250;
  } else {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    delay = 320;
  }

  setTimeout(typeLoop, delay);
}

function revealOnScroll() {
  const items = document.querySelectorAll(".reveal, .reveal-left");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  items.forEach(item => observer.observe(item));
}

function enableTilt() {
  const cards = document.querySelectorAll(".tilt");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      if (window.innerWidth < 900) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function enableMagneticButtons() {
  const buttons = document.querySelectorAll(".magnetic");
  buttons.forEach(button => {
    button.addEventListener("mousemove", (e) => {
      if (window.innerWidth < 900) return;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });
    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });
}

function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const count = Math.min(74, Math.floor(width / 22));
  const particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.8 + 0.6
  }));

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(173, 216, 255, 0.42)";
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(125, 211, 252, ${0.08 * (1 - dist / 130)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
typeLoop();
revealOnScroll();
enableTilt();
enableMagneticButtons();
initParticles();
