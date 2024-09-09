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
  },
  format: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_original: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

Image.hasMany(ImageSource, { foreignKey: 'image_id', as: 'image_sources' })
ImageSource.belongsTo(Image, { foreignKey: 'image_id' })

interface ImageSourceDTO {
  id: number
  width: number
  height: number
  format: string
  size: number
  is_original: boolean
  href: string
}

interface ImageDTO {
  id: number
  event_id: number
  description: string
  image_sources: ImageSourceDTO[]
}

export default Image
export { ImageSource, ImageDTO, ImageSourceDTO }
