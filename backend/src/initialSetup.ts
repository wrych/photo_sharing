import argon2 from 'argon2'
import crypto from 'crypto'

import ORM from './data/ORM.js'
import User from './models/User.js'
import Migration, { MigrationSteps } from './models/Migrations.js'
import { setupEventStates } from './models/EventState.js'

async function bootStrap() {
  await syncDatabase()
  await setupAlice()
}

async function syncDatabase() {
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
    const salt = crypto.randomBytes(16)
    const hashedPassword = await argon2.hash('letmein', { salt, raw: true })

    await User.findOrCreate({
      where: { username: 'alice' },
      defaults: {
        username: 'alice',
        hashed_password: hashedPassword,
        salt: salt
      }
    })

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
