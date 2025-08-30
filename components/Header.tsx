import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              🧘‍♂️ Balaganapathi
            </Link>
            <span className="text-gray-500 hidden md:block">
              Wisdom Collection
            </span>
          </div>
          
          <nav className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              About
            </Link>
            <a 
              href="https://x.com/Balaganpathi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Follow on X
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
