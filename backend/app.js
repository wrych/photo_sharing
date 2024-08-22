import dotenv from 'dotenv'

import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import passport from 'passport'
import session from 'express-session'
import pluralize from 'pluralize'
import connectSessionSequelize from 'connect-session-sequelize'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

import apiRouter from './src/routes/api/api.js'
import authRouter from './src/routes/auth.js'
import ORM from './src/data/ORM.js'
import User from './src/models/User.js'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

app.locals.pluralize = pluralize

app.set('views', path.join(__dirname, './src/views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, './src/public')))
const SequelizeStore = connectSessionSequelize(session.Store)
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: ORM,
      checkExpirationInterval: 15 * 60 * 1000, // 15 minutes
      expiration: 24 * 60 * 60 * 1000 // 24 hours
    })
  })
)
app.use(passport.authenticate('session'))

app.use('/api', apiRouter)
app.use('/auth', authRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

async function bootStrap() {
  await syncDatabase()
  await setup_alice()
}

async function syncDatabase() {
  console.log('Syncing database...')
  try {
    await ORM.sync({ alter: true })
  } catch (error) {
    console.error('Error creating database tables:', error)
  }
}

async function setup_alice() {
  const salt = crypto.randomBytes(16)

  await crypto.pbkdf2('letmein', salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
    await User.findOrCreate({
      where: {
        username: 'alice'
      },
      defaults: {
        username: 'alice',
        hashed_password: hashedPassword,
        salt: salt
      }
    })
  })
}

bootStrap()

export default app
