import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface channelInterface {
  channelName: string;
  channelId: string;
  photo: {
    url: string;
  };
}

export const ChannelPage = () => {
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get("channelId");
  const [channels, setChannels] = useState<channelInterface[]>([]);

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await fetch("/channels.json");
      const json = await res.json();
      setChannels(json);
    };
    fetchChannel();
  }, []);

  return (
    <main className="w-full h-screen font-[rubik] flex flex-col items-center justify-center bg-slate-600 p-3 text-white">
      {channels.map((channel) =>
        channel.channelId === channelId ? (
          <div key={channelId} className="p-3 bg-slate-700 rounded-lg shadow w-[450px] flex flex-col justify-center items-center gap-3">
            <img
              src={channel.channelId === channelId ? channel.photo.url : ""}
              alt={channelId ?? ""}
              className="w-[120px] h-[120px] rounded-full"
            />
            <div className="flex flex-col justify-center items-center gap-1">
              <h1 className="text-lg">
                {channel.channelId === channelId ? (
                  channel.channelName
                ) : (
                  <p className="text-lg text-red-100">
                    Error ao carregar o nome do canal :(
                  </p>
                )}
              </h1>
              <h3 className="text-[14.41px] hover:underline hover:cursor-pointer">
                {channel.channelId === channelId ? (
                  channel.channelId
                ) : (
                  <p className="text-lg text-red-100">
                    Error ao carregar o arroba do canal :(
                  </p>
                )}
              </h3>
            </div>
          </div>
        ) : (
          ""
        )
      )}
    </main>
  );
};
