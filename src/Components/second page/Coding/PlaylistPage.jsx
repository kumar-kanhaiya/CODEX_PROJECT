import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../HOME/navbar/navbar.jsx";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

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

    return all
      .filter((item) => item.snippet.resourceId?.videoId) // avoid private/deleted
      .map((item) => ({
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.medium?.url || "",
      }));
  };

  useEffect(() => {
    const load = async () => {
      try {
        const allVideos = await fetchAllVideos(playlistId);
        setVideos(allVideos);
        if (allVideos.length > 0) {
          setSelectedVideo(allVideos[0]);
        }
      } catch (err) {
      console.error("Playlist Error:", err);
    }
  };

  load();
}, [playlistId]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 pt-16 md:pt-0">
        {/* Desktop: Side-by-side layout | Mobile: Video on top */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 py-6">
            {/* Video Player - Full width on mobile, fixed size on desktop */}
            <div className="w-full lg:w-3/4 xl:w-4/5 order-1 lg:order-1">
              {selectedVideo ? (
                <div className="space-y-4">
                  <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-shadow-2xl">
                    <iframe
                      className="w-full h-full rounded-xl"
                      src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                      title={selectedVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                    {selectedVideo.title}
                  </h1>
                </div>
              ) : (
                <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                  <p className="text-gray-500">Loading video...</p>
                </div>
              )}
            </div>

            {/* Playlist - Below on mobile, sidebar on desktop */}
            <div className="w-full lg:w-1/4 xl:w-1/5 order-2 lg:order-2 lg:max-h-screen lg:overflow-y-auto lg:sticky lg:top-20">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 sticky top-0 bg-gray-50 py-2 z-10">
                Playlist ({videos.length} videos)
              </h2>

              <div className="space-y-3 max-h-[calc(100vh-200px)] lg:max-h-none overflow-y-auto">
                {videos.map((video, index) => (
                  <div
                    key={video.videoId}
                    onClick={() => {
                      setSelectedVideo(video);
                      window.scrollTo({ top: 0, behavior: "smooth" }); // smooth scroll to top on mobile
                    }}
                    className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-100 ${
                      selectedVideo?.videoId === video.videoId
                        ? "bg-indigo-50 border-l-4 border-indigo-600"
                        : ""
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-32 h-20 object-cover rounded-md"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-md">
                        <span className="text-white text-xs font-semibold">
                          {index + 1}
                        </span>
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 line-clamp-2 text-sm">
                        {video.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Video {index + 1} of {videos.length}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaylistPage;