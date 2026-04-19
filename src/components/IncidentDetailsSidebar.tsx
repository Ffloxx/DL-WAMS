import { Fingerprint, AlertCircle, User, ShieldAlert } from 'lucide-react';

export const IncidentDetailsSidebar = () => {
  return (
    <div className="flex flex-col h-full bg-[#0d121c] overflow-y-auto">
      {/* Subject Analysis Section */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase">Subject Analysis</h2>
          <Fingerprint className="w-5 h-5 text-slate-600" />
        </div>

        <div className="flex space-x-4 mb-6">
          <div className="w-16 h-16 bg-slate-800 border border-slate-700/50 flex items-center justify-center shrink-0">
             <User className="w-8 h-8 text-slate-500" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[10px] text-slate-500 font-mono mb-1">MATCHED IDENTITY</span>
            <span className="text-sm font-bold text-slate-200 tracking-wider">ELIAS_VANCE.USR</span>
            <span className="text-[10px] text-blue-400 font-mono mt-1">CONFIDENCE 94.2% Match</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-2">Clothing Description</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Black oversized hoodie (synthetic), cargo trousers (dark slate), high-traction footwear. Carrying metallic object in right jacket pocket.
          </p>
        </div>

        <div>
           <div className="flex justify-between items-end mb-2">
             <h3 className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Risk Score</h3>
             <span className="text-lg font-bold text-orange-400">78 / 100</span>
           </div>
           <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-2">
             <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 w-[78%]"></div>
           </div>
           <p className="text-[10px] font-bold text-orange-500 tracking-widest uppercase text-right">High Priority Alert</p>
        </div>
      </div>

      {/* Neural Log Entries */}
      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-6">Neural Log Entries</h2>
        
        <div className="relative border-l border-slate-800 ml-2 space-y-6">
          <div className="relative pl-6">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-[#0d121c] flex items-center justify-center">
              <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
            </div>
            <div className="text-[10px] font-mono text-slate-500 mb-1">23:42:01</div>
            <div className="text-xs text-slate-300 leading-snug">
              Unauthorized access attempt at Gate 02 detected via gait analysis.
            </div>
          </div>

          <div className="relative pl-6">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-[#0d121c] flex items-center justify-center">
              <User className="w-3 h-3 text-slate-500" />
            </div>
            <div className="text-[10px] font-mono text-slate-500 mb-1">23:42:08</div>
            <div className="text-xs text-slate-300 leading-snug">
              Subject identity cross-referenced with regional exclusion database.
            </div>
          </div>

          <div className="relative pl-6">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-[#0d121c] flex items-center justify-center">
              <AlertCircle className="w-3 h-3 text-slate-500" />
            </div>
            <div className="text-[10px] font-mono text-slate-500 mb-1">23:42:12</div>
            <div className="text-xs text-slate-300 leading-snug">
               Vitals estimation: Elevated heart rate (approx 112 BPM) suggested by thermal flux.
            </div>
          </div>
        </div>
      </div>

      {/* Auto Response Box */}
      <div className="p-4 m-4 border border-slate-800 bg-slate-900/50 flex justify-between items-center rounded-sm">
        <div className="flex items-center space-x-3">
          <ShieldAlert className="w-5 h-5 text-blue-500" />
          <div className="flex flex-col">
             <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">Auto-Response:</span>
             <span className="text-xs font-bold tracking-wider text-slate-200">STANDBY</span>
          </div>
        </div>
        <button className="text-xs font-bold tracking-widest text-slate-300 hover:text-white uppercase border-b border-slate-500 pb-0.5 transition-colors">
          Dispatch Units
        </button>
      </div>

    </div>
  );
};
