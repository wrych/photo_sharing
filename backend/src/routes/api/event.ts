import express, { Request, Response } from 'express'
import * as eventStateService from '../../services/eventState.js'
import * as eventService from '../../services/event.js'
import { ensureAuthenticated } from './auth.js'
import Event from '../../models/Event.js'
import EventState from '../../models/EventState.js'
import User from '../../models/User.js'

const eventRouter = express.Router()

eventRouter.get('/', ensureAuthenticated, async (req, res) => {
  const events = await eventService.getAll(req.user as User)
  res.status(200).json({
    value: events.map((e: Event) => ({ value: e }))
  })
})

eventRouter.post('/new', ensureAuthenticated, async (req : Request, res: Response) => {
  const newEvent = await eventService.create(req.user as User, req.body.title)
  res.status(201).json({
    value: newEvent
  })
})

eventRouter.get('/states', async (req, res) => {
  const eventStates = await eventStateService.getAll()
  res.status(200).json({
    value: eventStates.map((es: EventState) => ({ value: es }))
  })
})

eventRouter.get('/:id', ensureAuthenticated, async (req, res) => {
  const event = await eventService.getById(req.user as User, parseInt(req.params.id))
  res.status(200).json({
    value: event
  })
})

eventRouter.delete('/:id', ensureAuthenticated, async (req, res) => {
  const event = await eventService.deleteById(req.user as User, parseInt(req.params.id))
  res.status(200).json({
    value: 'deleted'
  })
})

export default eventRouter
