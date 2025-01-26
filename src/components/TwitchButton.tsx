import React from 'react'
import { Twitch } from 'lucide-react'

interface TwitchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  as?: React.ElementType
  href?: string
}

const TwitchButton: React.FC<TwitchButtonProps> = ({ children, as, href, ...props }) => {
    const Component = as || 'button'
  return (
    <Component
      href={href}
      className="inline-flex items-center justify-center px-4 py-2 bg-[#9146FF] text-white font-semibold rounded hover:bg-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#9146FF] focus:ring-opacity-50 transition-colors duration-200"
      {...props}
    >
      <Twitch className="w-5 h-5 mr-2" />
      {children}
    </Component>
  )
}

export default TwitchButton

