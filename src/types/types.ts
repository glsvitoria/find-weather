export interface IWeather {
  clouds: {
    all: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: [
    {
      description: string;
      icon: string;
      id: number;
      main: string;
    },
  ];
  wind: {
    deg: number;
    speed: number;
  };
}

export interface IForecast {
  clouds: {
    all: number;
  };
  dt: number;
  dt_txt: string;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  pop: number;
  sys: {
    pod: string;
  };
  visibility: number;
  weather: [
    {
      description: string;
      icon: string;
      id: number;
      main: "Clouds" | "Rain" | "Clear" | string;
    },
  ];
  wind: {
    deg: number;
    speed: number;
    gust: number;
  };
}

export interface IResultsAddress {
  properties: {
    address_line1: string;
    city: string;
    country: string;
    postcode: string;
    place_id: string;
  };
}

export type AttachmentData = {
  id: string;
  fileName: string;
  fileContent: string;
  size: number;
};
