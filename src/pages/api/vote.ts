// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {docList} from "../../resources/docList";

type Data = {
  message: string
}

let votes: Record<string, string> = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method === 'POST') {
      const { document, nominee } = req.body;
      let status = 201;
      let message = "Gracias por Votar!";

      if(!docList.includes(document)) {
        status = 400;
        message =  "Sólo pueden votar los jugadores!";
      } else if(!votes[document]) votes[document] = nominee
      else {
        status = 400;
        message =  "Sólo puedes votar una vez!";
      }

      console.log(votes);
      res.status(status).json({ message });

    } else {
      res.status(400).end();
    }
  } catch (e) {
    res.status(500).end();
  }
}
