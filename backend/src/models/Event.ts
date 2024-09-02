import { DataTypes } from 'sequelize'
import ORM from '../data/ORM.js'
import User from './User.js'
import EventState from './EventState.js'

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
  event_state: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: EventState,
      key: 'id'
    },
    defaultValue: 1
  }
})

export default Event
