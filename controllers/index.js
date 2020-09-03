exports.home = (req, res) => {
    res.send("Hello 👋 Welcome to Team-045a-Backend!");
};

exports.register_get = (req, res)=>{
  res.render('register', {title: 'Join Our Fundme community', message: 'Become a donor or raise funds'});
}

exports.register_post = (req, res)=> {

}