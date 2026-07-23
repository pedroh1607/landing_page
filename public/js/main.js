// #region matrix
// Pega o canvas da página e o contexto 2D para desenhar os caracteres.
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

// Ajusta o tamanho do canvas para ocupar a tela inteira e recalcula colunas.
const chars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$#%&*";
const fontSize = 15;
let columns = 0;
let drops = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array.from({ length: columns }, () => Math.random() * 3);
}


const glitch = document.querySelector(".glitch");

if (glitch) {
  setInterval(() => {
    glitch.style.opacity = Math.random() > 0.9 ? "0.5" : "1";
    glitch.style.textShadow = `
      ${Math.random() * 8 - 4}px 0 red,
      ${Math.random() * 8 - 4}px 0 cyan,
      ${Math.random() * 8 - 4}px 0 lime,
      0 0 12px white
    `;
  }, 100);
}

// Função principal que desenha o efeito a cada frame.
function draw() {
  // Calcula o quanto o usuário já rolou a página para sumir o efeito na segunda tela.
  const scrollY = window.scrollY;
  const fadeStart = window.innerHeight * 0.7;
  const fadeAmount = Math.max(0, 1 - scrollY / fadeStart);

  // Limpa o canvas e desenha um fundo escuro com leve transparência para criar o rastro.

  ctx.fillStyle = `rgba(0, 0, 0, ${0.08 + (1 - fadeAmount) * 0.01})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Se o efeito já estiver totalmente invisível, para de desenhar.
  if (fadeAmount <= 0) return;

  // Configura a fonte e o brilho das letras.
  ctx.font = `${fontSize}px monospace`;
  ctx.textBaseline = "top";
//   ctx.shadowBlur = 10;

  // Desenha cada coluna da cascata.
  for (let i = 0; i < drops.length; i++) {
    const x = i * fontSize;
    const y = drops[i] * fontSize;
    const alpha = 0.01 + fadeAmount * 0.7;

    // Cria um rastro mais fraco antes da letra principal.
    ctx.fillStyle = `rgba(0, 255, 136, ${alpha * 0.08})`;
    ctx.shadowColor = `rgba(0, 255, 136, ${alpha * 0.07})`;
    ctx.fillText(chars.charAt(Math.floor(Math.random() * chars.length)), x, y - 2);

    // Desenha a letra principal com mais brilho.
    ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`;
    ctx.shadowColor = `rgba(0, 255, 136, ${alpha * 0.0})`;

    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    ctx.fillText(text, x, y);

    // Se a letra passou da tela, reinicia a coluna.
    if (y > canvas.height && Math.random() > 0.94) {
      drops[i] = 0;
    }

    // Faz a coluna descer.
    drops[i]++;
  }
}

function renderLoop() {
  draw();
  requestAnimationFrame(renderLoop);
}

window.addEventListener("resize", () => {
  resizeCanvas();
});

resizeCanvas();
requestAnimationFrame(renderLoop);

// #endregion