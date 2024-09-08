import { DataTypes } from 'sequelize'
import ORM from '../data/ORM.js'
import Event from './Event.js'

const Image = ORM.define('Image', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Event,
      key: 'id'
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

const ImageSource = ORM.define('ImageSource', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  image_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Image,
      key: 'id'
    }
  },
  filepath: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  width: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  height: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

export default Image
export { ImageSource }
