import { DataTypes } from 'sequelize'
import ORM from '../data/ORM.js'

const EventState = ORM.define('EventState', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderRank: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false
  },
  label: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

const setupEventStates = async () => {
  await EventState.create({
    orderRank: 0,
    label: 'draft'
  })
  await EventState.create({
    orderRank: 1,
    label: 'coming soon'
  })
  await EventState.create({
    orderRank: 2,
    label: 'active'
  })
  await EventState.create({
    orderRank: 3,
    label: 'ended'
  })
  await EventState.create({
    orderRank: 4,
    label: 'archived'
  })
}

export default EventState
export { setupEventStates }
