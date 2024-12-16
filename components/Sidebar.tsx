"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Plus, Search, X } from 'lucide-react'
import { WorkspaceList } from "./WorkspaceList"
import { UserProfile } from "./UserProfile"

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        onClose()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [onClose])

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-72 bg-gradient-to-b from-blue-50 to-white border-r border-blue-100 transition-all duration-300 ease-in-out transform 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          ${isCollapsed ? 'md:w-20' : 'md:w-72'} 
          md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 md:hidden">
          <h2 className="text-lg font-semibold">Workspaces</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className={`flex-1 overflow-hidden ${isCollapsed ? 'md:px-2' : 'md:px-4'}`}>
          <div className={`flex flex-col space-y-4 p-4 ${isCollapsed ? 'md:items-center' : ''}`}>
            <Button 
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 
                ${isCollapsed ? 'md:w-10 md:h-10 md:p-0' : ''}`}
              onClick={() => {}}
            >
              <Plus className={`h-4 w-4 ${isCollapsed ? '' : 'mr-2'}`} />
              {!isCollapsed && <span>Add Workspace</span>}
            </Button>
            {!isCollapsed && (
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Search" 
                  className="pl-10 bg-white border-blue-200 focus:border-blue-400 transition-colors duration-200 w-full"
                />
              </div>
            )}
          </div>
          <div className={`flex-1 overflow-y-auto ${isCollapsed ? 'md:px-2' : 'md:px-4'}`}>
            <WorkspaceList isCollapsed={isCollapsed} />
          </div>
        </div>
        <div className={`mt-auto p-4 ${isCollapsed ? 'md:p-2' : ''}`}>
          <UserProfile isCollapsed={isCollapsed} />
        </div>
      </aside>

      <div 
        className={`hidden md:block fixed top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out z-50
          ${isCollapsed ? 'left-20' : 'left-72'}`}
      >
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-8 h-8 bg-white border border-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50 shadow-sm -ml-4 transition-colors duration-200"
          onClick={toggleCollapse}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </>
  )
}

