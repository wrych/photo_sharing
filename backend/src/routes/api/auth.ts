import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler
} from 'express'
import passport from 'passport'
import User from '../../models/User.js'

const authRouter = express.Router()

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).json({ message: 'Authorisation required.' }) // Unauthorized
}

authRouter.get('/state', (req: Request, res: Response) => {
  res
    .status(200)
    .json({ value: req.isAuthenticated() ? 'authorised' : 'unauthorised' })
})

authRouter.get('/user', ensureAuthenticated, (req: Request, res: Response) => {
  res.status(200).json({ value: req.user })
})

authRouter.post(
  '/login/password',
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: Error | null, user: User | false) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Unexpected error.' })
      }
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' })
      }

      req.logIn(user, (err: Error | null) => {
        if (err) {
          console.log(err)
          return res.status(500).json({ message: 'Unexpected error.' })
        }
        return res.status(200).json({ message: 'Log-in successful' })
      })
    })(req, res, next) as RequestHandler
  }
)

authRouter.post('/logout', function (req: Request, res: Response) {
  req.logout((err: Error) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ message: 'Unexpected error.' })
    }
    return res.status(200).json({ message: 'log-out successful' })
  })
})

export default authRouter
export { ensureAuthenticated }
