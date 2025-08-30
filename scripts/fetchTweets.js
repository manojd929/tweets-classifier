const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs').promises;
const path = require('path');

// Twitter API credentials
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const USER_ID = 'Balaganpathi';

// Keywords for categorization
const CATEGORY_KEYWORDS = {
  saints: [
    'saint', 'saints', 'guru', 'swami', 'maharaj', 'baba', 'sadhu', 'yogi',
    'ramakrishna', 'vivekananda', 'ramana', 'maharshi', 'paramahansa',
    'spiritual', 'devotion', 'bhakti', 'meditation', 'enlightenment'
  ],
  astrology: [
    'astrology', 'astrological', 'horoscope', 'zodiac', 'planets', 'stars',
    'moon', 'sun', 'mars', 'venus', 'jupiter', 'saturn', 'mercury',
    'rahu', 'ketu', 'nakshatra', 'rashi', 'kundali', 'birth chart',
    'planetary', 'cosmic', 'celestial'
  ],
  philosophy: [
    'philosophy', 'philosophical', 'wisdom', 'knowledge', 'truth', 'reality',
    'consciousness', 'awareness', 'mind', 'thought', 'thinking', 'logic',
    'reason', 'understanding', 'insight', 'perspective', 'viewpoint',
    'life', 'existence', 'meaning', 'purpose', 'dharma', 'karma'
  ]
};

function categorizeTweet(text) {
  const lowerText = text.toLowerCase();
  
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        return category;
      }
    }
  }
  
  return 'philosophy';
}

