import { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get data from your database
  res.status(200).json({ firstname: "lenny" });
}
