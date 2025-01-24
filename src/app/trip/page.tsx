'use client'
import TripPlannerForm from '@/components/trip-planner-form'
import { motion } from 'framer-motion'
import { Plane, Map, Globe2 } from 'lucide-react'

export default function TripPage() {
  return (
    <div className="min-h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-purple-900 to-gray-900">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-blue-400/20"
          animate={{ 
            rotate: 360,
            y: [0, 20, 0]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Plane className="w-16 h-16" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 right-10 text-purple-400/20"
          animate={{ 
            rotate: -360,
            y: [0, -20, 0]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Map className="w-20 h-20" />
        </motion.div>
        
        <motion.div
          className="absolute top-1/2 right-1/4 text-pink-400/20"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Globe2 className="w-24 h-24" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative px-4 py-12 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            AI-Powered Travel Planning
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Experience the future of travel planning with our AI assistant. 
            Get personalized itineraries, local insights, and expert recommendations in seconds.
          </motion.p>
        </motion.div>

        {/* Features */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {[
            {
              icon: <Plane className="w-6 h-6" />,
              title: "Smart Itineraries",
              description: "AI-crafted travel plans tailored to your preferences"
            },
            {
              icon: <Map className="w-6 h-6" />,
              title: "Local Insights",
              description: "Discover hidden gems and authentic experiences"
            },
            {
              icon: <Globe2 className="w-6 h-6" />,
              title: "Global Coverage",
              description: "Plan trips to any destination worldwide"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl bg-gray-800/30 border border-gray-700/50 backdrop-blur-sm"
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(31, 41, 55, 0.4)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-gray-700/50 text-blue-400">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <TripPlannerForm />
        </motion.div>
      </div>
    </div>
  )
}

