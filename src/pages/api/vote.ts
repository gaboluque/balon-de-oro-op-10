// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Votes} from "./resultsModel";

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === 'POST') {
      const { document, nominee } = req.body;

      const {status, message} = Votes.instance.addVote(document, nominee);

      res.status(status).json({ message });

    } else {
      res.status(400).end();
    }
  } catch (e) {
    res.status(500).end();
  }
}
