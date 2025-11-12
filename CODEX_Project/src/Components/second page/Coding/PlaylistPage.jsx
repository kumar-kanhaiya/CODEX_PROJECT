import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "AIzaSyCDqaMw3AI6KSxHwR0eMxkRqCxJvJ5_LfY"; 

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlistItems`,
          {
            params: {
              part: "snippet",
              maxResults: 20,
              playlistId: playlistId,
              key: API_KEY,
            },
          }
        );
        const videoItems = response.data.items.map((item) => ({
          videoId: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
        }));
        setVideos(videoItems);
        setSelectedVideo(videoItems[0]);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };
    fetchPlaylist();
  }, [playlistId]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left side: playlist */}
      <div className="w-1/3 overflow-y-auto bg-white border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Upcoming Videos
        </h2>
        <ul className="space-y-3">
          {videos.map((video, index) => (
            <li
              key={index}
              onClick={() => setSelectedVideo(video)}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition hover:bg-gray-100 ${
                selectedVideo?.videoId === video.videoId
                  ? "bg-gray-100 border-l-4 border-indigo-500"
                  : ""
              }`}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-20 h-14 object-cover rounded-md"
              />
              <p className="text-sm text-gray-700 font-medium line-clamp-2">
                {video.title}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side: main video */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {selectedVideo ? (
          <div className="w-full max-w-4xl">
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                title={selectedVideo.title}
                allowFullScreen
              ></iframe>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              {selectedVideo.title}
            </h2>
          </div>
        ) : (
          <p className="text-gray-500">Loading video...</p>
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
