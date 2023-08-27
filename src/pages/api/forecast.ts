import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { lat, lon } = req.query;

  try {
    const { data } = await api.get("/forecast", {
      params: {
        lat,
        lon,
        appid: process.env.OPEN_WEATHER_KEY,
        lang: "pt_br",
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.log(error);

    res.status(400).json({ name: "Request for forecast failed" });
  }
}
