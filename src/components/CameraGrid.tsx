import { CameraOff } from 'lucide-react';
import type { CameraView } from '../frontend/Dashboard';
import { useRef, useEffect } from 'react';

// Using a free sample video to simulate "real feed when cameras are installed"
// But built functionally so these can be replaced by RTSP/WebRTC streams easily.
const SAMPLE_STREAM_URL = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4";

interface BoundingBox {
  id: string;
  label: string;
  status: 'NORMAL' | 'UNKNOWN' | 'SUSPICIOUS DETECTED';
  x: string;
  y: string;
  w: string;
  h: string;
}

interface Camera {
  id: string;
  name: string;
  resolution: string;
  fps: string;
  bitrate: string;
  offline: boolean;
  alert?: boolean;
  boxes?: BoundingBox[];
  streamUrl?: string; // Capable of receiving a real stream
}

const CAMERAS: Camera[] = [
  { id: 'CAM_01', name: 'PRODUCE', resolution: '1080P', fps: '30FPS', bitrate: '4.2Mbps', offline: false, streamUrl: SAMPLE_STREAM_URL, boxes: [{ id: 'PID_0842', label: 'NORMAL', status: 'NORMAL', x: '10%', y: '10%', w: '40%', h: '30%' }, { id: 'PID_0911', label: 'UNKNOWN', status: 'UNKNOWN', x: '50%', y: '15%', w: '45%', h: '40%' }] },
  { id: 'CAM_02', name: 'CHECKOUT_NORTH', resolution: '1080P', fps: '30FPS', bitrate: '3.8Mbps', offline: false, streamUrl: SAMPLE_STREAM_URL, boxes: [{ id: 'PID_1022', label: 'NORMAL', status: 'NORMAL', x: '30%', y: '20%', w: '40%', h: '50%' }] },
  { id: 'CAM_03', name: 'LIQUOR_DEPT', resolution: '1080P', fps: '30FPS', bitrate: '4.5Mbps', offline: false, streamUrl: SAMPLE_STREAM_URL, alert: true, boxes: [{ id: 'PID_0744', label: 'SUSPICIOUS DETECTED', status: 'SUSPICIOUS DETECTED', x: '20%', y: '10%', w: '55%', h: '40%' }] },
  { id: 'CAM_04', name: 'FROZEN_A', resolution: '1080P', fps: '30FPS', bitrate: '3.2Mbps', offline: false, streamUrl: SAMPLE_STREAM_URL },
  { id: 'CAM_05', name: 'ENTRANCE_MAIN', resolution: '1080P', fps: '30FPS', bitrate: '5.1Mbps', offline: false, streamUrl: SAMPLE_STREAM_URL },
  { id: 'CAM_06', name: 'BAKERY', resolution: '1080P', fps: '30FPS', bitrate: '3.9Mbps', offline: false, streamUrl: SAMPLE_STREAM_URL },
  { id: 'CAM_07', name: 'PHARMACY', resolution: '1080P', fps: '30FPS', bitrate: '3.5Mbps', offline: false, streamUrl: SAMPLE_STREAM_URL },
  { id: 'CAM_08', name: 'LOADING_DOCK', resolution: '1080P', fps: '15FPS', bitrate: '2.1Mbps', offline: false, streamUrl: SAMPLE_STREAM_URL },
  { id: 'CAM_09', name: 'FEED_OFFLINE', resolution: '-', fps: '-', bitrate: '-', offline: true },
];

const CameraFeed = ({ cam }: { cam: Camera }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play workaround and setup for when real live feeds attached
  useEffect(() => {
    if (videoRef.current && cam.streamUrl && !cam.offline) {
      videoRef.current.play().catch((e) => console.log('Autoplay blocked', e));
    }
  }, [cam.streamUrl, cam.offline]);

  if (cam.offline) {
    return (
      <div className="bg-[#121826] border border-slate-800 flex flex-col items-center justify-center relative w-full h-full min-h-[160px]">
        <CameraOff className="w-8 h-8 text-slate-600 mb-2" />
        <span className="text-[10px] text-slate-600 font-bold tracking-widest uppercase">Feed_Offline</span>
      </div>
    );
  }

  const borderClass = cam.alert ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-slate-800';

  return (
    <div className={`relative bg-slate-950 border ${borderClass} overflow-hidden w-full h-full group flex`}>
      {/* Real Video Element capable of stream */}
      <video
        ref={videoRef}
        src={cam.streamUrl}
        className="w-full h-full object-cover opacity-60"
        autoPlay
        muted
        loop
        playsInline
      />
      
      {/* Alert red tint */}
      {cam.alert && (
        <div className="absolute inset-0 bg-red-500/10 pointer-events-none mix-blend-color"></div>
      )}

      {/* Bounding Boxes */}
      {cam.boxes?.map(box => (
        <div 
          key={box.id} 
          className={`absolute border-2 ${box.status === 'NORMAL' ? 'border-blue-400' : box.status === 'UNKNOWN' ? 'border-orange-400' : 'border-red-500'} pointer-events-none transition-all duration-300`}
          style={{ left: box.x, top: box.y, width: box.w, height: box.h }}
        >
          <div className={`absolute -top-5 left-0 text-[8px] font-bold px-1 whitespace-nowrap
            ${box.status === 'NORMAL' ? 'bg-blue-400/20 text-blue-300' : box.status === 'UNKNOWN' ? 'bg-orange-400/20 text-orange-300' : 'bg-red-500/80 text-white'}
          `}>
            {box.id} &bull; {box.label}
          </div>
        </div>
      ))}

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent flex justify-between items-end">
        <div className="flex items-center space-x-1">
          <span className={`w-1.5 h-1.5 ${cam.alert ? 'bg-red-500' : 'bg-orange-500'} mr-1 animate-pulse`}></span>
          <div>
            <div className="text-[9px] text-slate-300 uppercase tracking-widest">
              {cam.id} &bull; {cam.resolution} &bull; {cam.fps} &bull; {cam.bitrate}
            </div>
            <div className={`text-xs font-bold tracking-wider ${cam.alert ? 'text-red-400' : 'text-slate-100'} uppercase mt-0.5`}>
              {cam.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CameraGrid = ({ view }: { view: CameraView }) => {
  const gridClass = view === '3x3' ? 'grid-cols-3' : 'grid-cols-2';
  const visibleCameras = view === '3x3' ? CAMERAS : CAMERAS.slice(0, 4);

  return (
    <div className={`grid ${gridClass} gap-3 h-full overflow-hidden`}>
      {visibleCameras.map(cam => (
        <CameraFeed key={cam.id} cam={cam} />
      ))}
    </div>
  );
};
