import { useState, useMemo, useRef } from 'react';
import { 
  Search, Gamepad2, X, Maximize2, Minimize2, 
  Home, TrendingUp, Clock, Star, 
  Flame, Zap, Trophy, Settings,
  ChevronLeft, ChevronRight,
  User, Bell, Heart, Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

const CATEGORIES = [
  { id: 'all', name: 'All Games', icon: Home },
  { id: 'trending', name: 'Trending', icon: TrendingUp },
  { id: 'new', name: 'New', icon: Clock },
  { id: 'top', name: 'Top Rated', icon: Star },
  { id: 'action', name: 'Action', icon: Flame },
  { id: 'arcade', name: 'Arcade', icon: Zap },
  { id: 'sports', name: 'Sports', icon: Trophy },
];

const AdPlaceholder = ({ className = "", label = "ADVERTISEMENT" }) => (
  <div className={`bg-zinc-900/50 border border-zinc-800/50 rounded-xl flex items-center justify-center text-[10px] font-bold text-zinc-600 tracking-widest uppercase ${className}`}>
    {label}
  </div>
);

const GameRow = ({ title, games, onSelect }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-10 group/row">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-lg font-bold tracking-tight text-zinc-200">{title}</h3>
        <div className="flex gap-2 md:opacity-0 group-hover/row:opacity-100 transition-opacity">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-emerald-500 transition-all border border-zinc-700/50 shadow-lg"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-emerald-500 transition-all border border-zinc-700/50 shadow-lg"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto custom-scrollbar pb-4 px-2 -mx-2 snap-x"
      >
        {games.map((game) => (
          <motion.div
            key={game.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => onSelect(game)}
            className="flex-none w-48 sm:w-56 aspect-[4/3] bg-zinc-900 rounded-xl overflow-hidden cursor-pointer border border-zinc-800 hover:border-emerald-500/50 transition-all snap-start shadow-lg"
          >
            <div className="relative h-full w-full">
              <img 
                src={game.thumbnail} 
                alt={game.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-3 w-full">
                <p className="text-sm font-bold text-white truncate drop-shadow-md">{game.title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const filteredGames = useMemo(() => {
    return gamesData.filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-zinc-100 font-sans selection:bg-emerald-500/30 flex">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-[#0b0b0d] border-right border-zinc-800/50 z-50 transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-16 flex items-center px-6 gap-3 border-b border-zinc-800/50">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shrink-0">
            <Gamepad2 className="text-zinc-950 w-5 h-5" />
          </div>
          {isSidebarOpen && <span className="font-black text-xl tracking-tighter">PLAY<span className="text-emerald-500">HUB</span></span>}
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                activeCategory === cat.id 
                  ? 'bg-emerald-500/10 text-emerald-500' 
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
              }`}
            >
              <cat.icon size={20} className="shrink-0" />
              {isSidebarOpen && <span className="font-semibold text-sm">{cat.name}</span>}
            </button>
          ))}
          
          <div className="pt-6 mt-6 border-t border-zinc-800/50">
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 transition-all">
              <Settings size={20} className="shrink-0" />
              {isSidebarOpen && <span className="font-semibold text-sm">Settings</span>}
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#0b0b0d]/80 backdrop-blur-md border-b border-zinc-800/50">
          <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
            <div className="flex items-center gap-4 flex-1">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400"
              >
                <Menu size={20} />
              </button>
              
              <div className="relative w-full max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search games and categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2.5 hover:bg-zinc-800 rounded-full text-zinc-400 transition-colors">
                <Bell size={20} />
              </button>
              <button className="p-2.5 hover:bg-zinc-800 rounded-full text-zinc-400 transition-colors">
                <Heart size={20} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-full font-bold text-sm transition-all shadow-lg shadow-emerald-500/20">
                <User size={18} />
                <span>Login</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-[1600px] mx-auto px-6 py-8">
          {/* Top Ad Banner */}
          <AdPlaceholder className="w-full h-24 mb-10" label="LEADERBOARD AD" />

          {/* Hero Banner */}
          <section className="mb-12 relative group">
            <div className="relative h-[300px] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070" 
                alt="Featured Game" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center p-12">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-emerald-500 text-zinc-950 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Featured</span>
                  <span className="text-zinc-400 text-xs font-bold">4000+ games online</span>
                </div>
                <h2 className="text-5xl font-black mb-4 tracking-tighter leading-none">WELCOME TO <br/><span className="text-emerald-500">PLAYHUB</span></h2>
                <p className="text-zinc-400 text-lg max-w-md mb-8 font-medium">
                  No install needed. Play on any device. Play with friends. All for free.
                </p>
                <div className="flex gap-4">
                  <button className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-xl font-black transition-all shadow-xl shadow-emerald-500/20">
                    PLAY NOW
                  </button>
                  <button className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-black transition-all">
                    BROWSE ALL
                  </button>
                </div>
              </div>
            </div>
          </section>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Game Sections */}
            <div className="flex-1 min-w-0">
              <GameRow 
                title="Top picks for you" 
                games={filteredGames} 
                onSelect={setSelectedGame} 
              />
              
              <AdPlaceholder className="w-full h-32 mb-10" label="IN-FEED AD" />

              <GameRow 
                title="Featured games" 
                games={[...filteredGames].reverse()} 
                onSelect={setSelectedGame} 
              />

              <GameRow 
                title="New games" 
                games={filteredGames} 
                onSelect={setSelectedGame} 
              />
            </div>

            {/* Sidebar Ads/Widgets */}
            <aside className="w-full lg:w-80 shrink-0 space-y-6">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <h4 className="font-black text-sm mb-4 tracking-widest text-zinc-500 uppercase">Leaderboard</h4>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`w-6 text-xs font-bold ${i === 1 ? 'text-emerald-500' : 'text-zinc-600'}`}>{i}</span>
                        <div className="w-8 h-8 rounded-full bg-zinc-800" />
                        <span className="text-sm font-bold text-zinc-300">Player_{i}</span>
                      </div>
                      <span className="text-xs font-mono text-zinc-500">{10000 - i * 1000}</span>
                    </div>
                  ))}
                </div>
              </div>

              <AdPlaceholder className="w-full h-[600px]" label="SKYSCRAPER AD" />
            </aside>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-900 py-16 mt-20 bg-[#08080a]">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="text-emerald-500 w-6 h-6" />
                  <span className="font-black text-xl tracking-tighter">PLAY<span className="text-emerald-500">HUB</span></span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  The ultimate collection of unblocked games. No downloads, no blocks, just pure fun on any device.
                </p>
              </div>
              <div>
                <h5 className="font-bold mb-6 text-zinc-200">Platform</h5>
                <ul className="space-y-3 text-sm text-zinc-500">
                  <li><a href="#" className="hover:text-emerald-500 transition-colors">New Games</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition-colors">Popular Games</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition-colors">Categories</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition-colors">Random Game</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-6 text-zinc-200">Support</h5>
                <ul className="space-y-3 text-sm text-zinc-500">
                  <li><a href="#" className="hover:text-emerald-500 transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition-colors">FAQ</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition-colors">Bug Report</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-6 text-zinc-200">Legal</h5>
                <ul className="space-y-3 text-sm text-zinc-500">
                  <li><a href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-emerald-500 transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-zinc-600">© 2026 PlayHub Games. All rights reserved.</p>
              <div className="flex gap-6">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800" />
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800" />
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800" />
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGame(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            
            <motion.div
              layoutId={selectedGame.id}
              className={`relative bg-[#0b0b0d] border border-zinc-800 rounded-none sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${
                isFullscreen ? 'w-full h-full' : 'w-full max-w-6xl aspect-video max-h-[95vh]'
              }`}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="text-zinc-950 w-5 h-5" />
                  </div>
                  <h3 className="font-black text-lg tracking-tight">{selectedGame.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Game Viewport Area */}
              <div className="flex-1 flex flex-col lg:flex-row bg-black relative">
                <div className="flex-1 relative">
                  <iframe
                    src={selectedGame.iframeUrl}
                    className="w-full h-full border-none"
                    title={selectedGame.title}
                    allow="accelerometer *; ambient-light-sensor *; autoplay *; camera *; clipboard-read *; clipboard-write *; encrypted-media *; fullscreen *; geolocation *; gyroscope *; local-network-access *; magnetometer *; microphone *; midi *; payment *; picture-in-picture *; screen-wake-lock *; speaker *; sync-xhr *; usb *; vibrate *; vr *; web-share *"
                    sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups-to-escape-sandbox"
                  />
                </div>
                
                {/* Side Ad in Modal (similar to CrazyGames) */}
                {!isFullscreen && (
                  <div className="w-full lg:w-80 bg-[#0b0b0d] border-l border-zinc-800 p-4 hidden lg:flex flex-col gap-4">
                    <AdPlaceholder className="flex-1" label="SIDE AD" />
                    <div className="h-48 bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
                      <h4 className="text-xs font-black text-zinc-500 uppercase mb-2">Up Next</h4>
                      <div className="flex gap-3">
                        <div className="w-16 h-16 bg-zinc-800 rounded-lg shrink-0" />
                        <div className="flex-1">
                          <div className="h-3 w-20 bg-zinc-800 rounded mb-2" />
                          <div className="h-2 w-12 bg-zinc-800 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Ad */}
              {!isFullscreen && (
                <div className="h-24 border-t border-zinc-800 bg-zinc-900/30 p-2">
                  <AdPlaceholder className="h-full" label="FOOTER AD" />
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
