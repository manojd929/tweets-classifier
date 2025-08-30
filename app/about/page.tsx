import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About This Project
            </h1>
            <p className="text-xl text-gray-600">
              A curated showcase of Balaganapathi&apos;s profound wisdom
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                About Balaganapathi
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Balaganapathi is a spiritual teacher and philosopher who shares profound insights 
                through his tweets. His wisdom spans across various domains including spirituality, 
                astrology, and life philosophy. His tweets are often like mini-blog posts, 
                offering deep reflections on life&apos;s most important questions.
              </p>
              <div className="mt-4">
                <a 
                  href="https://x.com/Balaganpathi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Follow on X →
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                About This Website
              </h2>
              <p className="text-gray-700 leading-relaxed">
                This website is a tribute to Balaganapathi&apos;s wisdom, designed to make his 
                profound tweets easily accessible and categorized by themes. We use modern 
                web technologies to create a beautiful, responsive experience that honors 
                the depth and beauty of his teachings.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Categories of Wisdom
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🙏</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Saints</h3>
                <p className="text-gray-600 text-sm">
                  Teachings about spiritual masters, gurus, and their timeless wisdom
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">⭐</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Astrology</h3>
                <p className="text-gray-600 text-sm">
                  Insights into cosmic influences and planetary wisdom
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🧠</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Philosophy</h3>
                <p className="text-gray-600 text-sm">
                  Deep reflections on life, consciousness, and existence
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              ← Back to Tweets
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
