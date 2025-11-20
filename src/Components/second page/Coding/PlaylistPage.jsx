import React, { useEffect, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../HOME/navbar/navbar.jsx";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all videos from playlist
  const fetchPlaylistVideos = async () => {
    try {
      let allVideos = [];
      let nextPageToken = "";

      do {
        const res = await axios.get(
          "https://www.googleapis.com/youtube/v3/playlistItems",
          {
            params: {
              part: "snippet",
              maxResults: 50,
              playlistId,
              key: API_KEY,
              pageToken: nextPageToken,
            },
          }
        );

        const items = res.data.items.filter(
          (item) =>
            item.snippet.resourceId?.videoId &&
            item.snippet.title !== "Deleted video" &&
            item.snippet.title !== "Private video"
        );

        allVideos = [
          ...allVideos,
          ...items.map((item) => ({
            videoId: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium?.url || "",
          })),
        ];

        nextPageToken = res.data.nextPageToken || "";
      } while (nextPageToken);

      setVideos(allVideos);
      if (allVideos.length > 0) setSelectedVideo(allVideos[0]);
    } catch (err) {
      console.error("Failed to load playlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylistVideos();
  }, [playlistId]);

  return (
    <>
      <Navbar />

      {/* MOBILE LAYOUT */}
      <div className="lg:hidden min-h-screen bg-gray-50">
        {/* Video Player */}
        <div className="px-4 pt-20 pb-6 bg-white">
          {selectedVideo ? (
            <div className="space-y-4">
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  allowFullScreen
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
              <h1 className="text-xl font-bold text-gray-900 line-clamp-2">
                {selectedVideo.title}
              </h1>
            </div>
          ) : (
            <div className="aspect-video bg-gray-200 rounded-2xl animate-pulse" />
          )}
        </div>

        {/* Playlist */}
        <div className="px-4 pb-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Playlist ({videos.length})
          </h2>
          <div className="space-y-3">
            {videos.map((video, i) => (
              <div
                key={video.videoId}
                onClick={() => {
                  setSelectedVideo(video);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`flex gap-4 p-4 rounded-4 bg-white rounded-xl cursor-pointer transition-all ${
                  selectedVideo?.videoId === video.videoId
                    ? "ring-2 ring-indigo-500 bg-indigo-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="text-lg font-bold text-gray-400 w-8">
                  {i + 1}
                </div>
                <img
                  src={video.thumbnail}
                  alt=""
                  className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 line-clamp-2 text-sm">
                    {video.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT - Full YouTube Style */}
      <div className="hidden lg:flex h-screen bg-black">
        {/* Left: Video Player */}
        <div className="flex-1 flex items-start justify-center overflow-y-auto pt-20 pb-10">
          <div className="w-full max-w-5xl px-8">
            {selectedVideo ? (
              <>
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                    title={selectedVideo.title}
                    allowFullScreen
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
                <h1 className="mt-8 text-3xl font-bold text-white">
                  {selectedVideo.title}
                </h1>
              </>
            ) : (
              <div className="aspect-video bg-gray-900 rounded-2xl animate-pulse" />
            )}
          </div>
        </div>

        {/* Right: Full Height Playlist */}
        <div className="w-96 xl:w-[420px] bg-white border-l border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-900">
              Playlist • {videos.length} videos
            </h2>
          </div>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-3">
              {videos.map((video, index) => (
                <div
                  key={video.videoId}
                  onClick={() => setSelectedVideo(video)}
                  className={`group flex gap-4 p-3 rounded-xl cursor-pointer transition-all ${
                    selectedVideo?.videoId === video.videoId
                      ? "bg-indigo-50 ring-2 ring-indigo-400"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span className="text-lg font-semibold text-gray-500 group-hover:text-gray-700 w-8">
                    {index + 1}
                  </span>

                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-28 h-16 object-cover rounded-lg"
                    />
                    {selectedVideo?.videoId === video.videoId && (
                      <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <svg className="w-0 h-0 border-l-8 border-l-indigo-600 border-y-8 border-y-transparent" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-medium line-clamp-2 text-sm ${
                        selectedVideo?.videoId === video.videoId
                          ? "text-indigo-700 font-semibold"
                          : "text-gray-900"
                      }`}
                    >
                      {video.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaylistPage;