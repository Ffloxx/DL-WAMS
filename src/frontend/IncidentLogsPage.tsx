import { Calendar, Video, Bookmark, Download, Play, SkipBack, SkipForward, Maximize } from 'lucide-react';

const SAMPLE_STREAM_URL = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4";

export const IncidentLogsPage = () => {
  return (
    <main className="flex-1 flex flex-col p-6 overflow-y-auto space-y-6 min-h-0 bg-[#0b101a]">
      <header className="flex justify-between items-start border-b border-slate-800 pb-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-wider text-slate-100 uppercase">INCIDENT_ID: 8842-AX</h1>
          <div className="flex space-x-3 mt-3">
            <div className="flex items-center space-x-2 bg-slate-800/40 text-slate-400 px-3 py-1.5 rounded-sm border border-slate-700/50 text-xs font-mono">
              <Calendar className="w-3.5 h-3.5" />
              <span>OCT 24, 2023 | 23:42:01</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-800/40 text-slate-400 px-3 py-1.5 rounded-sm border border-slate-700/50 text-xs font-mono">
              <Video className="w-3.5 h-3.5" />
              <span>CAM_NORTH_ENTRANCE_02</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-sm border border-slate-600 transition-colors text-xs font-bold tracking-widest uppercase">
            <Bookmark className="w-4 h-4" />
            <span>Tag for Review</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-sm transition-colors text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <Download className="w-4 h-4" />
            <span>Export Clip</span>
          </button>
        </div>
      </header>

      <section className="flex-1 min-h-0 flex flex-col gap-4">
        {/* Main Video Player */}
        <div className="relative bg-black border border-slate-800 rounded-sm overflow-hidden flex-1 flex flex-col group">
          <video
            src={SAMPLE_STREAM_URL}
            className="w-full flex-1 object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
          
          <div className="absolute top-4 left-4 flex space-x-2 pointer-events-none">
            <div className="bg-orange-500/90 text-white text-[10px] font-bold px-2 py-1 flex items-center space-x-1 rounded-sm uppercase tracking-wider shadow-[0_0_10px_rgba(249,115,22,0.5)]">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              <span>Motion Detected</span>
            </div>
            <div className="bg-black/60 backdrop-blur-md text-slate-300 text-[10px] font-mono px-2 py-1 rounded-sm border border-slate-700/50">
              1080P | 60 FPS | 4.2 MBPS
            </div>
          </div>

          {/* Player controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[15%]"></div>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <div className="text-[11px] font-mono">00:42:15 / 01:12:00</div>
              <div className="flex space-x-4">
                <button className="hover:text-white"><SkipBack className="w-4 h-4 fill-current" /></button>
                <button className="hover:text-white"><Play className="w-4 h-4 fill-current" /></button>
                <button className="hover:text-white"><SkipForward className="w-4 h-4 fill-current" /></button>
              </div>
              <button className="hover:text-white"><Maximize className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Timeline thumbnails */}
        <div className="shrink-0 bg-slate-900/40 border border-slate-800/80 p-4 rounded-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase">Frame-by-Frame Timeline</h3>
            <span className="text-[10px] font-mono text-slate-500">AI DETECTION EVENTS [8 FOUND]</span>
          </div>
          
          <div className="grid grid-cols-6 gap-3">
            {[
              { time: '00:42:01', active: false },
              { time: '00:42:08*', active: true },
              { time: '00:42:15', active: false },
              { time: '00:42:22', active: false },
              { time: '00:42:30', active: false },
              { time: '00:42:38', active: false }
            ].map((frame, i) => (
              <div key={i} className="flex flex-col items-center gap-2 cursor-pointer">
                <div className={`aspect-video w-full bg-slate-950/80 border-2 overflow-hidden flex items-center justify-center transition-all ${frame.active ? 'border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.3)]' : 'border-slate-800 hover:border-slate-600'}`}>
                   {/* Thumbnail image placeholder - using generic test video frame if available, otherwise just dark gradient */}
                   <div className={`w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 ${frame.active ? 'mix-blend-color-burn bg-orange-900/40' : ''}`}></div>
                </div>
                <span className={`text-[10px] font-mono ${frame.active ? 'text-orange-400 font-bold' : 'text-slate-500'}`}>
                  {frame.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
