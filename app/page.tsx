'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import TweetCard from '@/components/TweetCard'
import CategoryFilter from '@/components/CategoryFilter'
import { Tweet, Category } from '@/types/tweet'

export default function Home() {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [filteredTweets, setFilteredTweets] = useState<Tweet[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load tweets from API
    const loadTweets = async () => {
      try {
        const response = await fetch('/api/tweets')
        const result = await response.json()
        
        if (result.success) {
          setTweets(result.data)
          setFilteredTweets(result.data)
        } else {
          console.error('Failed to load tweets:', result.error)
        }
      } catch (error) {
        console.error('Error loading tweets:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTweets()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredTweets(tweets)
    } else {
      setFilteredTweets(tweets.filter(tweet => tweet.category === selectedCategory))
    }
  }, [selectedCategory, tweets])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Balaganapathi&apos;s Wisdom
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A curated collection of profound insights on saints, astrology, and the philosophy of life
          </p>
        </div>

        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredTweets.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </div>

        {filteredTweets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No tweets found for this category.</p>
          </div>
        )}
      </main>
    </div>
  )
}
