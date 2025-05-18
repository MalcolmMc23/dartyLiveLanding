export default function StatusBadge() {
    return (
      <div className="flex justify-center mb-4">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-purple-500/30 shadow-lg">
          <div className="relative mr-2 flex items-center justify-center">
            <div className="absolute w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse-green"></div>
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full opacity-30"></div>
          </div>
          <span className="text-sm font-medium">1M+ Views</span>
        </div>
      </div>
    )
  }
  