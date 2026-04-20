import { useState, useEffect } from 'react';
import { Search, Download, ExternalLink, Package, Star, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ModrinthProject {
  project_id: string;
  title: string;
  description: string;
  icon_url: string;
  downloads: number;
  slug: string;
  author: string;
  latest_version?: string;
}

export default function PluginBrowser() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ModrinthProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPlugins = async (val: string) => {
    if (!val.trim()) return;
    setLoading(true);
    setError(null);
    try {
      // Modrinth Search API
      const response = await fetch(`https://api.modrinth.com/v2/search?query=${encodeURIComponent(val)}&facets=[["categories:paper"],["project_type:mod"]]`);
      const data = await response.json();
      
      const mappedResults: ModrinthProject[] = data.hits.map((hit: any) => ({
        project_id: hit.project_id,
        title: hit.title,
        description: hit.description,
        icon_url: hit.icon_url,
        downloads: hit.downloads,
        slug: hit.slug,
        author: hit.author,
      }));
      
      setResults(mappedResults);
    } catch (err) {
      setError('Koneksi ke repository (Modrinth) terputus.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) searchPlugins(query);
      else setResults([]);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-1">Global Repository Integration</h4>
          <h3 className="text-3xl font-bold text-white tracking-tight">Plugin Archive</h3>
          <p className="text-white/30 text-xs mt-2 max-w-md">Menghubungkan Anda langsung ke ribuan plugin di Modrinth & Hangar tanpa harus meninggalkan dashboard.</p>
        </div>
        
        <div className="w-full md:w-96 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Cari Essentials, LuckPerms, Geyser..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
          />
        </div>
      </header>

      <div className="flex gap-4">
        <div className="px-3 py-1 bg-cyan-500 text-black rounded text-[10px] font-bold uppercase tracking-widest">Modrinth</div>
        <div className="px-3 py-1 bg-white/5 text-white/40 rounded text-[10px] font-bold uppercase tracking-widest">Hangar (Syncing...)</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-6 h-48 animate-pulse" />
            ))
          ) : results.length > 0 ? (
            results.map((plugin, idx) => (
              <motion.div
                key={plugin.project_id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 group/card transition-all flex flex-col relative overflow-hidden"
              >
                <div className="absolute right-0 top-0 w-24 h-24 bg-cyan-500/5 blur-3xl pointer-events-none group-hover/card:bg-cyan-500/10 transition-colors" />
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-black border border-white/10 overflow-hidden shadow-2xl flex-shrink-0">
                    <img 
                      src={plugin.icon_url || `https://picsum.photos/seed/${plugin.slug}/64/64`} 
                      alt={plugin.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate group-hover/card:text-cyan-400 transition-colors">{plugin.title}</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">BY {plugin.author}</p>
                  </div>
                </div>

                <p className="text-xs text-white/50 line-clamp-2 mb-6 flex-1 leading-relaxed">
                  {plugin.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3 text-[10px] font-bold text-white/30">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-cyan-500/50" />
                      {plugin.downloads.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 uppercase tracking-tighter">
                      <Package size={12} />
                      Jar
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <a 
                      href={`https://modrinth.com/mod/${plugin.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 text-white/20 hover:text-white rounded-lg transition-colors"
                    >
                      <ExternalLink size={14} />
                    </a>
                    <button className="px-4 py-2 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-cyan-400 transition-all active:scale-95">
                      Download
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : !query ? (
              <div className="col-span-full py-32 flex flex-col items-center justify-center text-white/10 text-center">
                <Package size={80} className="mb-6 opacity-40" />
                <h4 className="text-lg font-bold uppercase tracking-[0.2em]">Cari Plugin Sekarang</h4>
                <p className="text-sm max-w-xs mt-2 px-10">Mulai mengetik untuk mencari ribuan alat optimasi untuk server PaperMC Anda.</p>
              </div>
          ) : (
            <div className="col-span-full py-32 text-center">
               <AlertCircle size={40} className="mx-auto mb-4 text-white/20" />
               <p className="text-white/40 uppercase font-black text-xs tracking-widest">Data tidak ditemukan</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
