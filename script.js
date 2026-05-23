const chtxt = document.getElementById('chTxt');
const chWords = [
    { text: 'Elements', icon: '<i class="fa-solid fa-fire"></i>', bg: 'rgba(247, 160, 50, 0.15)' },
    { text: 'Spirits', icon: '<i class="fa-solid fa-ghost"></i>', bg: 'rgba(160, 130, 247, 0.15)' },
    { text: 'Elite Mobs', icon: '<i class="fa-solid fa-skull-crossbones"></i>', bg: 'rgba(247, 80, 80, 0.15)' },
    { text: 'Avatar', icon: '<i class="fa-solid fa-hat-wizard"></i>', bg: 'rgba(80, 130, 247, 0.15)' },
];
let chTxtIndex = 0;

function buildHTML(item) {
    return `${item.icon} ${item.text}`;
}

function measureContent(html) {
    const measure = document.createElement('span');
    const styles = window.getComputedStyle(chtxt);
    measure.style.font = styles.font;
    measure.style.letterSpacing = styles.letterSpacing;
    measure.style.padding = '0 12px';
    measure.style.visibility = 'hidden';
    measure.style.position = 'absolute';
    measure.style.whiteSpace = 'nowrap';
    measure.style.display = 'inline-flex';
    measure.style.alignItems = 'center';
    measure.style.gap = '8px';
    measure.innerHTML = html;
    document.body.appendChild(measure);
    const width = measure.offsetWidth;
    document.body.removeChild(measure);
    return width;
}

window.addEventListener('DOMContentLoaded', () => {
    const firstHTML = buildHTML(chWords[0]);
    chtxt.innerHTML = firstHTML;
    chtxt.style.width = measureContent(firstHTML) + 'px';
    chtxt.style.backgroundColor = chWords[0].bg;
    chtxt.classList.add('fade-in');

    setInterval(() => {
        chtxt.classList.remove('fade-in');
        chtxt.classList.add('fade-out');

        setTimeout(() => {
            chTxtIndex = (chTxtIndex + 1) % chWords.length;
            const item = chWords[chTxtIndex];
            const nextHTML = buildHTML(item);

            chtxt.style.width = measureContent(nextHTML) + 'px';
            chtxt.style.backgroundColor = item.bg;
            chtxt.innerHTML = nextHTML;

            // Fade in
            chtxt.classList.remove('fade-out');
            chtxt.classList.add('fade-in');
        }, 300);
    }, 2500);
});



function copy(text) {
    navigator.clipboard.writeText(text);

    showToast('<i class="fas fa-check"></i> Copied play.elementrix.it.')

}
function showToast(toastMsg) {
    if (document.querySelector('.toast')) return;
    const toast = document.createElement('div');
    toast.classList.add('toast')

    toast.innerHTML = toastMsg;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-hide');
        setTimeout(() => {
            toast.remove();
        }, 5000);

    }, 5000);

}
