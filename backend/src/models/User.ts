import { DataTypes, Model } from 'sequelize'
import ORM from '../data/ORM.js'

interface UserAttributes {
  id?: number
  username: string
  hashed_password: Buffer
  salt: Buffer
  name?: string
  email?: string
  emailVerified?: number
}

class User extends Model<UserAttributes> implements UserAttributes {
  declare id: number
  declare username: string
  declare hashed_password: Buffer
  declare salt: Buffer
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
