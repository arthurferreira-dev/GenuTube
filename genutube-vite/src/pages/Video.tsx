import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Play, Pause, Volume2, VolumeOff } from "lucide-react";
import { TempFormatter } from "../utils/tempFormatter";

export const VideoPlayer = () => {
  const [searchParams] = useSearchParams();
  const titleVideo = searchParams.get("title");
  //const channelName = searchParams.get("channel");
  //const channelId = searchParams.get("channelId");
  const thumbnail = searchParams.get("thumb");
  const videoWatch = searchParams.get("video");

  const videoRef = useRef<HTMLVideoElement>(null);
  const video = videoRef.current;

  const [btnToogle, setBtnToogle] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1.0);
  const [sound, setSound] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!video) return;

    const handleVolumeChange = () => {
      setVolume(video.volume);
    };
    const handleCurrentTime = () => {
      setCurrentTime(video.currentTime);
    };

    video.addEventListener("volumechange", handleVolumeChange);
    video.addEventListener("timeupdate", handleCurrentTime);

    return () => {
      video.removeEventListener("volumechange", handleVolumeChange);
      video.removeEventListener("timeupdate", handleCurrentTime);
    };
  }, [video]);

  const handleToogleBtn = () => {
    if (btnToogle === false) {
      video?.play();
      setBtnToogle(!btnToogle);
    } else {
      video?.pause();
      setBtnToogle(!btnToogle);
    }
  };

  const handleMutSound = () => {
    setSound(!sound);
    if (sound === true) {
      setVolume(1.0);
    } else if (sound === false) {
      setVolume(0);
    }
  };

  return (
    <main className="w-full h-screen font-[rubik] flex flex-col items-center justify-start bg-slate-600 p-3 text-white">
      <div id="video-screen" className="bg-slate-500 flex flex-col flex-wrap gap-3 p-3 rounded-md">
        <div className="relative w-[420px] overflow-hidden rounded-md">
          <video
            ref={videoRef}
            poster={thumbnail ?? ""}
            src={videoWatch ?? ""}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-2 left-2 flex items-center gap-3 bg-black/50 px-3 py-2 rounded-lg">
            <button
              onClick={handleToogleBtn}
              className="text-white hover:text-blue-400 transition"
            >
              {btnToogle ? <Pause size={22} /> : <Play size={22} />}
            </button>

            <div className="flex items-center gap-2">
              <div onClick={handleMutSound}>
                {sound ? (
                  <VolumeOff size={20} className="text-white" />
                ) : (
                  <Volume2 size={20} className="text-white" />
                )}
              </div>
              <input
                type="range"
                style={{
                  background: `linear-gradient(to right, #00bfff ${
                    volume * 100
                  }%, #ccc ${volume * 100}%)`,
                }}
                min={0}
                max={1}
                step={0.1}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="appearance-none w-[100px] h-1.5 rounded outline-none"
              />
              <p className="font-semibold">{TempFormatter(currentTime)}</p>
            </div>
          </div>
        </div>
        <h2 className="text-center text-[18px]">{titleVideo}</h2>
      </div>
    </main>
  );
};
