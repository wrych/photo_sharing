import express from 'express'
import * as EventState from '../../services/eventState.js'
import * as Event from '../../services/event.js'
import { ensureAuthenticated } from './auth.js'

const eventRouter = express.Router()

eventRouter.get('/', ensureAuthenticated, async (req, res) => {
  const events = await Event.getAll(req.user)
  res.status(200).json({
    value: events.map((e: Event) => ({ value: e }))
  })
})

eventRouter.post('/new', ensureAuthenticated, async (req, res) => {
  const newEvent = await Event.create(req.user, req.body.title)
  res.status(201).json({
    value: newEvent
  })
})

eventRouter.get('/states', async (req, res) => {
  const eventStates = await EventState.getAll()
  res.status(200).json({
    value: eventStates.map((es: EventState) => ({ value: es }))
  })
})

eventRouter.get('/:id', ensureAuthenticated, async (req, res) => {
  const event = await Event.getById(req.user, req.params.id)
  res.status(200).json({
    value: event
  })
})

eventRouter.delete('/:id', ensureAuthenticated, async (req, res) => {
  const event = await Event.deleteById(req.user, req.params.id)
  res.status(200).json({
    value: 'deleted'
  })
})

export default eventRouter
