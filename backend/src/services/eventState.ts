import EventStateModel from '../models/EventState.js'

const getAll = async () => {
  return await EventStateModel.findAll()
}

export { getAll }
