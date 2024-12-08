var posts=["33755/","42497/","1243066710/","000001/","4/","10813/","1/","56827/","2/","42850/","3/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };