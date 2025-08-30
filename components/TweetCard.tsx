import { formatDistanceToNow } from 'date-fns'
import { HeartIcon, ArrowPathRoundedSquareIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { Tweet } from '@/types/tweet'

interface TweetCardProps {
  tweet: Tweet
}

export default function TweetCard({ tweet }: TweetCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'saints':
        return '🙏'
      case 'astrology':
        return '⭐'
      case 'philosophy':
        return '🧠'
      default:
        return '💭'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'saints':
        return 'category-saints'
      case 'astrology':
        return 'category-astrology'
      case 'philosophy':
        return 'category-philosophy'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="tweet-card">
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {tweet.author.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-900">{tweet.author}</h3>
            <span className="text-gray-500">@{tweet.username}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500 text-sm">
              {formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true })}
            </span>
          </div>
          <div className={`category-badge ${getCategoryColor(tweet.category)}`}>
            <span className="mr-1">{getCategoryIcon(tweet.category)}</span>
            {tweet.category.charAt(0).toUpperCase() + tweet.category.slice(1)}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed text-lg">
          {tweet.text}
        </p>
      </div>

      <div className="flex items-center justify-between text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 hover:text-blue-500 transition-colors cursor-pointer">
            <ChatBubbleLeftIcon className="w-5 h-5" />
            <span className="text-sm">{tweet.replies}</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-green-500 transition-colors cursor-pointer">
            <ArrowPathRoundedSquareIcon className="w-5 h-5" />
            <span className="text-sm">{tweet.retweets}</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-red-500 transition-colors cursor-pointer">
            <HeartIcon className="w-5 h-5" />
            <span className="text-sm">{tweet.likes}</span>
          </div>
        </div>
        
        <a 
          href={`https://x.com/${tweet.username}/status/${tweet.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          View on X →
        </a>
      </div>
    </div>
  )
}
