import React from 'react'

import { Accessibility } from 'lucide-react'

const Footer = () => {
  return (
   <footer className="py-12 bg-card border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Accessibility className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">JOINT HANDS</span>
            </div>
            <p className="text-muted-foreground">
              © 2025 JointHands. Empowering abilities, creating opportunities.
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer