import { useEffect, useState } from "react";

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

  useEffect(() => {
    const PopularVideos = async () => {
      try {
        const result = await fetch("/videos.json");
        const json = await result.json();
        console.log(json);
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

    PopularVideos();
  }, []);

  if (error) {
    return <p className="text-lg font-mono">Erro ao carregar os vídeos...</p>;
  }

  return (
    <main className="w-full bg-slate-600 p-2">
      <div className="grid gap-[20] grid-cols-[repeat(auto-fit, minmax(300px, 1fr))] text-white">
        {videos.map((video) => (
          <div
            key={video.id}
            className="rounded-[10] flex flex-col flex-wrap gap-2 w-[400px] max-[601px]:w-[300px]"
          >
            <img
              src={video.content.thumbnail.high.url}
              alt={`${video.id}-${video.content.channelId}`}
              className="w-[465px] rounded-[10px] hover:cursor-pointer"
            />
            <h3 className="text-lg font-normal hover:underline hover:cursor-pointer">
              {video.content.title}
            </h3>
          </div>
        ))}
      </div>
    </main>
  );
}
