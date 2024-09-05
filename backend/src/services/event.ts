import Event from '../models/Event.js'
import User from '../models/User.js'

const getById = async (user: User, id: number) => {
  return await Event.findAll({
    where: { owner_id: user.id, id: id }
  })
}

const deleteById = async (user: User, id: number) => {
  return await Event.destroy({
    where: { owner_id: user.id, id: id }
  })
}

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

export { getById, deleteById, getAll, create }
