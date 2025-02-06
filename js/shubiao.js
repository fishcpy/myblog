        const largeCircle = document.getElementById('largeCircle');
        const smallCircle = document.getElementById('smallCircle');

        let isMouseDown = false;
        let isLargeCircleVisible = false;
        let mouseX = 0;
        let mouseY = 0;

        function setPosition(x, y) {
            const halfLargeCircleWidth = largeCircle.offsetWidth / 2;
            const halfSmallCircleWidth = smallCircle.offsetWidth / 2;

            // 设置小圆的位置
            smallCircle.style.left = `${x - halfSmallCircleWidth}px`;
            smallCircle.style.top = `${y - halfSmallCircleWidth}px`;

            // 设置大圆的位置，平滑过渡到小圆的位置
            largeCircle.style.left = `${x - halfLargeCircleWidth}px`;
            largeCircle.style.top = `${y - halfLargeCircleWidth}px`;

            // 根据鼠标按下状态调整圆的大小
            largeCircle.style.transform = isMouseDown ? 'scale(0.5)' : 'scale(1)';
            smallCircle.style.transform = isMouseDown ? 'scale(2)' : 'scale(1)';
        }

        // 更新悬停状态
        function updateHoverStatus(x, y) {
            const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, div, pre, code, input, textarea');
            let isHoveringText = Array.from(textElements).some(el => {
                const textNodes = Array.from(el.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
                return textNodes.some(node => {
                    const range = document.createRange();
                    range.selectNodeContents(node);
                    return Array.from(range.getClientRects()).some(rect =>
                        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
                    );
                });
            });

            // 处理 input 和 textarea 元素的 hover 状态
            const inputElements = document.querySelectorAll('input, textarea');
            isHoveringText = isHoveringText || Array.from(inputElements).some(el => {
                const rect = el.getBoundingClientRect();
                return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
            });

            // 根据是否悬停在文本上添加或移除 class
            document.body.classList.toggle('hovered', isHoveringText);
        }

        // 动画帧函数
        function animate() {
            setPosition(mouseX, mouseY);
            updateHoverStatus(mouseX, mouseY);

            if (!isLargeCircleVisible) {
                isLargeCircleVisible = true;
                largeCircle.style.display = 'block';
                smallCircle.style.display = 'block';
            }

            requestAnimationFrame(animate);
        }

        // 处理鼠标移动事件
        function handleMove(event) {
            mouseX = event.clientX;
            mouseY = event.clientY;

            if (!isLargeCircleVisible) {
                requestAnimationFrame(animate);
            }
        }

        // 监听鼠标事件
        document.addEventListener('mousemove', handleMove);

        document.addEventListener('mousedown', (event) => {
            isMouseDown = true;
            mouseX = event.clientX;
            mouseY = event.clientY;
            setPosition(mouseX, mouseY);
            largeCircle.classList.add('pulse'); // 按下时添加脉冲动画
        });

        document.addEventListener('mouseup', () => {
            isMouseDown = false;
            setPosition(mouseX, mouseY);
            largeCircle.classList.remove('pulse'); // 松开时移除脉冲动画
        });