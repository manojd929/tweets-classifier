# Balaganapathi Tweets Showcase 🧘‍♂️

A beautiful, modern website showcasing the profound tweets of Balaganapathi, categorized by themes of saints, astrology, and philosophy of life.

## 🌟 Features

- **Beautiful UI**: Modern, responsive design with Tailwind CSS
- **Smart Categorization**: Automatic categorization of tweets into Saints, Astrology, and Philosophy
- **Real-time Data**: Fetch tweets directly from Twitter API
- **Interactive Filters**: Filter tweets by category
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **SEO Optimized**: Proper meta tags and Open Graph support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Twitter API credentials (optional, for fetching real tweets)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd balaganapathi-tweets-showcase
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Tweet Fetching

### Setting up Twitter API

To fetch real tweets from Balaganapathi's account:

1. **Get Twitter API Credentials**
   - Go to [Twitter Developer Portal](https://developer.twitter.com/)
   - Create a new app
   - Get your Bearer Token
   - Ensure your app has "Read" permissions enabled

2. **Set Environment Variable**
   ```bash
   export TWITTER_BEARER_TOKEN=your_bearer_token_here
   ```

3. **Fetch Tweets**
   ```bash
   npm run fetch-tweets
   ```

**⚠️ Note**: Twitter API access has become more restricted. If you encounter issues:
- The API might require elevated access
- Rate limits might be very low
- Some endpoints might require additional permissions
- The website works perfectly with sample tweets!

### Manual Tweet Addition

If the Twitter API doesn't work, you can manually add tweets:

#### Option 1: Interactive Tool
```bash
npm run add-tweet
```
This will guide you through adding tweets interactively.

#### Option 2: Edit JSON File
You can also manually add tweets by editing `data/sample-tweets.json`:

```json
{
  "id": "unique_id",
  "text": "Your tweet text here...",
  "category": "philosophy", // or "saints" or "astrology"
  "createdAt": "2024-01-15T10:30:00Z",
  "author": "Balaganapathi",
  "username": "Balaganpathi",
  "likes": 245,
  "retweets": 67,
  "replies": 23
}
```

## 🏗️ Project Structure

```
balaganapathi-tweets-showcase/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── TweetCard.tsx      # Individual tweet display
│   └── CategoryFilter.tsx # Category filtering
├── data/                  # Tweet data storage
│   ├── sample-tweets.json # Sample tweets
│   ├── tweets.json        # Fetched tweets (generated)
│   └── stats.json         # Tweet statistics (generated)
├── scripts/               # Utility scripts
│   └── fetchTweets.js     # Twitter API integration
├── types/                 # TypeScript definitions
│   └── tweet.ts           # Tweet and category types
└── package.json           # Dependencies and scripts
```

## 🎨 Customization

### Styling

The project uses Tailwind CSS for styling. You can customize:

- **Colors**: Edit `tailwind.config.js` to change the color scheme
- **Fonts**: Modify `app/globals.css` to change fonts
- **Layout**: Adjust components in the `components/` directory

### Categories

To add new categories or modify existing ones:

1. **Update TypeScript types** in `types/tweet.ts`
2. **Modify categorization logic** in `scripts/fetchTweets.js`
3. **Update UI components** to handle new categories

### Tweet Processing

The categorization system uses keyword matching. You can improve it by:

- Adding more keywords to `CATEGORY_KEYWORDS` in `scripts/fetchTweets.js`
- Implementing machine learning-based classification
- Adding manual categorization options

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Next.js and deploy

### Other Platforms

The project can be deployed on any platform that supports Node.js:

- **Netlify**: Use the build command `npm run build`
- **Railway**: Connect your GitHub repository
- **DigitalOcean App Platform**: Deploy with automatic scaling

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run fetch-tweets` - Fetch tweets from Twitter API (intelligent with fallbacks)

### Adding New Features

1. **New Components**: Add to `components/` directory
2. **API Routes**: Create in `app/api/` directory
3. **Pages**: Add to `app/` directory (Next.js 13+ app router)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Balaganapathi** for sharing profound wisdom through tweets
- **Next.js** for the amazing React framework
- **Tailwind CSS** for the beautiful styling system
- **Twitter API** for providing access to tweet data

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed description
3. Contact the maintainer

---

**Note**: This project is created for educational and showcase purposes. Please respect Twitter's terms of service and rate limits when fetching tweets.
