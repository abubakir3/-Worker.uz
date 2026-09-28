import React, { useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, AlertCircle } from 'lucide-react';

interface VideoPlayerModalProps {
  videoUrl: string;
  videoTitle?: string;
  companyName?: string;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ videoUrl, videoTitle, companyName, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 text-white">
          <div>
            <h3 className="text-sm font-semibold truncate max-w-md">
              {videoTitle || 'Kompaniya taqdimot videosi'}
            </h3>
            {companyName && (
              <span className="text-xs text-slate-400">
                {companyName}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Box */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          {hasError ? (
            <div className="text-center p-6 text-slate-400">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-2" />
              <p className="text-sm font-medium">Video yuklashda xatolik yuz berdi</p>
              <p className="text-xs text-slate-500 mt-1">Video formati MP4 yoki WebM bo‘lishi lozim</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              playsInline
              onError={() => setHasError(true)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-contain"
            />
          )}

          {/* Quick overlay controls */}
          {!hasError && (
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between bg-black/60 backdrop-blur-xs px-4 py-2 rounded-xl text-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-1 hover:text-blue-400 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-1 hover:text-blue-400 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>

              <div className="text-xs text-slate-300 font-mono">
                Ishchi.uz Video Player
              </div>

              <button
                onClick={toggleFullscreen}
                className="p-1 hover:text-blue-400 transition-colors"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
