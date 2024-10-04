import { DataTypes, Model } from 'sequelize'
import ORM from '../data/ORM.js'
import User from './User.js'
import EventState from './EventState.js'

export interface EventAttributes {
  id?: number
  owner_id: number
  title: string
  event_state?: number
}

class Event extends Model<EventAttributes> implements EventAttributes {
  declare id: number
  declare owner_id: number
  declare title: string
  declare event_state: number
}

Event.init(
  {
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
  },
  {
    sequelize: ORM,
    modelName: 'Event'
  }
)

export default Event
