import { DataTypes, Model } from 'sequelize'
import ORM from '../data/ORM.js'
import Event from './Event.js'
import { imageRouter } from '../routes/api/image.js'

export interface ImageAttributes {
  id?: number
  event_id: number
  description: string
}

class Image extends Model<ImageAttributes> implements ImageAttributes {
  declare id: number
  declare event_id: number
  declare description: string
}

Image.init(
  {
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
  },
  {
    sequelize: ORM,
    modelName: 'Image'
  }
)

export interface ImageSourceAttributes {
  id?: number
  image_id: number
  filename: string
  filepath: string
  width: number
  height: number
  format: string
  size: number
  is_original: boolean
}

class ImageSource
  extends Model<ImageSourceAttributes>
  implements ImageSourceAttributes
{
  declare id: number
  declare image_id: number
  declare filename: string
  declare filepath: string
  declare width: number
  declare height: number
  declare format: string
  declare size: number
  declare is_original: boolean
}

ImageSource.init(
  {
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
    filename: {
      type: DataTypes.TEXT,
      allowNull: false
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
  },
  {
    sequelize: ORM,
    modelName: 'ImageSource'
  }
)

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
  image_sources: {value: ImageSourceDTO}[]
}

export default Image
export { ImageSource, ImageDTO, ImageSourceDTO }
