// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Votes } from "./resultsModel";

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === 'POST') {
      const { vote } = req.body;

      const { status, message } = await Votes.instance.addVote(vote);

      res.status(status).json({ message });

    } else {
      res.status(400).end();
    }
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
}
