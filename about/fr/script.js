document.addEventListener('DOMContentLoaded', function() {
    const starCount = 1100; // 星星的数量
    const starfield = document.getElementById('starfield');

    // 生成星星
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        starfield.appendChild(star);
    }

    // 鼠标移动时驱散星星
    document.addEventListener('mousemove', function(e) {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            const rect = star.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) { // 如果距离小于100像素
                star.style.transform = `translate(${dx * 0.1}px, ${dy * 0.1}px)`;
                star.style.opacity = 0;
                setTimeout(() => {
                    star.style.transform = '';
                    star.style.opacity = '';
                }, 500);
            }
        });
    });

    alert('欢迎访问我的个人主页！');
});
