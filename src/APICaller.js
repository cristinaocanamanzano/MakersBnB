var APIConnector = require('./APIConnector.js');

function APICaller(rootURL, jquery, bcrypt, apiConnector) {
  this.rootURL = rootURL
  this.jquery = jquery;
  this.bcrypt = bcrypt;
  this.apiConnector = apiConnector
};

APICaller.prototype.sendNewUser = function(name, email, password) {
  this.apiConnector.connect('post', '/users', {name: name, email: email,
  password: this.hashPassword(password)})
  // this.jquery.post({
  //   url: this.rootURL,
  //   name: name,
  //   email: email,
  //   password: this.hashPassword(password)
  // });
};

APICaller.prototype.getUserFromDatabase = function(id) {
  this.apiConnector.connect("get", '/users' + `/${id}`);
  // return new Promise((resolve, reject) => {
  //   resolve(this.jquery.get(this.rootURL + id));
  // })
};

APICaller.prototype.queryUsers = function() {
  this.apiConnector.connect("get", '/users')
  // return new Promise((resolve, reject) => {
  //   resolve(this.jquery.get(this.rootURL));
  // })
};


APICaller.prototype.hashPassword = function (password){
  const salt = this.bcrypt.genSaltSync(10);
  return this.bcrypt.hashSync(password, salt);
};

APICaller.prototype.isLoginCorrect = function(email, password) {
  let allUsers = this.queryUsers()
  return output = allUsers.then(function(res) {
    for (i = 0; i < res.length; i += 1) {
      if (res[i].email === email && res[i].password === password) {
        return true
      };
    };
    return false
  })
};

APICaller.prototype.isEmailInUse = function(email) {
  let allUsers = this.queryUsers()
  return output = allUsers.then((res) => {
    for (i = 0; i < res.length; i += 1) {
      if (res[i].email === email) {
        return true
      };
    };
    return false
  })
};

APICaller.prototype.trySignUp = function(name, email, password) {
  return this.isEmailInUse(email).then((res) => {
    if (res === false) {
      this.sendNewUser(name, email, password)
      return true;
    }
    return false;
  })
}
// dd you give right user/pass
//
// authenticate user: check username and password
// store current user:

// Export node module.
if (typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = APICaller;
};
