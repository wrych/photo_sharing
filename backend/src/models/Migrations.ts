import { DataTypes, Model } from 'sequelize'
import ORM from '../data/ORM.js'

interface MigrationAttributes {
  id?: number
  migrationName: string
  completedAt: Date
}

class Migration
  extends Model<MigrationAttributes>
  implements MigrationAttributes
{
  declare id: number
  declare migrationName: string
  declare completedAt: Date
}
Migration.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    migrationName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize: ORM,
    modelName: 'Migration',
    tableName: 'migrations'
  }
)

const MigrationSteps = {
  initial: 'initial-migration'
}

export default Migration
export { MigrationSteps }
