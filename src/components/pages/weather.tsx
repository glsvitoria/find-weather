import { api } from "@/services/api";
import { IForecast, IWeather } from "@/types/types";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { formatHour } from "@/utils/formatHour";
import { kelvinToCelsius } from "@/utils/kelvinToCelsius";
import { renderIconByWeather } from "@/utils/renderIconByWeather";
import { CloudRain, Info, MapPinLine } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";
import { Loading } from "../animations/loading";
import Button from "../Button";

interface IFetchWeatherProps {
  latitude: number;
  longitude: number;
}

/**
 * Mapeamento do Weather
 * Clouds
 * Rain
 * Clear
 */

export function Weather() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({} as IWeather);
  const [forecast, setForecast] = useState<IForecast[]>([]);
  const [location, setLocation] = useState("");

  const [havePermission, setHavePermission] = useState(true);

  const [errorInRequest, setErrorInRequest] = useState(false);

  const fetchWeather = useCallback(
    async ({ latitude, longitude }: IFetchWeatherProps) => {
      const responseWeather = await api.get("/weather", {
        params: {
          lat: latitude,
          lon: longitude,
        },
      });

      const responseForecast = await api.get("/forecast", {
        params: {
          lat: latitude,
          lon: longitude,
        },
      });

      const responseLocation = await api.get("/reverse", {
        params: {
          lat: latitude,
          lon: longitude,
          apiKey: process.env.GEOAPIFY_KEY,
        },
      });

      if (
        responseWeather.status !== 200 ||
        responseForecast.status !== 200 ||
        responseLocation.status !== 200
      ) {
        setErrorInRequest(true);
        return;
      }

      setLocation(responseLocation.data.features[0].properties.city);
      setWeather(responseWeather.data);
      setForecast(responseForecast.data.list.slice(0, 3));
    },
    [],
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;

          fetchWeather({ latitude, longitude });
        },
        error => {
          setHavePermission(false);
          console.error("Error getting location:", error.message);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (errorInRequest) {
    return (
      <div className="h-full flex flex-col items-center pt-8 xxs:gap-0 gap-8">
        <div className="lg:text-4xl text-3xl flex flex-col items-center gap-8 text-zinc-400">
          <h1 className="lg:text-3xl sm:text-xl text-lg text-justify">
            Ocorreu um erro na requisição. Clique no botão a baixo para
            recarregar a página e tentar novamente.
          </h1>
          <Button
            onClick={() => window.location.reload()}
            className="w-full bg-zinc-400 hover:bg-zinc-500 text-white font-bold py-2 px-4 rounded"
          >
            Recarregar página
          </Button>
        </div>
      </div>
    );
  }

  if (!havePermission) {
    return (
      <div className="h-full flex flex-col justify-between pt-8 xxs:gap-0 gap-8">
        <div className="lg:text-4xl text-3xl flex md:flex-row flex-col items-center gap-4 text-zinc-400">
          <Info />
          <h1 className="lg:text-3xl sm:text-xl text-lg md:text-left text-center">
            Autorize a localização para poder ver o clima
          </h1>
        </div>
      </div>
    );
  }

  if (!weather.weather || !forecast) return <Loading />;

  return (
    <div className="h-full flex flex-col justify-between lg:pt-24 pt-8 xxs:gap-0 gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-zinc-600 font-bold sm:text-base text-sm xxs:text-left text-center">
            Horário Local
          </p>
          <h2 className="text-4xl xxs:text-left text-center">
            {formatHour(currentTime)}
          </h2>
        </div>
        <h1 className="lg:text-5xl sm:text-3xl text-lg text-zinc-400 xxs:text-left text-center">
          Seja bem-vindo a{" "}
          <span className="text-white lg:text-8xl sm:text-7xl text-4xl block xxs:text-left text-center">
            {location}
          </span>
        </h1>
      </div>
      <div className="flex lg:flex-row flex-col xxs:gap-16 gap-8 justify-between">
        <div className="flex flex-col gap-4 xxs:min-w-[13rem] xxs:max-w-[13rem]">
          <p className="text-lg xxs:text-left text-center">
            {capitalizeFirstLetter(weather.weather[0].description)}
          </p>
          <div className="flex w-full xxs:justify-between justify-around items-center">
            <div className="xxs:text-5xl text-3xl flex gap-1 font-extralight">
              {kelvinToCelsius(weather.main.temp_max)}
              <span className="text-base opacity-50">°C</span>
            </div>
            <div className="xxs:text-5xl text-3xl flex gap-1 font-extralight">
              {kelvinToCelsius(weather.main.temp_min)}
              <span className="text-base opacity-50">°C</span>
            </div>
          </div>
        </div>
        <div className="xxs:flex xxs:flex-row grid grid-cols-2 flex-col sm:gap-8 gap-4 justify-between items-center sm:w-max w-full">
          {forecast.map((item, index) => (
            <div
              key={item.dt_txt}
              className={`flex flex-col items-center justify-between h-full ${
                index === 2 && "col-span-2"
              }`}
            >
              <p className="opacity-40 text-xs">
                {formatHour(new Date(item.dt_txt))}
              </p>
              {renderIconByWeather({ weather: item.weather[0].main })}
              <p className="opacity-60 text-xl">
                {kelvinToCelsius(item.main.temp)} °C
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
