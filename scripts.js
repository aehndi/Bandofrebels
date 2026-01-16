const canvas = document.getElementById('bannerCanvas');
const ctx = canvas.getContext('2d');
const downloadLink = document.getElementById('downloadLink');
const playerNameInput = document.getElementById('playerName');
const bannerTypeSelect = document.getElementById('bannerType');

let currentImg = new Image();

function loadBannerImage(type, callback) {
    const img = new Image();
    img.onload = () => {
        currentImg = img;
        if (callback) callback(img);
        else updatePreview();
    };
    img.src = `${type}.png`;
}

// Initial load
loadBannerImage('rebels');

function updatePreview() {
    const name = playerNameInput.value.trim();
    if (!currentImg.complete) return;

    canvas.width = currentImg.width;
    canvas.height = currentImg.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(currentImg, 0, 0);

    if (name) {
        const maxWidth = canvas.width * 0.63;  // 85% Banner-Breite
        const maxFontSize = 80;
        const minFontSize = 40;

        // Font-Size auto-anpassen
        let fontSize = maxFontSize;
        ctx.font = `bold ${fontSize}px Orbitron, sans-serif`;
        let textWidth = ctx.measureText(name).width;

        while (textWidth > maxWidth && fontSize > minFontSize) {
            fontSize -= 1;
            ctx.font = `bold ${fontSize}px Orbitron, sans-serif`;
            textWidth = ctx.measureText(name).width;
        }

        // Text rendern mit passender Größe
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 2.5;
        ctx.fillStyle = '#f8f8f8';
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetY = 2;

        const y = canvas.height * 0.097;
        ctx.strokeText(name, canvas.width / 2, y);
        ctx.fillText(name, canvas.width / 2, y);
    }
}


function generateBanner() {
    const name = playerNameInput.value.trim();
    if (!name) {
        alert('Please enter a player name!');
        return;
    }
    const bannerType = bannerTypeSelect.value;
    const filename = `${bannerType}_${name}.png`;

    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.download = filename;
    downloadLink.textContent = `Download ${filename}`;
    downloadLink.style.display = 'inline-block';
    downloadLink.focus(); // Trigger download prompt
}

bannerTypeSelect.onchange = function() {
    loadBannerImage(this.value);
};
