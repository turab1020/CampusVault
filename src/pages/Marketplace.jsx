import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import Input from '../components/ui/Input'
import ProductCard from '../components/ui/ProductCard'
import { Search } from 'lucide-react'

const CATEGORIES = [
    "All",
    "Electronics",
    "Engineering Kits",
    "Media Equipment",
    "Event Gear",
    "Textbooks",
    "Computing",
    "Presentation Tools",
]

const Marketplace = () => {
    const [listings, setListings] = useState([])
    const [filtered, setFiltered] = useState([])
    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await api.get('/listings')
                setListings(res.data)
                setFiltered(res.data)
            } catch (err) {
                console.error("Failed to fetch listings", err)
            } finally {
                setLoading(false)
            }
        }
        fetchListings()
    }, [])

    useEffect(() => {
        let result = listings

        if (selectedCategory !== 'All') {
            result = result.filter(l => l.category === selectedCategory)
        }

        if (search) {
            result = result.filter(l => l.title.toLowerCase().includes(search.toLowerCase()))
        }

        setFiltered(result)
    }, [search, selectedCategory, listings])

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row justify-between items-center bg-secondary text-black p-8 border-4 border-black shadow-brutal rounded-brutal">
                <div>
                    <h1 className="text-4xl uppercase mb-2">Marketplace</h1>
                    <p className="font-bold">Find the gear you need.</p>
                </div>
                <div className="w-full md:w-auto flex flex-col gap-4 mt-6 md:mt-0">
                    <div className="relative">
                        <Input
                            placeholder="Search gear..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-12 bg-white"
                        />
                        <Search className="absolute left-4 top-4 text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 overflow-x-auto pb-4">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 font-bold uppercase border-2 border-black rounded-full transition-all text-black 
                        ${selectedCategory === cat ? 'bg-primary shadow-[2px_2px_0px_0px_#000]' : 'bg-white hover:bg-gray-100'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            {loading ? (
                <div className="text-center p-20 text-white font-bold text-2xl animate-pulse">
                    Loading Vault Inventory...
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filtered.map((item) => (
                        <ProductCard key={item.id || item._id} item={item} />
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full py-20 text-center border-4 border-dashed border-gray-600 rounded-brutal text-gray-400 font-bold text-2xl">
                            No gear found matching your specs.
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Marketplace
