var posts=["33755/","42497/","1243066710/","000001/","4/","9688/","23139/","10813/","1/","56827/","2/","42850/","3/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"萌萌猫的小破站","link":"https://mengmengmao.cn","avatar":"https://mengmengmao.cn/img/1731233393-%E8%90%8C%E8%90%8C%E7%8C%AB-%E6%8A%A0%E5%9B%BE.png","descr":"萌萌猫的小破站"},{"name":"zyh的小破站","link":"https://zyh111.us.kg/","avatar":"https://zyh111.us.kg/tx.jpg","descr":"Who is minecraft？"},{"name":"张洪Heo","link":"https://blog.zhheo.com/","avatar":"https://bu.dusays.com/2022/12/28/63ac2812183aa.png","descr":"分享设计与科技生活"},{"name":"Akilarの糖果屋","link":"https://akilar.top/","avatar":"https://npm.elemecdn.com/akilar-friends@latest/avatar/akilar.top.jpg","descr":"期待您的光临！","siteshot":"https://npm.elemecdn.com/akilar-friends@latest/siteshot/akilar.top.jpg"},{"name":"梦爱吃鱼","link":"https://blog.bsgun.cn/","avatar":"https://oss-cdn.bsgun.cn/logo/avatar.256.png","descr":"但愿日子清静抬头遇见的满是柔情"},{"name":"Mo的记事簿","link":"https://blog.xiowo.net/","avatar":"https://blog.xiowo.net/img/avatar.png","descr":"万年鸽王，哈哈OvO","siteshot":"https://bu.dusays.com/2024/11/09/672f779669ef8.jpg"},{"name":"Hexo","link":"https://hexo.io/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"静态博客首选"},{"name":"Halo","link":"https://www.halo.run/","avatar":"https://www.halo.run/logo","descr":"强大易用的开源建站工具"},{"name":"WordPass","link":"https://wordpress.com/","avatar":"https://s.w.org/favicon.ico?2","descr":"强大易用的开源建站工具"},{"name":"cloudflare","link":"https://www.cloudflare-cn.com/","avatar":"https://www.cloudflare-cn.com/favicon.ico","descr":"赛博活佛"},{"name":"雨云","link":"https://www.rainyun.com/NDg5MzU2_","avatar":"https://app.rainyun.com/img/logo.d193755d.png","descr":"新一代的云服务提供商"},{"name":"哔哩哔哩","link":"https://www.bilibili.com/","avatar":"https://static.hdslb.com/mobile/img/512.png","descr":"良心的视频网站"},{"name":"mcbbs","link":"https://mcbbs.com/","avatar":null,"descr":"我的世界中文论坛"}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };