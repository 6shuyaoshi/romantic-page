const envelope = document.querySelector("[data-open-letter]");
const message = document.querySelector("[data-letter-message]");

envelope.addEventListener("click", () => {
  const isOpen = envelope.classList.toggle("open");
  envelope.setAttribute("aria-expanded", String(isOpen));
  message.classList.toggle("show", isOpen);

  if (isOpen) {
    sparkle(envelope);
  }
});

function sparkle(anchor) {
  const rect = anchor.getBoundingClientRect();
  const colors = ["#d94b72", "#f1c77e", "#7db6c9", "#ffffff"];

  for (let i = 0; i < 18; i += 1) {
    const star = document.createElement("span");
    const size = 6 + (i % 4) * 3;
    star.className = "spark";
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${rect.left + rect.width * (0.22 + Math.random() * 0.56)}px`;
    star.style.top = `${rect.top + rect.height * (0.2 + Math.random() * 0.5)}px`;
    star.style.background = colors[i % colors.length];
    star.style.setProperty("--x", `${(Math.random() - 0.5) * 180}px`);
    star.style.setProperty("--y", `${-60 - Math.random() * 120}px`);
    document.body.append(star);
    setTimeout(() => star.remove(), 900);
  }
}

const style = document.createElement("style");
style.textContent = `
  .spark {
    position: fixed;
    z-index: 60;
    border-radius: 99px;
    pointer-events: none;
    animation: spark-float 850ms ease forwards;
    box-shadow: 0 0 14px currentColor;
  }

  @keyframes spark-float {
    0% {
      opacity: 0;
      transform: translate(0, 0) scale(0.4);
    }
    18% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate(var(--x), var(--y)) scale(1);
    }
  }
`;
document.head.append(style);
