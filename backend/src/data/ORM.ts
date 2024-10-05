import { Sequelize } from 'sequelize'
import fs from 'fs'
import { rootPath } from '../meta.js'
import path from 'path'

fs.mkdirSync(path.join(rootPath, 'var', 'db'), { recursive: true })

const ORM = new Sequelize({
  dialect: 'sqlite',
  storage: 'var/db/todos.db',
  logging: false
})

export default ORM
