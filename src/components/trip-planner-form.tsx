"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { motion } from "framer-motion"
import { Calendar, Globe2, MapPin, Plane } from "lucide-react"
import React, { useState } from "react"
import TripDisplay from "./TripDisplay"

interface TripDetails {
  currentLocation: string
  destination: string
  startDate: string
  endDate: string
}

export const TripPlannerForm: React.FC = () => {
  const [tripResponse, setTripResponse] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    currentLocation: "",
    destination: "",
    startDate: "",
    endDate: "",
  })

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]

  // Calculate minimum end date based on selected start date
  const minEndDate = tripDetails.startDate || today

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const prompt = `Create a comprehensive trip plan:
      - Current Location: ${tripDetails.currentLocation}
      - Destination: ${tripDetails.destination}
      - Trip Duration: ${tripDetails.startDate} to ${tripDetails.endDate}
      
      Please include:
      1. Top attractions to visit
      2. Recommended daily itinerary
      3. Travel and transportation tips
      4. Estimated time at each location
      5. Any special local experiences
      6. Any other recommendations or tips
      `

    try {
      const response = await axios.post("/api/chat", {
        prompt,
      })

      setTripResponse(response?.data.trim())
      setIsLoading(false)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTripDetails((prev) => {
      const newDetails = {
        ...prev,
        [name]: value,
      }

      // If changing start date and end date is before new start date,
      // update end date to start date
      if (name === 'startDate' && newDetails.endDate < value) {
        newDetails.endDate = value
      }

      return newDetails
    })
  }

  const renderTripContent = () => {
    if (tripResponse) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TripDisplay plan={tripResponse} />
        </motion.div>
      )
    }
    if (isLoading) {
      return (
        <motion.div 
          className="flex flex-col items-center space-y-4 p-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <Globe2 className="w-12 h-12 text-primary animate-spin-slow" />
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Plane className="w-4 h-4 text-blue-400" />
            </motion.div>
          </div>
          <motion.p
            className="text-lg text-primary-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Hold on tight! We're crafting your journey from{" "}
            <span className="text-blue-400">{tripDetails.currentLocation}</span> to{" "}
            <span className="text-purple-400">{tripDetails.destination}</span>
          </motion.p>
        </motion.div>
      )
    }
    return (
      <motion.div 
        className="flex flex-col items-center space-y-4 p-8 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <Globe2 className="w-16 h-16 text-muted-foreground transition-all duration-300 hover:text-blue-400" />
          <motion.div
            className="absolute top-0 right-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Plane className="w-6 h-6 text-muted-foreground/50" />
          </motion.div>
        </div>
        <p className="text-lg text-muted-foreground">
          Ready to plan your next adventure? Fill in the details above!
        </p>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-purple-900 to-gray-900 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-3xl mx-auto bg-gray-800/30 border-gray-700/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-2 text-center pb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Travel Planner
              </CardTitle>
              <p className="text-gray-400 mt-2">Let AI craft your perfect journey</p>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={onSubmit} className="space-y-6">
              <motion.div
                className="grid gap-6 md:grid-cols-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="space-y-2 group">
                  <label className="text-sm text-gray-400 flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                    <MapPin className="w-4 h-4" />
                    Current Location
                  </label>
                  <Input
                    name="currentLocation"
                    placeholder="Where are you now?"
                    value={tripDetails.currentLocation}
                    onChange={handleFormInputChange}
                    required
                    autoComplete="off"
                    className="bg-gray-700/30 border-gray-600/50 focus:border-blue-400/50 transition-all duration-300 text-white
                    focus:bg-gray-700/50 focus:ring-2 focus:ring-blue-400/20"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="text-sm text-gray-400 flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                    <MapPin className="w-4 h-4" />
                    Destination
                  </label>
                  <Input
                    name="destination"
                    placeholder="Where to?"
                    value={tripDetails.destination}
                    onChange={handleFormInputChange}
                      autoComplete="off"
                    required
                    className="bg-gray-700/30 border-gray-600/50 focus:border-blue-400/50 transition-all duration-300 text-white
                    focus:bg-gray-700/50 focus:ring-2 focus:ring-blue-400/20"
                  />
                </div>
              </motion.div>

              <motion.div
                className="grid gap-6 md:grid-cols-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="space-y-2 group">
                  <label className="text-sm text-gray-400 flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                    <Calendar className="w-4 h-4" />
                    Start Date
                  </label>
                  <Input
                    type="date"
                    name="startDate"
                    value={tripDetails.startDate}
                    onChange={handleFormInputChange}
                    min={today}
                    required
                    className="bg-gray-700/30 border-gray-600/50 focus:border-blue-400/50 transition-all duration-300 text-white
                    focus:bg-gray-700/50 focus:ring-2 focus:ring-blue-400/20"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="text-sm text-gray-400 flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                    <Calendar className="w-4 h-4" />
                    End Date
                  </label>
                  <Input
                    type="date"
                    name="endDate"
                    value={tripDetails.endDate}
                    onChange={handleFormInputChange}
                    min={minEndDate}
                    required
                    className="bg-gray-700/30 border-gray-600/50 focus:border-blue-400/50 transition-all duration-300 text-white
                    focus:bg-gray-700/50 focus:ring-2 focus:ring-blue-400/20"
                  />
                  {tripDetails.startDate && tripDetails.endDate && tripDetails.endDate < tripDetails.startDate && (
                    <p className="text-red-400 text-sm mt-1">
                      End date must be after start date
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 
                  hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-lg 
                  transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg
                  disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Globe2 className="w-5 h-5" />
                      </motion.div>
                      Creating Your Perfect Trip...
                    </span>
                  ) : (
                    "Plan My Journey"
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div
              className="mt-8 bg-gray-900/50 rounded-xl border border-gray-700/50 overflow-hidden shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {renderTripContent()}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default TripPlannerForm
