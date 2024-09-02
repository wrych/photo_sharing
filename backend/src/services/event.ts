import Event from '../models/Event.js'
import User from '../models/User.js'

const getAll = async (user: User) => {
  return await Event.findAll({
    where: { owner_id: user.id }
  })
}

const create = async (user: User, title: string): Promise<Event> => {
  return await Event.create({
    owner_id: user.id,
    title: title
  })
}

export { getAll, create }
