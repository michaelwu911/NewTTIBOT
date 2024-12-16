"use client"

import { Plus } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export function WorkspaceList({ isCollapsed = false }) {
  return (
    <Accordion type="single" collapsible defaultValue="general" className="space-y-2">
      <AccordionItem value="general" className="border-none">
        <AccordionTrigger className={`hover:no-underline py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors duration-200 ${isCollapsed ? 'justify-center' : ''}`}>
          {isCollapsed ? (
            <span className="text-lg font-medium text-blue-800">G</span>
          ) : (
            <span className="text-lg font-medium text-blue-800">General</span>
          )}
        </AccordionTrigger>
        <AccordionContent>
          <div className={`space-y-1 ${isCollapsed ? '' : 'ml-2'}`}>
            <Button
              variant="ghost"
              className={`w-full justify-start text-base font-normal hover:bg-blue-50 transition-colors duration-200 ${isCollapsed ? 'justify-center px-2' : ''}`}
            >
              {isCollapsed ? 'C1' : 'Chat 1'}
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start text-base font-normal hover:bg-blue-50 transition-colors duration-200 ${isCollapsed ? 'justify-center px-2' : ''}`}
            >
              {isCollapsed ? 'C2' : 'Chat 2'}
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start text-base font-normal hover:bg-blue-50 transition-colors duration-200 ${isCollapsed ? 'justify-center px-2' : ''}`}
            >
              <Plus className={`h-4 w-4 ${isCollapsed ? '' : 'mr-2'}`} />
              {!isCollapsed && 'New Chat'}
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

