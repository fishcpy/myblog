        // 设置倒计时的目标日期
        var countDownDate = new Date("September 6, 2034 00:00:00").getTime();

        // 更新倒计时每秒
        var x = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;

            // 计算天、小时、分钟和秒
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // 显示结果
            document.getElementById("countdown").innerHTML = days + "天 " + hours + "小时 "
            + minutes + "分钟 " + seconds + "秒 ";

            // 如果倒计时结束，显示消息
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("countdown").innerHTML = "你发现了彩蛋";
            }
        }, 1000);