import React, { useState, useEffect } from "react";
import {
  Info,
  PauseCircle,
  SkipBack,
  SkipForward,
  PlayCircle,
} from "@phosphor-icons/react";
import SpotifyPlayer from "spotify-web-playback";
import Image from "next/image";
import SpotifyGuiderOne from "../assets/listen-music-guide-one.png";
import SpotifyGuiderTwo from "../assets/listen-music-guide-two.png";
import SpotifyGuiderThree from "../assets/enjoy-music.png";
import { Footer } from "./footer";
import { Progress } from "./ui/progress";
import { convertMsInMinutes } from "@/utils/convertMsinMinutes";

const track: ITrack = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
  duration_ms: 0,
};

interface ITrack {
  name: string;
  album: {
    images: [
      {
        url: string;
      },
    ];
  };
  artists: [
    {
      name: string;
    },
  ];
  duration_ms: number;
}

interface IWebPlaybackProps {
  token: string;
}

export function WebPlayback({ token }: IWebPlaybackProps) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState<SpotifyPlayer>();
  const [current_track, setTrack] = useState<ITrack>(track);
  const [next_tracks, setNextTracks] = useState<ITrack[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (is_paused) return;
    const interval = setInterval(() => {
      // Calcula o incremento baseado no estado progress e duration
      const increment = 1000;

      setProgress(prevProgress => {
        const newProgress = prevProgress + increment;
        return newProgress >= current_track.duration_ms
          ? current_track.duration_ms
          : newProgress; // Limite de 100%
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [progress, is_paused]);

  useEffect(() => {
    const spotify = new SpotifyPlayer("Clima.io", 0.5);

    spotify.addListener("ready", device_id => {
      console.log(device_id);

      console.log("Ready with Device ID", device_id);
    });

    spotify.addListener("state", state => {
      if (!state) {
        return;
      }

      console.log(state);

      setTrack(state.track_window.current_track);
      setNextTracks(state.track_window.next_tracks);
      setPaused(state.paused);
      setProgress(state.position);

      spotify.getPlaybackState().then(state => {
        !state ? setActive(false) : setActive(true);
      });
    });

    setPlayer(spotify);
    spotify.connect(token);
  }, []);

  if (!is_active && player) {
    return (
      <>
        <div className="h-full flex flex-col justify-between pt-8 xxs:gap-0 gap-8">
          <div className="flex flex-col items-center gap-4">
            <h1 className="lg:text-3xl sm:text-xl text-lg md:text-left text-center mb-2 w-full">
              Escute sua música se conectando ao spotify
            </h1>
            <h2 className="lg:text-xl md:text-lg text-sm md:text-left text-center mb-16 w-full opacity-50">
              Entre no seu spotify por algum dispositivo e siga os seguintes
              passos para ouvir sua música por aqui:
            </h2>
            <ol className="flex flex-col gap-8 pb-24">
              <li className="md:grid md:grid-cols-2 flex flex-col items-center gap-4">
                <p className="xl:text-2xl lg:text-xl">
                  1. Clique no ícone a baixo para escolher onde deseja
                  transmitir a música.
                </p>
                <Image
                  src={SpotifyGuiderOne}
                  alt="Guia do Spotify"
                  className="xl:w-80 lg:w-64 md:w-48 w-full md:ml-auto"
                />
              </li>
              <li className="md:grid md:grid-cols-2 flex flex-col-reverse items-center gap-4">
                <Image
                  src={SpotifyGuiderTwo}
                  alt="Guia do Spotify"
                  className="xl:w-80 lg:w-64 md:w-48 w-full md:ml-right"
                />
                <p className="xl:text-2xl lg:text-xl">
                  2. Selecione o dispositivo "Clima.io" para poder transmitir a
                  música aqui no navegador.
                </p>
              </li>
              <li className="md:grid md:grid-cols-2 flex flex-col items-center gap-4">
                <p className="xl:text-2xl lg:text-xl">
                  3. Curta sua música e se divirta.
                </p>
                <Image
                  src={SpotifyGuiderThree}
                  alt="Guia do Spotify"
                  className="xl:w-80 lg:w-64 md:w-48 w-full md:ml-auto"
                />
              </li>
            </ol>
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <section className="flex flex-col gap-12 my-8 pb-12 xl:h-full h-auto items-center justify-center">
          <div className="w-full flex flex-col items-center">
            <div className="flex xl:flex-row flex-col items-center gap-8 w-full">
              {current_track && current_track.album.images[0].url ? (
                <img
                  src={current_track.album.images[0].url}
                  className="xl:w-96 sm:w-80 xxs:w-48 w-40 xl:h-96 sm:h-80 xxs:h-48 h-40"
                  alt=""
                />
              ) : null}
              <div className="flex flex-col justify-between xl:h-96 h-72">
                <div className="flex flex-col xl:text-left text-center gap-3">
                  <div className="xl:text-5xl sm:text-3xl xxs:text-2xl text-xl">
                    {current_track?.name}
                  </div>
                  <div className="xl:text-4xl sm:text-xl xxs:text-lg opacity-40">
                    {current_track?.artists[0].name}
                  </div>
                </div>
                <div className="flex gap-4 w-auto justify-between">
                  <button
                    className="xxs:text-6xl text-4xl flex items-center justify-center rounded-full text-white hover:brightness-75 duration-300"
                    onClick={() => {
                      player?.previous();
                    }}
                  >
                    <SkipBack weight="fill" />
                  </button>

                  {is_paused ? (
                    <button
                      className="xxs:text-6xl text-5xl flex items-center justify-center rounded-full text-white hover:brightness-75 duration-300"
                      onClick={() => {
                        player?.play();
                      }}
                    >
                      <PlayCircle weight="fill" />
                    </button>
                  ) : (
                    <button
                      className="xxs:text-6xl text-5xl flex items-center justify-center rounded-full text-white hover:brightness-75 duration-300"
                      onClick={() => {
                        player?.pause();
                      }}
                    >
                      <PauseCircle weight="fill" />
                    </button>
                  )}

                  <button
                    className="xxs:text-6xl text-4xl flex items-center justify-center rounded-full text-white hover:brightness-75 duration-300"
                    onClick={() => {
                      player?.next();
                    }}
                  >
                    <SkipForward weight="fill" />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <Progress
                    value={(progress * 100) / current_track.duration_ms}
                  />
                  <div className="flex justify-between">
                    <p>{convertMsInMinutes(progress)}</p>
                    <p className="opacity-50">
                      {convertMsInMinutes(current_track.duration_ms)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {next_tracks && next_tracks.length > 0 && (
            <div className="flex flex-col gap-4 w-full">
              <h2 className="text-white text-2xl">A seguir...</h2>
              <div className="grid lg:grid-cols-2 w-full lg:gap-0 gap-8">
                <TrackItem track={next_tracks[0]} />
                <TrackItem track={next_tracks[1]} />
              </div>
            </div>
          )}
        </section>
      </>
    );
  }
}

interface ITrackItemProps {
  track: ITrack;
}

function TrackItem({ track }: ITrackItemProps) {
  return (
    <div className="flex items-center gap-4">
      <img
        src={track.album.images[0].url}
        className="xl:w-48 lg:w-32 sm:w-40 xxs:w-32 w-24 xl:h-48 lg:h-32 sm:h-40 xxs:h-32 h-24"
        alt=""
      />
      <div>
        <p className="xl:text-2xl lg:text-xl sm:text-2xl xxs:text-xl">
          {track.name}
        </p>
        <p className="xl:text-xl lg:text-lg sm:text-xl xxs:text-lg text-sm opacity-60">
          {track.artists[0].name}
        </p>
      </div>
    </div>
  );
}
