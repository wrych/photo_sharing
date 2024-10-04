import { DataTypes, Model } from 'sequelize'
import ORM from '../data/ORM.js'

export interface EventStateAttributes {
  id?: number
  orderRank: number
  label: string
}

class EventState
  extends Model<EventStateAttributes>
  implements EventStateAttributes
{
  declare id: number
  declare orderRank: number
  declare label: string
}

EventState.init(
  {
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
  },
  {
    sequelize: ORM,
    modelName: 'EventState'
  }
)

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
