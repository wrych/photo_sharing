import { DataTypes } from 'sequelize'
import ORM from '../data/ORM.js'

const User = ORM.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false
  },
  hashed_password: {
    type: DataTypes.BLOB,
    allowNull: false
  },
  salt: {
    type: DataTypes.BLOB,
    allowNull: false
  },
  name: {
    type: DataTypes.TEXT
  },
  email: {
    type: DataTypes.TEXT,
    unique: true
  },
  email_verified: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
})

export default User
