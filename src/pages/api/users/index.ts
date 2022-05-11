import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  const users = [
    {
      id: '1',
      name: 'John Doe',
    },
    {
      id: '2',
      name: 'Jane Doe',
    },
    {
      id: '3',
      name: 'Jack Doe',
    }
  ]

  return res.json(users)
}