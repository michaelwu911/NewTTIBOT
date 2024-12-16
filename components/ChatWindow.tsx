"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, ChevronDown, Menu } from 'lucide-react'
import { Message } from "./Message"
import { TypingIndicator } from "./TypingIndicator"

type MessageType = {
  id: string
  role: 'user' | 'bot'
  content: string
  timestamp: Date
  status?: 'sending' | 'sent' | 'processing' | 'error'
}

export function ChatWindow({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const [messages, setMessages] = useState<MessageType[]>([
    { 
      id: '1', 
      role: 'bot', 
      content: "Hello! How can I assist you today?", 
      timestamp: new Date(),
      status: 'sent'
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (messages[messages.length - 1]?.role === 'user') {
      scrollToBottom()
    }
  }, [messages])

  useEffect(() => {
    const chatContainer = chatContainerRef.current
    if (chatContainer) {
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = chatContainer
        const isScrolledUp = scrollTop < scrollHeight - clientHeight - 100
        setShowScrollButton(isScrolledUp)
      }
      chatContainer.addEventListener('scroll', handleScroll)
      return () => chatContainer.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage: MessageType = {
        id: Date.now().toString(),
        role: 'user',
        content: input.trim(),
        timestamp: new Date(),
        status: 'sent'
      }
      
      setMessages(prev => [...prev, userMessage])
      setInput("")
      setIsTyping(true)

      // Simulate bot response
      setTimeout(() => {
        const botMessage: MessageType = {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          content: "This is a simulated response to your message.",
          timestamp: new Date(),
          status: 'sent'
        }
        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
      }, 2000)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 md:hidden">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-semibold">Chat</h1>
        <div className="w-6" /> {/* Placeholder for balance */}
      </div>
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto py-6"
      >
        <div className="space-y-1">
          {messages.map((message, index) => (
            <Message
              key={message.id}
              content={message.content}
              isUser={message.role === 'user'}
              timestamp={message.timestamp}
              status={message.status}
              showAvatar={index === 0 || messages[index - 1].role !== message.role}
            />
          ))}
        </div>
        {isTyping && (
          <div className="pl-16 mt-2">
            <TypingIndicator />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="px-4 pb-4 pt-2 bg-gray-50">
        {showScrollButton && (
          <div className="flex justify-center mb-2">
            <Button
              size="icon"
              className="rounded-full w-10 h-10 bg-white hover:bg-gray-100 text-gray-600 shadow-md transition-all duration-200"
              onClick={scrollToBottom}
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        )}
        <div className="border-t border-gray-200 bg-white rounded-lg shadow-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage()
            }}
            className="flex items-end space-x-2 p-4 w-full"
          >
            <div className="relative flex-1">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full resize-none border-gray-200 focus:border-blue-400 transition-colors duration-200 min-h-[44px] py-3 px-4 pr-12"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
              />
            </div>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 h-[44px] px-4"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
