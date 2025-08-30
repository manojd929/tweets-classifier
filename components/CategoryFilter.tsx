import { Category } from '@/types/tweet'

interface CategoryFilterProps {
  selectedCategory: Category | 'all'
  onCategoryChange: (category: Category | 'all') => void
}

const categories = [
  { id: 'all', label: 'All Tweets', icon: '📚', count: 0 },
  { id: 'saints', label: 'Saints', icon: '🙏', count: 0 },
  { id: 'astrology', label: 'Astrology', icon: '⭐', count: 0 },
  { id: 'philosophy', label: 'Philosophy', icon: '🧠', count: 0 },
] as const

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
            selectedCategory === category.id
              ? 'bg-primary-600 text-white shadow-lg transform scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-primary-300'
          }`}
        >
          <span className="text-lg">{category.icon}</span>
          <span>{category.label}</span>
          {category.count > 0 && (
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
              {category.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
