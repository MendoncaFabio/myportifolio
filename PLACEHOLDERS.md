/* 
  PLACEHOLDERS PARA IMAGENS
  
  Se você ainda não tem as imagens, pode usar este arquivo SVG ou gerar imagens placeholder
  em: https://via.placeholder.com/
  
  Exemplo de uso direto no HTML:
  <img src="https://via.placeholder.com/400x400/1a2438/00d4ff?text=Profile+Photo" alt="Profile">
  
  Para usar imagens em base64 (embutidas), siga abaixo:
*/

/* Placeholder SVG - Use direto no src do <img> */
const placeholderSVG = {
  profile: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%231a2438' width='400' height='400'/%3E%3Ccircle cx='200' cy='150' r='50' fill='%2300d4ff'/%3E%3Crect x='120' y='210' width='160' height='100' fill='%2300d4ff' opacity='0.3'/%3E%3Ctext x='200' y='350' text-anchor='middle' fill='%2300d4ff' font-size='20' font-family='Arial'%3EProfile Photo%3C/text%3E%3C/svg%3E`,
  
  project: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2300d4ff;stop-opacity:0.2' /%3E%3Cstop offset='100%25' style='stop-color:%2300ff88;stop-opacity:0.2' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='%231a2438' width='600' height='400'/%3E%3Crect fill='url(%23grad)' width='600' height='400'/%3E%3Crect x='50' y='50' width='500' height='300' fill='none' stroke='%2300d4ff' stroke-width='2' rx='10'/%3E%3Ctext x='300' y='220' text-anchor='middle' fill='%2300d4ff' font-size='28' font-family='Arial' font-weight='bold'%3EProject Screenshot%3C/text%3E%3C/svg%3E`
};

/* Instruções para usar */
console.log(`
  ========================================
  COMO USAR OS PLACEHOLDERS
  ========================================
  
  Opção 1 - URLs Diretas (Mais fácil):
  ==========================================
  
  <img src="https://via.placeholder.com/400x400/1a2438/00d4ff?text=Profile" alt="Profile">
  <img src="https://via.placeholder.com/600x400/1a2438/00d4ff?text=Project+1" alt="Project 1">
  
  Formato: https://via.placeholder.com/[LARGURA]x[ALTURA]/[COR_FUNDO]/[COR_TEXTO]?text=[TEXTO]
  
  
  Opção 2 - Gerar localmente com Node.js:
  ==========================================
  
  Instale: npm install -D jimp
  
  Depois rode esse script:
  
  const Jimp = require('jimp');
  
  // Criar imagem profile
  new Jimp(400, 400, 0x1a243855, (err, image) => {
    image.print(
      Jimp.FONT_SANS_32_WHITE,
      0, 180,
      'Profile Photo',
      400, 40
    );
    image.write('./assets/images/profile.jpg');
  });
  
  // Criar imagem projeto
  new Jimp(600, 400, 0x1a243855, (err, image) => {
    image.print(
      Jimp.FONT_SANS_32_CYAN,
      100, 180,
      'Project Screenshot',
      400, 40
    );
    image.write('./assets/images/project-1.jpg');
  });
  
  
  Opção 3 - Usar no HTML (Inline SVG):
  ==========================================
  
  Você pode converter os SVGs acima em tags <img> diretamente
  
  
  Recursos Úteis:
  ==========================================
  - Placeholder: https://via.placeholder.com/
  - Unsplash: https://unsplash.com/ (Fotos gratuitas)
  - Pexels: https://www.pexels.com/ (Mais fotos)
  - Pixabay: https://pixabay.com/ (Mais opções)
  - Lorem Picsum: https://picsum.photos/ (Aleatório)
`);
