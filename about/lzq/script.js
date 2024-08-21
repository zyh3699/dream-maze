function updateTextBox(section) {
    // 获取文本框元素
    var textBox = document.getElementById("text-box");

    // 根据所点击的按钮，更新文本框内容
    switch(section) {
        case 'home':
            textBox.innerHTML = `
                <h1 style="color: #84d6d5; font-size: 45px;">欢迎来到我的个人主页！</h1>
                <img src="lzq.jpg" alt="Home Image" style="position: absolute; top: 30px; right: 30px; width: 300px; height: auto;">
                <p style="font-size: 25px;text-indent:2em;font-family:楷体;">在这里你可以了解我的个人介绍、兴<br />趣爱好以及联系方式。</p>
            `;
            break;
        case 'about':
            textBox.innerHTML = `
                <h1 style="color: #84d6d5; font-size: 45px;text-align:center">个人介绍</h1>
                <p style="text-align: left;font-size: 25px;text-indent:2em;font-family:楷体;">大家好！我是李泽群，特立书院23级学生，专业是计算机科学与技术。
                我在六元一次方程组中担任组长、项目经理和策划，主要负责网页制作、游戏设计等工作。
                在小学期中，我学习了HTML、CSS、JavaScript的知识，与小组成员一起制作了这个带有科幻、悬疑元素的故事，希望大家喜欢。
              </p>
            `;
            break;
        case 'hobbies':
            textBox.innerHTML = `
                <h1 style="color: #84d6d5; font-size: 45px;text-align:center">兴趣爱好</h1>
                
                <p style="text-align: left;font-size: 25px;font-family:楷体;">平日里，我喜欢骑行和打篮球，也喜欢挑一本书一坐一下午。<br />游戏方面，我各种游戏都有所涉猎，但都不算高手。
                <br />若是时间充裕，我喜欢旅行，造访名山大川，希望足迹能遍布全国各地。</p>
            `;
            break;
        case 'contact':
            textBox.innerHTML = `
                <h1 style="color: #84d6d5; font-size: 45px;text-align:center">联系方式</h1>
                <p style="text-align: left;font-size: 25px;font-family:楷体;">你可以通过以下方式联系我：</p>
                <ul style="text-align: left;">
                    <li style="font-size: 25px;"><strong>电子邮件</strong>: 2028632217@qq.com</li>
                    <li style="font-size: 25px;"><strong>电话</strong>: 18078342424</li>
                    <li style="font-size: 25px;"><strong>微信</strong>: 2028632217</li>
                </ul>
            `;
            break;
       
    }
}
