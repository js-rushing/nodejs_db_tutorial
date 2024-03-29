// Where we write our knex queries
// const knex = require('knex')
// const config = require('../knexfile')
// const db = knex(config.development)
const db = require('../dbConfig')

// Lessons
async function add(lesson) {
  if (process.env.DB_ENVIRONMENT === 'development') {
    const { id } = await db('lessons').insert(lesson)

    return id
  } else if (process.env.DB_ENVIRONMENT === 'production') {
    return await db('lessons').insert(lesson, ['id', 'name'])
  }
}

function find() {
  return db('lessons')
}

function findById(id) {
  return db('lessons').where({ id: id }).first()
}

function remove(id) {
  return db('lessons').where({ id: id }).del()
}

function update(id, changes) {
  return db('lessons')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id)
    })
}

// Messages
function findLessonMessages(lesson_id) {
  return db('lessons as l')
    .join('messages as m', 'l.id', 'm.lesson_id')
    .select(
      'l.id as lessonID',
      'l.name as lessonName',
      'm.id as messageID',
      'm.sender',
      'm.text'
    )
    .where({ lesson_id })
}

function findMessageById(id) {
  return db('messages').where({ id: id }).first()
}

async function addMessage(message, lesson_id) {
  if (process.env.DB_ENVIRONMENT === 'development') {
    const { id } = await db('messages').where({ lesson_id }).insert(message)

    return message
  } else if (process.env.DB_ENVIRONMENT === 'production') {
    return await db('messages').where({ lesson_id }).insert(message, ['id'])
  }
}

// Remove message
function removeMessage(id) {
  return db('messages').where({ id }).del()
}

// USERS
// Add new user
function addUser(user) {
  return db('users').insert(user, ['id', 'username'])
}

// Find user by name
function findUserByUsername(username) {
  return db('users').where({ username }).first()
}

// Find all users
function findAllUsers() {
  return db('users')
}

module.exports = {
  add,
  find,
  findById,
  remove,
  update,
  findLessonMessages,
  findMessageById,
  addMessage,
  removeMessage,
  addUser,
  findUserByUsername,
  findAllUsers
}
