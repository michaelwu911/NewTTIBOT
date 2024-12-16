"use client"

import { useState } from "react"
import { Sidebar } from "@/components/Sidebar"
import { ChatWindow } from "@/components/ChatWindow"

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <ChatWindow onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </main>
    </div>
  )
}

