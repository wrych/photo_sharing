import { DataTypes, Model } from 'sequelize'
import ORM from '../data/ORM.js'

interface UserAttributes {
  id?: number
  username: string
  hashedPassword: string
  salt: string
  name?: string
  email?: string
  emailVerified?: number
}

class User extends Model<UserAttributes> implements UserAttributes {
  declare id: number
  declare username: string
  declare hashedPassword: string
  declare salt: string
  declare name: string
  declare email: string
  declare emailVerified: number
}

User.init(
  {
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
    hashedPassword: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    salt: {
      type: DataTypes.TEXT
    },
    name: {
      type: DataTypes.TEXT
    },
    email: {
      type: DataTypes.TEXT,
      unique: true
    },
    emailVerified: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize: ORM,
    modelName: 'User'
  }
)

export default User
