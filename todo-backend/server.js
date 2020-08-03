// server.js

// Credit to https://github.com/sguduguntla/Todo-API-Mongo-NodeJS

// get /api/users              获取所有用户
// post /api/register          用户注册
// post /api/login             用户登录
// get /api/profile            获取用户信息

// get /api/todos              获取当前用户所有Todos
// post /api/todos             创建Todo(name,complete)
// delete /api/todos/:id       删除Todo(_id)


const { User } = require('./models/user')

// 解决跨域
const cors = require('cors');

// 引入 express
const express = require('express')
// 创建服务器应用程序
const app = express()
app.use(cors());

const jwt = require('jsonwebtoken')
const Todo = require('./models/todo')
const { isValidObjectId } = require('mongoose')
const {
  ObjectId
} = require("mongodb");

const SECRET = 'asdfbqwersd'
app.use(express.json())

app.listen(3001, () => {
  console.log('http://localhost:3001')
})

// 获取所有用户
app.get('/api/users', async (req, res) => {
  const users = await User.find()
  res.send(users)
})

// 用户注册
app.post('/api/register', async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
  })
  res.send(user)
})

// 用户登录
app.post('/api/login', async (req, res) => {
  const user = await User.findOne({
    username: req.body.username
  })

  if (!user) {
    return res.status(422).send({
      message: '用户名不存在'
    })
  }

  const isPasswordValid = require('bcrypt').compareSync(
    req.body.password,
    user.password
  )

  if (!isPasswordValid) {
    return res.status(422).send({
      message: '密码无效'
    })
  }

  // 生成token
  
  const token = jwt.sign({
    id: String(user._id),
  }, SECRET)

  res.send({
    user,
    token: token
  })
})

const auth = async(req, res, next) => {
  const raw = String(req.headers.authorization).split(' ').pop()
  const {id} = jwt.verify(raw, SECRET)
  req.user = await User.findById(id)

  next()
}

// 获取用户个人信息
app.get('/api/profile', auth, async(req, res) => {
  res.send(req.user)
})

// 添加Todo
app.post('/api/todos', auth, async(req, res) => {
  const todo = await Todo.create({
    name: req.body.name,
    complete: req.body.complete,
    creator: req.user.username,
  })

  res.send(req.body)
})

// 获取Todos
app.get('/api/todos', auth, async(req, res) => {
  Todo.find({
    creator: req.user.username
  }).then(todos => {
    res.send({
      todos
    });
  }).catch(e => {
    res.status(400).send(e);
  })
})

// 更新Todo
app.post('/api/todo', auth, async(req, res) => {
  var todoId = req.body._id;
  var newComplete = req.body.complete;

  Todo.findOneAndUpdate(
    {
      _id: todoId,
    },
    {
      $set: {complete: newComplete}
    },
    {new: true}
  ).then(todo => {
    return res.send({
      todo
    });
  })
})

// 删除Todos
app.delete('/api/todos/:id', auth, async(req, res) => {

  var todoId = req.params.id;

  if (ObjectId.isValid(todoId)) {
    Todo.findOneAndRemove({
        _id: todoId,
    }).then(todo => {
        if (!todo) {
            return res.status(404).send();
        }

        return res.send({
            todo
        });
    });
  } else {
      return res.status(400).send();
  }
})