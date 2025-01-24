import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Card } from './ui/card'
import { Compass, Calendar, Bus, Landmark, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

interface TripDisplayProps {
  plan: string
}

const TripDisplay: React.FC<TripDisplayProps> = ({ plan }) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    'Overview': <Compass className="w-6 h-6 text-blue-400" />,
    'Daily Itinerary': <Calendar className="w-6 h-6 text-purple-400" />,
    'Transportation Tips': <Bus className="w-6 h-6 text-green-400" />,
    'Must-See Attractions': <Landmark className="w-6 h-6 text-yellow-400" />,
    'Local Experiences': <Sparkles className="w-6 h-6 text-pink-400" />,
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <Card className="bg-transparent border-0 p-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <ReactMarkdown
          className="prose prose-invert max-w-none"
          components={{
            h2: ({ children }) => (
              <motion.div 
                variants={item}
                className="flex items-center gap-3 mt-8 mb-4 p-3 rounded-lg bg-gray-800/50 backdrop-blur-sm
                border border-gray-700/50 hover:bg-gray-800/70 transition-colors duration-300 text-gray-400"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  {iconMap[children as string]}
                </motion.div>
                <h2 className="text-2xl font-bold text-white m-0">{children}</h2>
              </motion.div>
            ),
            ul: ({ children }) => (
              <motion.ul 
                variants={item}
                className="list-disc pl-6 space-y-2 text-gray-300"
              >
                {children}
              </motion.ul>
            ),
            li: ({ children }) => (
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {children}
              </motion.li>
            ),
            p: ({ children }) => (
              <motion.p 
                variants={item}
                className="text-gray-300 mb-4 hover:text-white transition-colors duration-300"
              >
                {children}
              </motion.p>
            ),
          }}
        >
          {plan}
        </ReactMarkdown>
      </motion.div>
    </Card>
  )
}

export default TripDisplay