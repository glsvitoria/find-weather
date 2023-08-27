import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const api = axios.create({
  baseURL: "https://api.geoapify.com/v1/geocode",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { lat, lon } = req.query;

  try {
    const { data } = await api.get("/reverse", {
      params: {
        lat,
        lon,
        apiKey: process.env.GEOAPIFY_KEY,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);

    res.status(400).json({ name: "Request for reverse failed" });
  }
}
