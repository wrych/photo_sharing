import ORM from './data/ORM.js'
import Migration, { MigrationSteps } from './models/Migrations.js'
import { setupEventStates } from './models/EventState.js'
import { registerUser } from './services/user.js'

const syncDatabase = async () => {
  console.log('Syncing database...')
  try {
    await ORM.sync({ alter: true })
  } catch (error) {
    console.error('Error creating database tables:', error)
  }
}

const markMigrationComplete = async (): Promise<void> => {
  await Migration.create({
    migrationName: MigrationSteps.initial,
    completedAt: new Date()
  })
}

const setupAlice = async (): Promise<void> => {
  try {
    registerUser('alice', 'letmein')
    console.log('User Alice has been set up.')
  } catch (error) {
    console.error('Error setting up user Alice:', error)
  }
}

const runInitialSetup = async (env: string): Promise<void> => {
  const existingMigration = await Migration.findOne({
    where: { migrationName: MigrationSteps.initial }
  })

  if (!existingMigration) {
    console.log('Running initial setup...')

    await setupEventStates()
    if (env === 'development') await setupAlice()

    await markMigrationComplete()

    console.log('Initial setup completed.')
  } else {
    console.log('Initial setup already completed, skipping.')
  }
}

export default syncDatabase
export { runInitialSetup }
