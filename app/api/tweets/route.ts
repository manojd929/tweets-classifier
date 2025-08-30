import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { Tweet } from '@/types/tweet'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get('category')
    
    // Try to load from fetched tweets first, fallback to sample data
    const tweetsPath = path.join(process.cwd(), 'data', 'tweets.json')
    let tweets: Tweet[]
    
    try {
      const tweetsData = await fs.readFile(tweetsPath, 'utf-8')
      tweets = JSON.parse(tweetsData)
    } catch {
      // Fallback to sample data
      const samplePath = path.join(process.cwd(), 'data', 'sample-tweets.json')
      const sampleData = await fs.readFile(samplePath, 'utf-8')
      tweets = JSON.parse(sampleData)
    }
    
    // Filter by category if specified
    if (category && category !== 'all') {
      tweets = tweets.filter(tweet => tweet.category === category)
    }
    
    // Sort by creation date (newest first)
    tweets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    return NextResponse.json({
      success: true,
      data: tweets,
      count: tweets.length
    })
    
  } catch (error) {
    console.error('Error loading tweets:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to load tweets',
        data: []
      },
      { status: 500 }
    )
  }
}
