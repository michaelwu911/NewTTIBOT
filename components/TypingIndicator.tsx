export function TypingIndicator() {
  return (
    <div className="inline-flex items-center gap-1 px-4 py-2.5 bg-white border border-blue-100 rounded-2xl">
      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  )
}

