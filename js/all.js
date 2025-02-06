function doStuff() {
    var flag=0;
    try{
        ap=aplayers[0]; //aplayer对象的存放位置挺离谱的
        ap.list;
        flag=1;
    }catch{
        setTimeout(doStuff, 50);//等待aplayer对象被创建（没找到初始化实例的地方只能这样了，这个判断代码是StackOverflow上面扒的（因为自己是个蒟蒻
        return;
    }
    if(flag){
        ap.lrc.hide();//自带播放暂停时显隐歌词，可以删
        document.getElementsByClassName("aplayer-icon-menu")[0].click()
        if(localStorage.getItem("musicIndex")!=null){
            musicIndex = localStorage.getItem("musicIndex");
            ap.list.switch(musicIndex);
            //歌曲可以本地储存下次访问体验更好
        }
        if(sessionStorage.getItem("musicTime") != null){
            window.musict = sessionStorage.getItem("musicTime");
            ap.setMode(sessionStorage.getItem("musicMode"));
            if(sessionStorage.getItem("musicPaused")!='1'){
                ap.play();
            }
            // setTimeout(function(){
            //     ap.seek(window.musict); //seek炸了我很久，最后决定加个延时（本来要用canplay但是莫名鬼畜了）
            // },500);
            var g=true; //加个变量以防鬼畜但是不知道怎么节流qwq
            ap.on("canplay",function(){
                if(g){
                    ap.seek(window.musict);
                    g=false;//如果不加oncanplay的话会seek失败就这原因炸很久
                }
            });
        }else{
            sessionStorage.setItem("musicPaused",1);
            ap.setMode("mini"); //新版添加了保存展开状态功能
        }
        if(sessionStorage.getItem("musicVolume") != null){
            ap.audio.volume=Number(sessionStorage.getItem("musicVolume"));
        }
        ap.on("pause",function(){sessionStorage.setItem("musicPaused",1);ap.lrc.hide()});//原基础上加了个检测暂停免得切换页面后爆零(bushi)（指社死）
        ap.on("play",function(){sessionStorage.setItem("musicPaused",0);ap.lrc.show()});//自带播放暂停时显隐歌词，后面那句可以删，上同
        ap.audio.onvolumechange=function(){sessionStorage.setItem("musicVolume",ap.audio.volume);};//新版增加保存音量免得切换页面爆零（doge
        setInterval(function(){
            musicIndex = ap.list.index;
            musicTime = ap.audio.currentTime;
            localStorage.setItem("musicIndex",musicIndex);
            //保存播放进度
            sessionStorage.setItem("musicTime",musicTime);
            sessionStorage.setItem("musicMode",ap.mode);
            //保存展开状态
        },50);//节流，200ms精度感知不大qwq
    }
}
doStuff();

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







