// script.js
document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const fog = document.getElementById('fog');
    const step = 7;

    // 烟雾图片数组
    const smokeImages = [
        'img/Smoke/0000.png',
        'img/Smoke/0001.png','img/Smoke/0002.png','img/Smoke/0003.png','img/Smoke/0004.png',
        'img/Smoke/0005.png','img/Smoke/0006.png','img/Smoke/0007.png','img/Smoke/0008.png',
        'img/Smoke/0009.png','img/Smoke/0010.png','img/Smoke/0011.png','img/Smoke/0012.png',
        'img/Smoke/0013.png','img/Smoke/0014.png','img/Smoke/0015.png','img/Smoke/0016.png',
        'img/Smoke/0017.png','img/Smoke/0018.png','img/Smoke/0019.png','img/Smoke/0020.png',
        'img/Smoke/0021.png','img/Smoke/0022.png','img/Smoke/0023.png','img/Smoke/0024.png',
        'img/Smoke/0025.png','img/Smoke/0026.png','img/Smoke/0027.png','img/Smoke/0028.png',
        'img/Smoke/0029.png','img/Smoke/0030.png','img/Smoke/0031.png','img/Smoke/0032.png',
        'img/Smoke/0033.png','img/Smoke/0034.png','img/Smoke/0035.png','img/Smoke/0036.png',
        'img/Smoke/0037.png','img/Smoke/0038.png','img/Smoke/0039.png','img/Smoke/0040.png',
        'img/Smoke/0041.png','img/Smoke/0042.png','img/Smoke/0043.png','img/Smoke/0044.png',
        'img/Smoke/0045.png','img/Smoke/0046.png','img/Smoke/0047.png','img/Smoke/0048.png',
        'img/Smoke/0049.png','img/Smoke/0050.png','img/Smoke/0051.png','img/Smoke/0052.png',
        'img/Smoke/0053.png','img/Smoke/0054.png','img/Smoke/0055.png','img/Smoke/0056.png',
        'img/Smoke/0057.png','img/Smoke/0058.png','img/Smoke/0059.png','img/Smoke/0060.png',
        'img/Smoke/0061.png','img/Smoke/0062.png','img/Smoke/0063.png','img/Smoke/0064.png',
        'img/Smoke/0065.png','img/Smoke/0066.png','img/Smoke/0067.png','img/Smoke/0068.png',
        'img/Smoke/0069.png','img/Smoke/0070.png','img/Smoke/0071.png','img/Smoke/0072.png',
        'img/Smoke/0073.png','img/Smoke/0074.png','img/Smoke/0075.png','img/Smoke/0076.png',
        'img/Smoke/0077.png','img/Smoke/0078.png','img/Smoke/0079.png','img/Smoke/0080.png',
        'img/Smoke/0081.png','img/Smoke/0082.png','img/Smoke/0083.png','img/Smoke/0084.png',
        'img/Smoke/0085.png','img/Smoke/0086.png','img/Smoke/0087.png','img/Smoke/0088.png',
        'img/Smoke/0089.png','img/Smoke/0090.png'
        
    ];

    let currentImageIndex = 0;

    // 切换烟雾图片的函数
    function changeFogImage() {
        fog.style.backgroundImage = `url(${smokeImages[currentImageIndex]})`;
        currentImageIndex = (currentImageIndex + 1) % smokeImages.length;
    }

    // 设置每隔 3 秒切换一次背景图片
    setInterval(changeFogImage, 50);

    document.addEventListener('keydown', (e) => {
        let newTop = player.offsetTop;
        let newLeft = player.offsetLeft;

        switch (e.key) {
            case 'ArrowUp':
                newTop -= step;
                break;
            case 'ArrowDown':
                newTop += step;
                break;
            case 'ArrowLeft':
                newLeft -= step;
                break;
            case 'ArrowRight':
                newLeft += step;
                break;
        }

        if (newTop >= 0 && newTop <= fog.clientHeight - player.clientHeight &&
            newLeft >= 0 && newLeft <= fog.clientWidth - player.clientWidth) {

            player.style.top = `${newTop}px`;
            player.style.left = `${newLeft}px`;

            const fogX = newLeft;
            const fogY = newTop;

            fog.style.clipPath = `circle(20px at ${fogX + 5}px ${fogY + 5}px)`;
        }
    });
});
