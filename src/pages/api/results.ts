// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Votes} from "./resultsModel";

type Data = {
  results: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === 'GET') {
      const results = Votes.instance.getResults();

      res.status(200).json({ results });

    } else {
      res.status(400).end();
    }
  } catch (e) {
    res.status(500).end();
  }
}
