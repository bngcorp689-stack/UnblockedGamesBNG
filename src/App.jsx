import { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const filteredGames = useMemo(() => {
    return gamesData.filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Gamepad2 className="text-zinc-950 w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">
              Unblocked<span className="text-emerald-500">Games</span>
            </h1>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
            />
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-emerald-500 transition-colors">New</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Popular</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Categories</a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800">
            <img 
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070" 
              alt="Gaming Background" 
              className="w-full h-full object-cover opacity-40"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 sm:p-12">
              <h2 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight">Level Up Your Break</h2>
              <p className="text-zinc-400 text-lg max-w-xl">
                The ultimate collection of unblocked games. No downloads, no blocks, just pure fun.
              </p>
            </div>
          </div>
        </section>

        {/* Games Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">All Games</h3>
            <span className="text-sm text-zinc-500">{filteredGames.length} games found</span>
          </div>

          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <motion.div
                  key={game.id}
                  layoutId={game.id}
                  onClick={() => setSelectedGame(game)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  className="group cursor-pointer bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all shadow-xl hover:shadow-emerald-500/10"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors" />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <h4 className="font-medium group-hover:text-emerald-500 transition-colors">{game.title}</h4>
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-all">
                      <Gamepad2 className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                <Search className="w-6 h-6 text-zinc-600" />
              </div>
              <h4 className="text-lg font-medium mb-2">No games found</h4>
              <p className="text-zinc-500">Try searching for something else.</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Gamepad2 className="text-emerald-500 w-6 h-6" />
            <span className="font-bold">UnblockedGames</span>
          </div>
          <div className="flex gap-8 text-sm text-zinc-500">
            <a href="#" className="hover:text-zinc-300">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300">Terms of Service</a>
            <a href="#" className="hover:text-zinc-300">Contact Us</a>
          </div>
          <p className="text-sm text-zinc-600">© 2026 Unblocked Games Hub. All rights reserved.</p>
        </div>
      </footer>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGame(null)}
              className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm"
            />
            
            <motion.div
              layoutId={selectedGame.id}
              className={`relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${
                isFullscreen ? 'w-full h-full' : 'w-full max-w-5xl aspect-video max-h-[90vh]'
              }`}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="text-zinc-950 w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg">{selectedGame.title}</h3>
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

              {/* Game Iframe */}
              <div className="flex-1 bg-black relative">
                <iframe
                  src={selectedGame.iframeUrl}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allow="autoplay; fullscreen; keyboard"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
