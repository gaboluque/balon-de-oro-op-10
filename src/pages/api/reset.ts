// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Votes} from "./resultsModel";

type Data = {
  message: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === 'GET') {
      Votes.instance.resetResults();

      res.status(200).json({ message: "Resultados reiniciados" });

    } else {
      res.status(400).end();
    }
  } catch (e) {
    res.status(500).end();
  }
}
