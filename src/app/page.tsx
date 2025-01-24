'use client'
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Globe2, Plane, Map, ArrowRight } from "lucide-react"

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-purple-900 to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-blue-400/10"
          animate={{ 
            rotate: 360,
            y: [0, 20, 0]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Plane className="w-24 h-24" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 right-10 text-purple-400/10"
          animate={{ 
            rotate: -360,
            y: [0, -20, 0]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Map className="w-32 h-32" />
        </motion.div>
        
        <motion.div
          className="absolute top-1/3 right-1/4 text-pink-400/10"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Globe2 className="w-40 h-40" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-4xl"
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            AI-Powered Travel Planning
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Experience the future of travel planning. Get personalized itineraries, local insights, 
            and expert recommendations in seconds.
          </motion.p>

          <motion.button
            onClick={() => router.push('/trip')}
            className="group relative inline-flex items-center justify-center px-8 py-4 mt-8
              text-lg font-medium text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
              rounded-full overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105
              transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative flex items-center gap-2">
              Start Planning
              <motion.div
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </span>
          </motion.button>

          {/* Features Grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {[
              {
                icon: <Plane className="w-8 h-8" />,
                title: "Smart Itineraries",
                description: "AI-crafted travel plans tailored to your preferences"
              },
              {
                icon: <Map className="w-8 h-8" />,
                title: "Local Insights",
                description: "Discover hidden gems and authentic experiences"
              },
              {
                icon: <Globe2 className="w-8 h-8" />,
                title: "Global Coverage",
                description: "Plan trips to any destination worldwide"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-gray-800/30 border border-gray-700/50 backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(31, 41, 55, 0.4)'
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-3 rounded-lg bg-gray-700/50 text-blue-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
