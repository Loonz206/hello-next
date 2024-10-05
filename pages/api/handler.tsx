interface Response {
  status: (code: number) => Response;
  json: (data: object) => void;
}

export default function handler(res: Response) {
  // Get data from your database
  res.status(200).json({ firstname: "lenny" });
}
