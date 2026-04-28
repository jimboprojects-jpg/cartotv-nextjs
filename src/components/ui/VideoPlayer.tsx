'use client'
import { useEffect, useRef, useState } from 'react';
import { X, Volume2, VolumeX, Maximize2, Minimize2, Play, Pause, SkipBack, SkipForward, Loader2 } from 'lucide-react';
import Hls from 'hls.js';
import { Channel } from '@/data/countries';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface VideoPlayerProps {
  channel: Channel | null;
  onClose: () => void;
}

export const VideoPlayer = ({ channel, onClose }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!channel || !videoRef.current) return;

    const video = videoRef.current;
    setIsLoading(true);
    setError(null);

    // Cleanup previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const url = channel.url;
    const isHLS = url.includes('.m3u8') || url.includes('m3u8');

    if (isHLS && Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
      });
      hlsRef.current = hls;

      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setError('Stream unavailable. Try another channel.');
          setIsLoading(false);
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl') || !isHLS) {
      video.src = url;
      video.load();
      
      video.oncanplay = () => {
        setIsLoading(false);
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      };

      video.onerror = () => {
        setError('Stream unavailable. Try another channel.');
        setIsLoading(false);
      };
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [channel]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'f' || e.key === 'F') toggleFullscreen();
      if (e.key === ' ') togglePlay();
      if (e.key === 'm' || e.key === 'M') toggleMute();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    if (!videoRef.current) return;
    const vol = value[0];
    setVolume(vol);
    videoRef.current.volume = vol / 100;
    setIsMuted(vol === 0);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    if (!document.fullscreenElement) {
      try {
        // Try to lock screen orientation to landscape on mobile
        if ('orientation' in screen && 'lock' in (screen.orientation as any)) {
          try {
            await (screen.orientation as any).lock('landscape');
          } catch (e) {
            // Orientation lock may not be supported or allowed
          }
        }
        await container.requestFullscreen();
        setIsFullscreen(true);
      } catch (e) {
        console.error('Fullscreen failed:', e);
      }
    } else {
      try {
        // Unlock orientation when exiting fullscreen
        if ('orientation' in screen && 'unlock' in (screen.orientation as any)) {
          try {
            (screen.orientation as any).unlock();
          } catch (e) {
            // Ignore unlock errors
          }
        }
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (e) {
        console.error('Exit fullscreen failed:', e);
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  if (!channel) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center animate-fade-in">
      <div 
        ref={containerRef}
        className="relative w-full h-full flex flex-col"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Header */}
        <div className={`absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-white">{channel.name}</h3>
              <span className="px-2 py-1 rounded-full bg-red-500 text-xs text-white animate-pulse">
                LIVE
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Video Container */}
        <div className="flex-1 flex items-center justify-center bg-black" onClick={togglePlay}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
              <p className="text-white text-lg mb-4">{error}</p>
              <Button onClick={onClose}>Close Player</Button>
            </div>
          )}

          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            playsInline
            autoPlay
          />
        </div>

        {/* Controls */}
        <div className={`absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-4">
            {/* Play/Pause */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </Button>

            {/* Skip buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => videoRef.current && (videoRef.current.currentTime -= 10)}
            >
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => videoRef.current && (videoRef.current.currentTime += 10)}
            >
              <SkipForward className="w-5 h-5" />
            </Button>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={toggleMute}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
              <div className="w-24">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                />
              </div>
            </div>

            <div className="flex-1" />

            {/* Fullscreen */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </Button>
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="flex items-center justify-center gap-4 mt-2 text-white/50 text-xs">
            <span>Space: Play/Pause</span>
            <span>M: Mute</span>
            <span>F: Fullscreen</span>
            <span>ESC: Close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
