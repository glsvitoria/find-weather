import React, { useState, useEffect } from "react";
import {
  Info,
  PauseCircle,
  SkipBack,
  SkipForward,
  PlayCircle,
} from "@phosphor-icons/react";
import SpotifyPlayer from "spotify-web-playback";

const track: ITrack = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
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
      console.log(state.track_window.next_tracks);
      
      setPaused(state.paused);

      spotify.getPlaybackState().then(state => {
        !state ? setActive(false) : setActive(true);
      });
    });

    setPlayer(spotify);
    spotify.connect(token);
  }, [token]);

  if (!is_active && player) {
    return (
      <>
        <div className="h-full flex flex-col justify-between pt-8 xxs:gap-0 gap-8">
          <div className="lg:text-4xl text-3xl flex flex-col items-center gap-4 text-zinc-400">
            <h2 className="lg:text-3xl sm:text-xl text-lg md:text-left text-center">
              Entre no seu spotify por algum dispositivo e transfira para
            </h2>
            <h1 className="text-white uppercase lg:text-5xl sm:text-3xl text-xl">
              Clima.io
            </h1>
            <h2 className="lg:text-3xl sm:text-xl text-lg md:text-left text-center">
              para ouvir a música por aqui.
            </h2>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <section className="flex flex-col gap-12 my-8 pb-12 xl:h-full h-auto items-center justify-center">
          <div className="w-full flex flex-col items-center">
            <div className="flex xl:flex-row flex-col items-center gap-8">
              {current_track && current_track.album.images[0].url ? (
                <img
                  src={current_track.album.images[0].url}
                  className="xl:w-96 sm:w-80 xxs:w-48 w-40 xl:h-96 sm:h-80 xxs:h-48 h-40"
                  alt=""
                />
              ) : null}
              <div className="flex flex-col justify-between xl:gap-16 gap-8">
                <div className="flex flex-col xl:text-left text-center">
                  <div className="xl:text-6xl sm:text-4xl xxs:text-2xl text-xl">
                    {current_track?.name}
                  </div>
                  <div className="xl:text-3xl sm:text-2xl xxs:text-lg opacity-40">
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
              </div>
            </div>
          </div>
          {next_tracks && next_tracks.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-white text-2xl">Próximas músicas</h2>
              <p>{next_tracks[0].name}</p>
              <p>{next_tracks[1].name}</p>
            </div>
          )}
        </section>
      </>
    );
  }
}
