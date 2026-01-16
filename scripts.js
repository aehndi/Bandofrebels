const canvas = document.getElementById('bannerCanvas');
const ctx = canvas.getContext('2d');
const downloadLink = document.getElementById('downloadLink');
const playerNameInput = document.getElementById('playerName');
const bannerTypeSelect = document.getElementById('bannerType');

function generateBanner() {
    const name = playerNameInput.value.trim();
    if (!name) {
        alert('Please enter a player name!');
        return;
    }
    const bannerType = bannerTypeSelect.value;

    const img = new Image();
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Text settings: bold steampunk glow
        ctx.font = 'bold 80px Orbitron, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#ff4500';
        ctx.shadowBlur = 20;

        const bannerW = canvas.width;
        const bannerH = canvas.height;
        const y = bannerH * 0.18; // Top position

        // Multi-layer glow
        for (let i = 0; i < 5; i++) {
            ctx.shadowBlur = 20 + i * 5;
            ctx.shadowColor = `rgba(255, 215, 0, ${0.3 - i * 0.05})`;
            ctx.strokeText(name, bannerW / 2, y);
            ctx.fillText(name, bannerW / 2, y);
        }

        // Solid text
        ctx.shadowBlur = 0;
        ctx.strokeText(name, bannerW / 2, y);
        ctx.fillText(name, bannerW / 2, y);

        canvas.style.display = 'block';
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.download = `${bannerType}_${name}.png`;
        downloadLink.textContent = 'Download Banner';
        downloadLink.style.display = 'inline-block';
    };
    img.src = `${bannerType}.jpg`;
}
