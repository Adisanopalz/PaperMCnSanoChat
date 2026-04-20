import { useState } from 'react';
import { 
  Download, 
  Search, 
  MessageSquare, 
  Github, 
  ExternalLink, 
  Server, 
  CheckCircle2, 
  ChevronRight,
  Zap,
  Info,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PAPER_DATA } from './constants';
import SanoChat from './components/SanoChat';

export default function App() {
  const [search, setSearch] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredVersions = PAPER_DATA.versions.filter(v => 
    v.version.toLowerCase().includes(search.toLowerCase())
  );

  const latestVersion = PAPER_DATA.versions.find(v => v.version === PAPER_DATA.latest) || PAPER_DATA.versions[0];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-dark-bg text-slate-200 overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Sidebar: SanoChat AI (Left) */}
      <aside className="hidden lg:flex w-[380px] bg-dark-sidebar border-r border-white/5 flex-col overflow-hidden shrink-0">
        <SanoChat isSidebar />
      </aside>

      {/* Main Content (Right) */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto scrollbar-thin">
        
        {/* Header */}
        <header className="h-16 shrink-0 border-b border-white/5 flex items-center justify-between px-6 md:px-8 bg-black/40 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold tracking-tighter text-white uppercase flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-cyan-600 flex items-center justify-center lg:hidden">
                <Server size={18} className="text-white" />
              </div>
              <span className="hidden sm:inline">Sano PaperMC</span>
              <span className="sm:hidden">Sano PMC</span>
            </h1>
            <nav className="hidden md:flex gap-6 text-[10px] font-bold tracking-widest uppercase">
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Software</a>
              <a href="#" className="text-white/30 hover:text-white/60 transition-colors">Plugins</a>
              <a href="#" className="text-white/30 hover:text-white/60 transition-colors">Config</a>
              <a href="#" className="text-white/30 hover:text-white/60 transition-colors">API</a>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-[10px] text-white/20 tracking-[0.2em] font-mono">SYS.VER: 4.2.0-SANO</div>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/40 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="lg:hidden fixed inset-0 top-16 bg-dark-bg z-20 flex flex-col"
            >
              <div className="flex-1 overflow-y-auto">
                <SanoChat isSidebar />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full space-y-12">
          
          {/* Hero / Featured Download */}
          <section>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-900 px-8 py-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 group"
            >
              {/* Decorative elements */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex-1 text-center md:text-left">
                <span className="bg-white/20 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-[0.15em] mb-6 inline-block backdrop-blur-md">
                  Latest Stable Release
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 tracking-tighter">
                  Paper {latestVersion.version}
                </h2>
                <p className="text-white/80 text-base md:text-lg max-w-md mb-8 leading-relaxed">
                  Versi terbaru dengan perbaikan keamanan kritis dan optimasi performa mesin game Minecraft.
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <a 
                    href={latestVersion.url}
                    className="bg-white text-black px-8 py-4 rounded-xl font-bold shadow-2xl hover:bg-slate-100 flex items-center gap-3 group/btn transform active:scale-95 transition-all text-sm tracking-tight"
                  >
                    UNDUH SEKARANG
                    <Download size={18} className="group-hover/btn:translate-y-0.5 transition-transform" />
                  </a>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-cyan-700 bg-cyan-800 flex items-center justify-center text-[10px] font-bold text-white/50 overflow-hidden">
                        <img src={`https://picsum.photos/seed/user${i}/32/32`} alt="user" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                    <div className="pl-4 text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center">
                      +2.4k users
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 shrink-0">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-700">
                  <Server size={80} className="text-white/20 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-700" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-zinc-950 border border-white/5 p-4 rounded-xl shadow-2xl">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Verified Build</span>
                   </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Table: Version History */}
          <section className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-1">Archive Repository</h4>
                <h3 className="text-2xl font-bold text-white tracking-tight">Version History</h3>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-500 transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="Saring versi..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all w-full sm:w-48"
                  />
                </div>
                <div className="hidden sm:flex gap-1">
                  <button className="px-3 py-1.5 rounded bg-white/5 border border-white/5 text-[10px] font-bold text-white/40 hover:bg-white/10 transition-colors uppercase tracking-widest">Stable</button>
                  <button className="px-3 py-1.5 rounded bg-white/5 border border-white/5 text-[10px] font-bold text-white/40 hover:bg-white/10 transition-colors uppercase tracking-widest">Snapshots</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {filteredVersions.length > 0 ? (
                filteredVersions.slice(0, 10).map((v, idx) => (
                  <motion.div
                    key={v.version}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="version-row group/row"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center font-mono text-[10px] font-bold text-white/40 group-hover/row:border-cyan-500/30 group-hover/row:text-cyan-400 transition-all">
                        {v.version.split('.').slice(0, 2).join('.')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white flex items-center gap-2">
                          Paper-{v.version}
                          {v.version === PAPER_DATA.latest && (
                            <span className="text-[8px] font-black uppercase text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded border border-cyan-400/20">Active</span>
                          )}
                        </p>
                        <p className="text-[10px] text-white/30 uppercase tracking-tighter flex items-center gap-2 mt-1">
                          Build #{(idx + 100) * 3} • {(35 + idx).toFixed(1)}MB • SHA-256 Verified
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-white/20 hover:text-white transition-colors uppercase tracking-widest">
                        <Info size={14} />
                        Details
                      </button>
                      <a 
                        href={v.url}
                        className="px-5 py-2.5 bg-white/5 group-hover/row:bg-cyan-500 group-hover/row:text-black rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                      >
                        Download
                      </a>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-20 text-center text-white/20 uppercase tracking-[0.3em] font-bold text-xs">
                  No matches found in database
                </div>
              )}
              
              {filteredVersions.length > 10 && (
                <div className="mt-8 text-center">
                  <button className="text-[10px] text-white/20 uppercase font-black tracking-[0.3em] hover:text-cyan-400 transition-all border-b border-transparent hover:border-cyan-400/50 pb-1">
                    Discover all {filteredVersions.length} versions
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Footer Info */}
        <footer className="mt-auto p-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-white/20 uppercase tracking-[0.25em] font-bold bg-black/40">
          <p>© 2026 Sano Digital. Not affiliated with Mojang AB or PaperMC.</p>
          <div className="flex gap-8 items-center">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span>Network: Latency 14ms</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">Safety</a>
              <a href="#" className="hover:text-white transition-colors">Term of usage</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}


