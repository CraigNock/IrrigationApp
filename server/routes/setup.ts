import * as express from 'express';

const router = express.Router()
  .get('/setup/env', (req : express.Request, res : express.Response) : void => {
    console.log('variable-name')
    res.status(200).json({
      status: 200,
      test :'ff'
    })
  })

export default router;