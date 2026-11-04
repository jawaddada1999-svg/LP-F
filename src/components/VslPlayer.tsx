import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { Translations } from '../translations';

interface VslPlayerProps {
  t: Translations;
  onVideoEnd: () => void;
  onGoToBooking: () => void;
}

export const VslPlayer: React.FC<VslPlayerProps> = ({
  t,
  onVideoEnd,
  onGoToBooking,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const maxWatchedTimeRef = useRef<number>(0);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(275); // 4m 35s default
  const [volume, setVolume] = useState<number>(0.9);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [videoEnded, setVideoEnded] = useState<boolean>(false);
  const [useNativeVideo, setUseNativeVideo] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasNotifiedEndRef = useRef<boolean>(false);

  // Safely notify parent component when video ends via useEffect (prevents setState during render)
  useEffect(() => {
    if (videoEnded && !hasNotifiedEndRef.current) {
      hasNotifiedEndRef.current = true;
      onVideoEnd();
    } else if (!videoEnded) {
      hasNotifiedEndRef.current = false;
    }
  }, [videoEnded, onVideoEnd]);

  // Sync fullscreen state changes from browser events
  useEffect(() => {
    const handleFsChange = () => {
      const doc = document as any;
      const isFs = !!(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );
      setIsFullscreen(isFs);
    };

    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    document.addEventListener('mozfullscreenchange', handleFsChange);
    document.addEventListener('MSFullscreenChange', handleFsChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
      document.removeEventListener('mozfullscreenchange', handleFsChange);
      document.removeEventListener('MSFullscreenChange', handleFsChange);
    };
  }, []);

  // Check if /videos/ibonda-vsl.mp4 actually exists on the server/public
  useEffect(() => {
    const testVideo = document.createElement('video');
    testVideo.src = '/videos/ibonda-vsl.mp4';
    testVideo.oncanplay = () => {
      setUseNativeVideo(true);
    };
    testVideo.onerror = () => {
      setUseNativeVideo(false);
    };
  }, []);

  // Update timer in simulation mode with automatic opening pace (1.5x for first 20s, then 1.0x)
  useEffect(() => {
    if (!useNativeVideo && isPlaying && !videoEnded) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          // Opening pace: 1.5x for first 20 seconds, then 1.0x
          const rate = prev < 20 ? 1.5 : 1.0;
          const next = prev + rate * 0.25;

          maxWatchedTimeRef.current = Math.max(maxWatchedTimeRef.current, next);

          if (next >= duration) {
            clearInterval(interval);
            setIsPlaying(false);
            setVideoEnded(true);
            return duration;
          }
          return next;
        });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [isPlaying, useNativeVideo, videoEnded, duration]);

  // Adjust native video playbackRate: 1.5x for first 20 seconds, then 1.0x
  useEffect(() => {
    if (useNativeVideo && videoRef.current) {
      const targetRate = currentTime < 20 ? 1.5 : 1.0;
      if (videoRef.current.playbackRate !== targetRate) {
        videoRef.current.playbackRate = targetRate;
      }
    }
  }, [useNativeVideo, currentTime]);

  const togglePlay = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }

    if (videoEnded) {
      setCurrentTime(0);
      setVideoEnded(false);
      setIsPlaying(true);
      if (useNativeVideo && videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
      return;
    }

    if (useNativeVideo && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleNativeTimeUpdate = () => {
    if (videoRef.current) {
      const curr = videoRef.current.currentTime;
      setCurrentTime(curr);
      maxWatchedTimeRef.current = Math.max(maxWatchedTimeRef.current, curr);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleNativeEnded = () => {
    setIsPlaying(false);
    setVideoEnded(true);
  };

  // Forward seeking disabled: user can only seek to a point they have already watched!
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const requestedTime = parseFloat(e.target.value);
    const maxAllowed = maxWatchedTimeRef.current;

    // If requestedTime is greater than furthest point watched, snap back
    const target = requestedTime > maxAllowed ? maxAllowed : requestedTime;

    setCurrentTime(target);
    if (useNativeVideo && videoRef.current) {
      videoRef.current.currentTime = target;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (useNativeVideo && videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (useNativeVideo && videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    const doc = document as any;
    const isCurrentlyFullscreen = !!(
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement
    );

    const el = containerRef.current as any;

    if (!isCurrentlyFullscreen && !isFullscreen) {
      try {
        if (typeof el.requestFullscreen === 'function') {
          el.requestFullscreen()
            .then(() => setIsFullscreen(true))
            .catch(() => setIsFullscreen(true));
        } else if (typeof el.webkitRequestFullscreen === 'function') {
          el.webkitRequestFullscreen();
          setIsFullscreen(true);
        } else if (typeof el.mozRequestFullScreen === 'function') {
          el.mozRequestFullScreen();
          setIsFullscreen(true);
        } else if (typeof el.msRequestFullscreen === 'function') {
          el.msRequestFullscreen();
          setIsFullscreen(true);
        } else if (
          useNativeVideo &&
          videoRef.current &&
          typeof (videoRef.current as any).webkitEnterFullscreen === 'function'
        ) {
          (videoRef.current as any).webkitEnterFullscreen();
        } else {
          setIsFullscreen(true);
        }
      } catch {
        setIsFullscreen(true);
      }
    } else {
      try {
        if (typeof doc.exitFullscreen === 'function') {
          doc.exitFullscreen()
            .then(() => setIsFullscreen(false))
            .catch(() => setIsFullscreen(false));
        } else if (typeof doc.webkitExitFullscreen === 'function') {
          doc.webkitExitFullscreen();
          setIsFullscreen(false);
        } else if (typeof doc.mozCancelFullScreen === 'function') {
          doc.mozCancelFullScreen();
          setIsFullscreen(false);
        } else if (typeof doc.msExitFullscreen === 'function') {
          doc.msExitFullscreen();
          setIsFullscreen(false);
        } else {
          setIsFullscreen(false);
        }
      } catch {
        setIsFullscreen(false);
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2800);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const maxWatchedPercent = duration > 0 ? (maxWatchedTimeRef.current / duration) * 100 : 0;
  const stepIndex = Math.min(3, Math.floor((currentTime / duration) * 4));
  const activeSlide = t.hero.vslSlides[stepIndex] || t.hero.vslSlides[0];

  return (
    <div id="vsl-section" className="w-full max-w-4xl mx-auto px-4 sm:px-0">
      {/* 16:9 Video Player Container (Sharp, crystal clear thumbnail - no blur effect) */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        className={`${
          isFullscreen
            ? 'fixed inset-0 z-50 w-screen h-screen bg-black rounded-none flex items-center justify-center'
            : 'relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.25)] ring-1 ring-blue-500/20'
        } group select-none transition-all`}
      >
        {/* Real Native Video element (if mp4 placed in /public/videos/ibonda-vsl.mp4) */}
        {useNativeVideo ? (
          <video
            ref={videoRef}
            src="/videos/ibonda-vsl.mp4"
            className="w-full h-full object-cover"
            onTimeUpdate={handleNativeTimeUpdate}
            onEnded={handleNativeEnded}
            playsInline
          />
        ) : (
          /* Crisp, sharp interactive presentation - Sharp thumbnail without blur */
          <div className="w-full h-full relative overflow-hidden bg-[#060b1c] flex flex-col items-center justify-center p-6 text-center">
            
            {/* Sharp grid background (No blur) */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}
            />

            {!hasStarted ? (
              /* Pre-play State / Sharp, clean Poster without blur */
              <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
                <div className="text-xs font-semibold text-blue-400 tracking-wider mb-2 uppercase">
                  {t.hero.trustBadge}
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white mb-3">
                  {t.hero.vslTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mb-6">
                  {t.hero.vslSubtitle}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>1080p Ultra HD</span>
                  <span>·</span>
                  <span>Audio & Video</span>
                </div>
              </div>
            ) : (
              /* In-Video Active Walkthrough Display */
              <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center justify-center transition-all duration-300">
                <span className="text-xs font-semibold text-blue-400 mb-2">
                  {activeSlide.tag}
                </span>
                
                <h4 className="text-base sm:text-2xl font-bold text-white mb-2">
                  {activeSlide.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-6 leading-relaxed">
                  {activeSlide.desc}
                </p>

                {/* Animated waveform activity indicator */}
                <div className="flex items-center justify-center gap-1.5 h-7 mb-2">
                  {[28, 48, 80, 52, 95, 60, 35, 75, 45, 88, 30, 65].map((h, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full bg-blue-500 transition-all duration-300 ${
                        isPlaying ? 'opacity-90' : 'opacity-30'
                      }`}
                      style={{
                        height: isPlaying ? `${Math.max(6, (h * ((i % 3) + 1)) % 26)}px` : '4px',
                      }}
                    />
                  ))}
                </div>

                <div className="text-[11px] text-slate-400 font-latin">
                  IBONDA System · {t.hero.stepPrefix} {stepIndex + 1} / 4
                </div>
              </div>
            )}
          </div>
        )}

        {/* Large, Obvious Center Play Button (No blur on overlay) */}
        {(!isPlaying || !hasStarted) && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/25 cursor-pointer transition-opacity"
          >
            <button
              type="button"
              aria-label={videoEnded ? t.hero.replay : t.hero.play}
              className="relative p-6 sm:p-7 rounded-full bg-blue-600 text-white shadow-2xl shadow-blue-600/70 hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-30" />
              {videoEnded ? (
                <RotateCcw className="w-9 h-9 relative z-10" />
              ) : (
                <Play className="w-9 h-9 relative z-10 fill-white translate-x-[2px]" />
              )}
            </button>
          </div>
        )}

        {/* Video Completed Banner Notification */}
        {videoEnded && (
          <div className="absolute top-4 inset-x-4 z-20 bg-blue-950/95 border border-blue-500/50 rounded-xl p-3.5 flex items-center justify-between text-start shadow-xl">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  {t.hero.videoEndedTitle}
                </p>
                <p className="text-[11px] text-slate-300">
                  {t.hero.videoEndedDesc}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onGoToBooking}
              className="text-xs bg-blue-600 hover:bg-blue-500 text-white font-medium px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-md"
            >
              {t.hero.goToBooking}
            </button>
          </div>
        )}

        {/* Minimal Controls Bar: ONLY Play/Pause, Progress Bar, Volume, Fullscreen */}
        <div
          className={`absolute bottom-0 inset-x-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent transition-opacity duration-300 ${
            showControls || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Progress Timeline Scrubber with forward-seeking disabled */}
          <div className="relative w-full mb-2.5 flex items-center">
            {/* Visual indicator of watched window */}
            <div
              className="absolute h-1.5 bg-slate-600/50 rounded-lg pointer-events-none"
              style={{
                width: `${maxWatchedPercent}%`,
              }}
            />
            <input
              type="range"
              min={0}
              max={duration}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              aria-label="Progress"
              className="w-full h-1.5 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-blue-500 transition-all z-10"
              style={{
                background: `linear-gradient(to right, #3b82f6 ${progressPercent}%, rgba(51, 65, 85, 0.8) ${progressPercent}%)`,
              }}
            />
          </div>

          <div className="flex items-center justify-between gap-3 text-xs text-slate-200">
            {/* Play & Volume ONLY (Time text removed completely) */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? t.hero.pause : t.hero.play}
                className="p-1.5 text-white hover:text-blue-400 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? t.hero.unmute : t.hero.mute}
                  className="p-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  aria-label="Volume"
                  className="w-14 sm:w-20 h-1 bg-slate-700 rounded appearance-none accent-blue-500 cursor-pointer hidden sm:block"
                />
              </div>
            </div>

            {/* Fullscreen Button ONLY (Speed button removed completely) */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={t.hero.fullscreen}
                className="p-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
