import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface VideosItens {
  id: string;
  content: {
    title: string;
    channelName: string;
    channelId: string;
    thumbnail: {
      high: { url: string };
    };
    video: { url: string };
  };
}

export function MainHome() {
  const [videos, setVideos] = useState<VideosItens[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const VideosGenu = async () => {
      try {
        const result = await fetch("/videos.json");
        const json = await result.json();
        if (json.items && json.items.length > 0) {
          setVideos(json.items);
        } else {
          setError("No videos...");
        }
      } catch (err) {
        setError("Error to try acess the videos");
        console.error("Error to try acess the videos:", err);
      }
    };

    VideosGenu();
  }, []);

  if (error) {
    return (
      <p className="text-xl text-center font-mono">
        Erro ao carregar os vídeos...
      </p>
    );
  }

  const handleWatchVideo = (video: VideosItens) => {
    const query: URLSearchParams = new URLSearchParams();
    query.set("video", video.content.video.url);
    query.set("thumb", video.content.thumbnail.high.url);
    query.set("title", video.content.title);
    //query.set("channel", video.content.channelName);
    query.set("channelId", video.content.channelId);
    navigate(`/watch?${query.toString()}`);
  };

  return (
    <main className="w-full min-h-screen bg-slate-600 p-2 font-[poppins]">
      <div className="flex flex-row flex-wrap gap-5 text-white">
        {videos.map((video) => (
          <div
            key={video.id}
            className="min-w-[300px] flex-1 bg-slate-500 p-2 rounded-[10px] duration-300 flex flex-col flex-wrap gap-2 w-[400px] max-[627px]:w-full hover:bg-[hsl(216,19%,51%)]"
            onClick={() => handleWatchVideo(video)}
          >
            <img
              src={video.content.thumbnail.high.url}
              alt={`${video.id}-${video.content.channelId}`}
              loading="lazy"
              className="w-[465px] mx-auto rounded-[10px] max-[627px]:w-full hover:cursor-pointer"
            />
            <h3 className="text-[16.45px] font-medium max-[627px]:text-[15.5px] text-center hover:underline hover:cursor-pointer">
              {video.content.title}
            </h3>
          </div>
        ))}
      </div>
    </main>
  );
}