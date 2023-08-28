import React, { useState, useEffect } from "react";
import {
  Info,
  PauseCircle,
  SkipBack,
  SkipForward,
  PlayCircle,
} from "@phosphor-icons/react";
import SpotifyPlayer from "spotify-web-playback";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

interface IWebPlaybackProps {
  token: string;
}

export function WebPlayback({ token }: IWebPlaybackProps) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState<SpotifyPlayer>();
  const [current_track, setTrack] = useState(track);

  useEffect(() => {
    // const script = document.createElement("script");
    // script.src = "https://sdk.scdn.co/spotify-player.js";
    // script.async = true;

    // document.body.appendChild(script);

    // this._player = new window.Spotify.Player({
    //   name,
    //   volume,
    //   getOAuthToken: (cb: SpotifyOAuthCallback) => {
    //     cb(token);
    //   },
    // }) as SpotifyWebPlaybackPlayer;

    const spotify = new SpotifyPlayer("Clima.io", 0.5);

    spotify.addListener("ready", device_id => {
      console.log(device_id);

      console.log("Ready with Device ID", device_id);
    });

    spotify.addListener("state", state => {
      if (!state) {
        return;
      }

      setTrack(state.track_window.current_track);
      setPaused(state.paused);

      spotify.getPlaybackState().then(state => {
        !state ? setActive(false) : setActive(true);
      });
    });

    setPlayer(spotify);
    spotify.connect(token);


    // window.onSpotifyWebPlaybackSDKReady = () => {
    //   const player = new window.Spotify.Player({
    //     name: "Clima.io",
    //     getOAuthToken: cb => {
    //       cb(token);
    //     },
    //     volume: 0.5,
    //   });

    //   setPlayer(player);

    //   player.addListener("ready", ({ device_id }: { device_id: number }) => {
    //     console.log("Ready with Device ID", device_id);
    //   });

    //   player.addListener(
    //     "not_ready",
    //     ({ device_id }: { device_id: number }) => {
    //       console.log("Device ID has gone offline", device_id);
    //     },
    //   );

    //   player.addListener("player_state_changed", state => {
    //     if (!state) {
    //       return;
    //     }

    //     setTrack(state.track_window.current_track);
    //     setPaused(state.paused);

    //     console.log(state);

    //     player.getCurrentState().then(state => {
    //       !state ? setActive(false) : setActive(true);
    //     });
    //   });

    //   player.connect();
    // };
  }, []);

  if (!is_active) {
    return (
      <>
        <div className="h-full flex flex-col justify-between pt-8 xxs:gap-0 gap-8">
          <div className="lg:text-4xl text-3xl flex flex-col items-center gap-4 text-zinc-400 gap-8">
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
        <section className="flex flex-col gap-12 my-8 pb-12 h-full items-center justify-center">
          <div className="w-full flex flex-col items-center">
            <div className="flex items-center gap-8">
              {current_track && current_track.album.images[0].url ? (
                <img
                  src={current_track.album.images[0].url}
                  className="w-96 h-96"
                  alt=""
                />
              ) : null}
              <div className="flex flex-col justify-between gap-16">
                <div>
                  <div className="text-6xl">{current_track?.name}</div>
                  <div className="text-3xl opacity-40">
                    {current_track?.artists[0].name}
                  </div>
                </div>
                <div className="flex gap-4 w-auto justify-between">
                  <button
                    className="text-6xl flex items-center justify-center rounded-full text-white hover:brightness-75 duration-300"
                    onClick={() => {
                      player?.previous();
                    }}
                  >
                    <SkipBack size={32} weight="fill" />
                  </button>

                  {is_paused ? (
                    <button
                      className="text-6xl flex items-center justify-center rounded-full text-white hover:brightness-75 duration-300"
                      onClick={() => {
                        player?.play();
                      }}
                    >
                      <PlayCircle weight="fill" />
                    </button>
                  ) : (
                    <button
                      className="text-6xl flex items-center justify-center rounded-full text-white hover:brightness-75 duration-300"
                      onClick={() => {
                        player?.pause();
                      }}
                    >
                      <PauseCircle weight="fill" />
                    </button>
                  )}

                  <button
                    className="text-6xl flex items-center justify-center rounded-full text-white hover:brightness-75 duration-300"
                    onClick={() => {
                      player?.next();
                    }}
                  >
                    <SkipForward size={32} weight="fill" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
