import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../HOME/navbar/navbar.jsx";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Fetch ALL pages from YouTube API
  const fetchAllVideos = async (playlistId) => {
    let all = [];
    let nextPageToken = "";

    while (true) {
      const res = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",
        {
          params: {
            part: "snippet",
            maxResults: 50,
            playlistId,
            pageToken: nextPageToken,
            key: API_KEY,
          },
        }
      );

      all.push(...res.data.items);

      if (!res.data.nextPageToken) break;
      nextPageToken = res.data.nextPageToken;
    }

    return all.map((item) => ({
      videoId: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));
  };

  useEffect(() => {
    const load = async () => {
      try {
        const allVideos = await fetchAllVideos(playlistId);
        setVideos(allVideos);
        setSelectedVideo(allVideos[0]);
      } catch (err) {
        console.error("Playlist Error:", err);
      }
    };

    load();
  }, [playlistId]);

  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col bg-gray-50">
        <div className="text-center py-6">
          <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Playlist Viewer
          </h1>
          <p className="text-lg md:text-xl text-slate-600 italic">
            Dive into your coding journey, one video at a time.
          </p>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/5 overflow-y-auto bg-white border-r border-gray-200 p-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Upcoming Videos
            </h2>

            <ul className="space-y-3 my-5 ml-5">
              {videos.map((video, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedVideo(video)}
                  className={`flex items-center gap-3 cursor-pointer p-4 rounded-lg transition hover:bg-gray-100 ${
                    selectedVideo?.videoId === video.videoId
                      ? "bg-gray-100 border-l-4 border-indigo-500"
                      : ""
                  }`}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-28 h-20 object-cover rounded-md"
                  />
                  <p className="text-sm text-gray-700 font-medium line-clamp-2">
                    {video.title}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 flex flex-col items-center p-6 overflow-y-auto">
            {selectedVideo ? (
              <div className="w-full max-w-5xl">
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                    title={selectedVideo.title}
                    allowFullScreen
                  ></iframe>
                </div>

                <h2 className="mt-4 text-2xl font-bold text-gray-600">
                  {selectedVideo.title}
                </h2>
              </div>
            ) : (
              <p className="text-gray-500 text-lg">Loading video...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaylistPage;
