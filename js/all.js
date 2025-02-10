//IE浏览器不支持提示

  function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var IEVersion;
        IEVersion = parseFloat(RegExp["$1"]);
        if (IEVersion == 7) {
          return 7;
        } else if(IEVersion == 8) {
          return 8;
        } else if(IEVersion == 9) {
          return 9;
        } else if(IEVersion == 10) {
          return 10;
        } else {
          return 6;//IE版本<=7
        }
    } else if(isEdge) {
      return 'edge';//edge
    } else if(isIE11) {
      return 11; //IE11
    }else{
      return -1;//不是ie浏览器
    }
  }
var isIE = IEVersion();
    if (isIE == "6" || isIE == "7" || isIE == "8" || isIE == "9" || isIE == "10" || isIE == "11" ){//判断当前是否是IE浏览器
      window.location = "/kernel.html";//如果是IE内核跳转至kernel.html
  }


//枫叶飘动效果

var stop, staticx;
var img = new Image();
img.src = "https://img.cdn.nesxc.com/2022/02/202202251325420webp";

function Sakura(x, y, s, r, fn) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.r = r;
    this.fn = fn
}
Sakura.prototype.draw = function(cxt) {
    cxt.save();
    var xc = 20 * this.s / 2;
    cxt.translate(this.x, this.y);
    cxt.rotate(this.r);
    cxt.drawImage(img, 0, 0, 20 * this.s, 20 * this.s);
    cxt.restore()
};
Sakura.prototype.update = function() {
    this.x = this.fn.x(this.x, this.y);
    this.y = this.fn.y(this.y, this.y);
    this.r = this.fn.r(this.r);
    if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
        this.r = getRandom("fnr");
        if (Math.random() > 0.4) {
            this.x = getRandom("x");
            this.y = 0;
            this.s = getRandom("s");
            this.r = getRandom("r")
        } else {
            this.x = window.innerWidth;
            this.y = getRandom("y");
            this.s = getRandom("s");
            this.r = getRandom("r")
        }
    }
};
SakuraList = function() {
    this.list = []
};
SakuraList.prototype.push = function(sakura) {
    this.list.push(sakura)
};
SakuraList.prototype.update = function() {
    for (var i = 0, len = this.list.length; i < len; i++) {
        this.list[i].update()
    }
};
SakuraList.prototype.draw = function(cxt) {
    for (var i = 0, len = this.list.length; i < len; i++) {
        this.list[i].draw(cxt)
    }
};
SakuraList.prototype.get = function(i) {
    return this.list[i]
};
SakuraList.prototype.size = function() {
    return this.list.length
};

function getRandom(option) {
    var ret, random;
    switch (option) {
        case "x":
            ret = Math.random() * window.innerWidth;
            break;
        case "y":
            ret = Math.random() * window.innerHeight;
            break;
        case "s":
            ret = Math.random();
            break;
        case "r":
            ret = Math.random() * 4;
            break;
        case "fnx":
            random = -0.5 + Math.random() * 1;
            ret = function(x, y) {
                return x + 0.5 * random - 1.7
            };
            break;
        case "fny":
            random = 1.5 + Math.random() * 0.7;
            ret = function(x, y) {
                return y + random
            };
            break;
        case "fnr":
            random = Math.random() * 0.03;
            ret = function(r) {
                return r + random
            };
            break
    }
    return ret
}

function startSakura() {
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
    var canvas = document.createElement("canvas"),
        cxt;
    staticx = true;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.setAttribute("style", "position: fixed;left: 0;top: 0;pointer-events: none;");
    canvas.setAttribute("id", "canvas_sakura");
    document.getElementsByTagName("body")[0].appendChild(canvas);
    cxt = canvas.getContext("2d");
    var sakuraList = new SakuraList();
    for (var i = 0; i < 50; i++) {
        var sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny;
        randomX = getRandom("x");
        randomY = getRandom("y");
        randomR = getRandom("r");
        randomS = getRandom("s");
        randomFnx = getRandom("fnx");
        randomFny = getRandom("fny");
        randomFnR = getRandom("fnr");
        sakura = new Sakura(randomX, randomY, randomS, randomR, {
            x: randomFnx,
            y: randomFny,
            r: randomFnR
        });
        sakura.draw(cxt);
        sakuraList.push(sakura)
    }
    stop = requestAnimationFrame(function() {
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        sakuraList.update();
        sakuraList.draw(cxt);
        stop = requestAnimationFrame(arguments.callee)
    })
}
window.onresize = function() {
    var canvasSnow = document.getElementById("canvas_snow")
};
img.onload = function() {
    startSakura()
};

function stopp() {
    if (staticx) {
        var child = document.getElementById("canvas_sakura");
        child.parentNode.removeChild(child);
        window.cancelAnimationFrame(stop);
        staticx = false
    } else {
        startSakura()
    }
};