function formatTimeUntilReset(resetTimestamp) {
  const now = Math.floor(Date.now() / 1000);
  const timeLeft = resetTimestamp - now;
  
  if (timeLeft <= 0) return 'now';
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

async function fetchTweets() {
  if (!TWITTER_BEARER_TOKEN) {
    console.error('❌ TWITTER_BEARER_TOKEN environment variable is required');
    console.log('📝 Please set up your Twitter API credentials:');
    console.log('1. Go to https://developer.twitter.com/');
    console.log('2. Create a new app and get your Bearer Token');
    console.log('3. Set TWITTER_BEARER_TOKEN=your_token_here');
    console.log('\n💡 For now, you can use the sample tweets by running the website.');
    return;
  }

  try {
    console.log('🔍 Fetching tweets from @Balaganpathi...');
    console.log('📊 Using intelligent approach with fallback options...\n');
    
    const client = new TwitterApi(TWITTER_BEARER_TOKEN);
    
    // Step 1: Get user information
    console.log('1️⃣ Looking up user information...');
    let userId = null;
    
    try {
      const user = await client.v2.userByUsername(USER_ID);
      
      if (user && user.data) {
        userId = user.data.id;
        console.log(`✅ Found user: @${user.data.username} (ID: ${userId})`);
        console.log(`📝 Bio: ${user.data.description || 'No bio available'}`);
        console.log(`📊 Followers: ${user.data.public_metrics?.followers_count || 'Unknown'}`);
      } else {
        console.log('⚠️ User not found or account might be private');
        await createFallbackData();
        return;
      }
    } catch (userError) {
      console.error('❌ Error looking up user:', userError.message);
      
      if (userError.code === 429) {
        const resetTime = userError.rateLimit?.reset;
        if (resetTime) {
          console.log(`⏰ Rate limit exceeded. Reset in: ${formatTimeUntilReset(resetTime)}`);
        }
      } else if (userError.code === 403) {
        console.log('🚫 Access forbidden. The account might be private or restricted.');
      }
      
      await createFallbackData();
      return;
    }
    
    // Step 2: Fetch tweets with intelligent retry
    console.log('\n2️⃣ Fetching recent tweets...');
    let tweets = null;
    
    try {
      // Try different approaches based on rate limits
      tweets = await client.v2.userTimeline(userId, {
        max_results: 50, // Start with more tweets
        'tweet.fields': ['created_at', 'public_metrics', 'text'],
        exclude: ['retweets', 'replies']
      });
      
      console.log(`✅ Successfully fetched tweets`);
      
    } catch (tweetError) {
      console.error('❌ Error fetching tweets:', tweetError.message);
      
      if (tweetError.code === 429) {
        const resetTime = tweetError.rateLimit?.reset;
        if (resetTime) {
          console.log(`⏰ Rate limit exceeded. Reset in: ${formatTimeUntilReset(resetTime)}`);
          console.log('💡 You can try again after the reset time.');
        }
      } else if (tweetError.code === 403) {
        console.log('🚫 Access forbidden. The account might be private or restricted.');
      } else {
        console.log('🔧 This might be a temporary API issue. Please try again later.');
      }
      
      await createFallbackData();
      return;
    }
    
    // Step 3: Process tweets
    if (tweets && tweets.data && Array.isArray(tweets.data) && tweets.data.length > 0) {
      console.log(`📊 Processing ${tweets.data.length} tweets...`);
      
      const processedTweets = tweets.data.map(tweet => {
        const category = categorizeTweet(tweet.text);
        
        return {
          id: tweet.id,
          text: tweet.text,
          category: category,
          createdAt: tweet.created_at,
          author: 'Balaganapathi',
          username: 'Balaganpathi',
          likes: tweet.public_metrics?.like_count || 0,
          retweets: tweet.public_metrics?.retweet_count || 0,
          replies: tweet.public_metrics?.reply_count || 0
        };
      });
      
      // Save tweets
      await saveTweets(processedTweets);
      
      // Show rate limit info
      if (tweets._headers) {
        const rateLimit = tweets._headers['x-rate-limit-remaining'];
        const rateLimitReset = tweets._headers['x-rate-limit-reset'];
        
        if (rateLimit !== undefined) {
          console.log(`\n📊 Rate Limit Status:`);
          console.log(`   Remaining requests: ${rateLimit}`);
          if (rateLimitReset) {
            console.log(`   Reset time: ${formatTimeUntilReset(parseInt(rateLimitReset))}`);
          }
        }
      }
      
    } else {
      console.log('📭 No tweets found or account might be empty');
      await createFallbackData();
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    console.log('💡 The website will work with sample tweets.');
    await createFallbackData();
  }
}

async function saveTweets(tweets) {
  try {
    const dataDir = path.join(__dirname, '..', 'data');
    await fs.mkdir(dataDir, { recursive: true });
    
    const outputPath = path.join(dataDir, 'tweets.json');
    await fs.writeFile(outputPath, JSON.stringify(tweets, null, 2));
    
    // Generate statistics
    const stats = {
      totalTweets: tweets.length,
      categoryCounts: {
        saints: tweets.filter(t => t.category === 'saints').length,
        astrology: tweets.filter(t => t.category === 'astrology').length,
        philosophy: tweets.filter(t => t.category === 'philosophy').length
      },
      totalLikes: tweets.reduce((sum, t) => sum + t.likes, 0),
      totalRetweets: tweets.reduce((sum, t) => sum + t.retweets, 0)
    };
    
    await fs.writeFile(
      path.join(dataDir, 'stats.json'), 
      JSON.stringify(stats, null, 2)
    );
    
    console.log('\n✅ Tweets saved successfully!');
    console.log('📈 Statistics:');
    console.log(`   Total tweets: ${stats.totalTweets}`);
    console.log(`   Saints: ${stats.categoryCounts.saints}`);
    console.log(`   Astrology: ${stats.categoryCounts.astrology}`);
    console.log(`   Philosophy: ${stats.categoryCounts.philosophy}`);
    console.log(`   Total likes: ${stats.totalLikes}`);
    console.log(`   Total retweets: ${stats.totalRetweets}`);
    
    console.log('\n🎉 Your website is now updated with real tweets!');
    console.log('🌐 Visit http://localhost:3000 to see the changes');
    
  } catch (error) {
    console.error('❌ Error saving tweets:', error.message);
  }
}

async function createFallbackData() {
  try {
    const dataDir = path.join(__dirname, '..', 'data');
    await fs.mkdir(dataDir, { recursive: true });
    
    // Copy sample tweets as fallback
    const samplePath = path.join(__dirname, '..', 'data', 'sample-tweets.json');
    const fallbackPath = path.join(dataDir, 'tweets.json');
    
    await fs.copyFile(samplePath, fallbackPath);
    console.log('✅ Created fallback data from sample tweets');
    console.log('🌐 Your website is ready with sample tweets at http://localhost:3000');
    
  } catch (error) {
    console.error('❌ Error creating fallback data:', error.message);
  }
}

// Run the script
if (require.main === module) {
  fetchTweets();
}

module.exports = { fetchTweets, categorizeTweet };
