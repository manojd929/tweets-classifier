export type Category = 'saints' | 'astrology' | 'philosophy'

export interface Tweet {
  id: string
  text: string
  category: Category
  createdAt: string
  author: string
  username: string
  likes: number
  retweets: number
  replies: number
  media?: string[]
}

export interface TweetStats {
  totalTweets: number
  categoryCounts: Record<Category, number>
  totalLikes: number
  totalRetweets: number
}
