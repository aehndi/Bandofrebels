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
        // Text settings: steampunk glow
        ctx.font = 'bold 80px Orbitron, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#ff4500';
        ctx.shadowBlur = 20;

        const y = canvas.height * 0.18;

        // Glow layers
        for (let i = 0; i < 5; i++) {
            ctx.shadowBlur = 20 + i * 5;
            ctx.shadowColor = `rgba(255, 215, 0, ${0.3 - i * 0.05})`;
            ctx.strokeText(name, canvas.width / 2, y);
            ctx.fillText(name, canvas.width / 2, y);
        }

        // Solid
        ctx.shadowBlur = 0;
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
