var express = require('express');
var router = express.Router();
var db = require('../models/index');

/* GET users listing. */
router.get('/', function (req, res, next) {
  db.User.findAll().then(users => {
    var data = {
      title: 'Users/Index',
      content: users
    }
    res.render('users/index', data);
  });
});

/* 新規作成 */
router.get('/add', function (req, res, next) {
  var data = {
    title: 'Users/Add',
    user: new db.User(),
    err: null
  }
  res.render('users/add', data);
});
router.post('/add', function (req, res, next) {
  var user = {
    name: req.body.name,
    pass: req.body.pass,
    mail: req.body.mail,
    age: req.body.age,
  };
  db.sequelize.sync()
    .then(() => db.User.create(user).then(user => {
      res.redirect('/users');
    })
      .catch(err => {
        var data = {
          title: 'Users/Add',
          user: user,
          err: err
        }
        res.render('users/add', data);
      })
    );
});

/* 編集 */
router.get('/:id/edit', async function (req, res, next) {
  var user = await db.User.findByPk(req.params.id);
  var data = {
    title: 'Users/Edit',
    user: user,
    form: new db.User(),
    err: null
  }
  if (user) {
    res.render('users/edit', data);
  } else {
    res.redirect('/users');
  }
});

router.post('/:id/edit', async function (req, res, next) {
  var user = {
    id: req.params.id,
    name: req.body.name,
    pass: req.body.pass,
    mail: req.body.mail,
    age: req.body.age,
  }
  try {
    await db.sequelize.sync();

    await db.User.update(user, {
      where: { id: req.params.id }
    });

    res.redirect('/users');
  } catch (err) {
    var data = {
      title: 'Users/Edit',
      user: user,
      err: err
    }
    res.render('users/edit', data);
  }
});


/* 削除 */
router.get('/:id/delete', async function (req, res, next) {
  var user = await db.User.findOne({
    where: { id: req.params.id }
  });
  if (!user) return res.status(404).send('User not found');
  var data = {
    title: 'Users/Delete',
    user: user
  }
  res.render('users/delete', data);
});

router.post('/:id/delete', async function (req, res, next) {
  await db.User.destroy({
    where: { id: req.params.id }
  });
  res.redirect('/users');
});

module.exports = router;
