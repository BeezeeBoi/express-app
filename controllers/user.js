const bcrypt = require('bcryptjs');
const db = require('./knexConfig');

const createNewUser = async (email, name, password) => {
  let user = {
    email: null,
    name: null,
    created: null
  };
  await bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err1, hash1) => {
      db.transaction(trx => {
        let userCreatedDate = new Date();
        user.created = userCreatedDate;
        trx.insert({
          email: email,
          name: name,
          created: userCreatedDate
        })
          .into('users').withSchema('client')
          .returning('email')
          .then(loginEmail => {
            if (loginEmail[0].email) {
              trx.insert({
                hash: hash1,
                email: loginEmail[0].email
              })
                .into('login').withSchema('client')
                .returning('*')
                .then(user => trx.commit(user));
            }
          });
      })
        .then(() => {
          user.name = name;
          user.email = email;
          return user;
        })
        .catch(err => console.log(err));
    });
  });
};

function getUser(email, password) {
  let userPassword = db.select('email')
    .from('login')
    .withSchema('client')
    .returning('hash')
    .then(user => {
      bcrypt.compare(password, user[0].hash).then(result => {
        return !result ? false : true;
      });
    });
  // bcrypt.compare(password, userPassword);
}

function validateUser(email) {
  let test = [];


  db.select('*')
    .from('users')
    .where('email', '=', email)
    .withSchema('client')
    .then(user => {
      const result = user.length;
      console.log(`result: ${result}`);
      return result !== 1;
    })
    .catch(err => console.log(err));
}

module.exports = {
  createNewUser,
  getUser,
  validateUser
};