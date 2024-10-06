import { Sequelize } from 'sequelize'
import fs from 'fs'
import { rootPath } from '../meta.js'
import path from 'path'

let ORM!: Sequelize
switch (process.env.DB_DIALECT) {
  case 'sqlite':
    const sqlitePath: string = process.env.DB_FILE
      ? path.resolve(process.env.DB_FILE)
      : path.join(rootPath, 'var', 'db', 'db.sqlite')
    fs.mkdirSync(sqlitePath, { recursive: true })
    ORM = new Sequelize({
      dialect: 'sqlite',
      storage: sqlitePath,
      logging: false
    })
    break
  case 'mysql':
    const dbUser = process.env.DB_USER
    const dbPassword = process.env.DB_PW
    const dbName = process.env.DB_NAME
    const dbHost = process.env.DB_HOST
    const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306
    if (!dbUser || !dbPassword || !dbName || !dbHost) {
      throw new Error('Please set db parameters in your .env file')
    }
    ORM = new Sequelize({
      dialect: 'mysql',
      host: dbHost,
      port: dbPort,
      username: dbUser,
      password: dbPassword,
      database: dbName
    })
    break
}

export default ORM
