import { DataTypes } from 'sequelize'
import ORM from '.../data/ORM.js'
import User from './User.js'

const Event = ORM.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  completed: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
})

export default Event
