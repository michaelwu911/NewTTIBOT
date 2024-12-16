"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type MessageProps = {
  content: string
  isUser: boolean
  timestamp: Date
  status?: 'sending' | 'sent' | 'processing' | 'error'
  showAvatar?: boolean
}

export function Message({ 
  content, 
  isUser, 
  timestamp, 
  status, 
  showAvatar = true,
}: MessageProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div 
      className={cn(
        "flex items-end gap-2 px-4 group",
        isUser ? "flex-row-reverse" : "flex-row",
        "my-2"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showAvatar ? (
        <Avatar className="w-8 h-8 mb-1 flex-shrink-0">
          {isUser ? (
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          ) : (
            <AvatarImage src="/bot-avatar.png" alt="Bot" />
          )}
          <AvatarFallback>{isUser ? 'U' : 'B'}</AvatarFallback>
        </Avatar>
      ) : (
        <div className="w-8 flex-shrink-0" />
      )}
      <div className="flex flex-col max-w-[70%] relative">
        <div
          className={cn(
            "px-4 py-2.5 rounded-2xl",
            isUser ? "bg-blue-600 text-white" : "bg-white border border-gray-200",
          )}
        >
          <p className="whitespace-pre-wrap text-[15px] leading-normal">{content}</p>
        </div>
        {isHovered && (
          <span className="text-xs text-gray-500 mt-1">
            {new Date(timestamp).toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  )
}
