import express from 'express'
import EventState from '../../models/EventState.js'

const eventRouter = express.Router()

eventRouter.get('/states', async (req, res) => {
  const eventStates = await EventState.findAll()
  res.status(200).json({ value: eventStates })
})

export default eventRouter
