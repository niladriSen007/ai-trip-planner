import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Card } from './ui/card'
import { Compass, Calendar, Bus, Landmark, Sparkles, Image as ImageIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

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
            p: ({ children, node }) => {
             /*  const hasImage = node?.children[0]?.type === 'image'
              if (hasImage) {
                return <>{children}</>
              } */
              return (
                <motion.p 
                  variants={item}
                  className="text-gray-300 mb-4 hover:text-white transition-colors duration-300"
                >
                  {children}
                </motion.p>
              )
            },
           /*  img: ({ src, alt }) => {
              if (!src) return null
              
              return (
                <motion.div
                  variants={item}
                  className="relative w-full h-64 my-6 rounded-xl overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  <Image
                    src={src}
                    alt={alt || 'Travel destination'}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {alt && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <span className="text-white text-sm">{alt}</span>
                    </div>
                  )}
                </motion.div>
              )
            }, */
            h3: ({ children }) => (
              <motion.div 
                variants={item}
                className="flex items-center gap-2 mt-6 mb-3"
              >
                <ImageIcon className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">{children}</h3>
              </motion.div>
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