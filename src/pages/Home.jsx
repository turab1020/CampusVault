import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import ProductCard from '../components/ui/ProductCard'
import { Star } from 'lucide-react'

const Home = () => {
    const [featured, setFeatured] = useState([])

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await api.get('/listings?limit=3')
                setFeatured(res.data.slice(0, 3))
            } catch (err) {
                console.error("Failed to fetch featured", err)
            }
        }
        fetchFeatured()
    }, [])

    return (
        <div className="flex flex-col gap-24 py-12">
            {/* Hero Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-8">
                    <Badge variant="warning" className="w-fit">Beta Access Live</Badge>
                    <h1 className="text-6xl md:text-8xl leading-[0.9] text-white uppercase" style={{ textShadow: '4px 4px 0px #000, -2px -2px 0px #E63946' }}>
                        Rent Gear.<br />
                        Build Trust.<br />
                        <span className="text-secondary">No BS.</span>
                    </h1>
                    <p className="text-xl font-bold text-gray-300 max-w-lg">
                        Peer-to-peer campus marketplace engineered for engineers.
                        Stop buying expensive kit you'll use once.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/marketplace">
                            <Button size="lg" className="flex items-center gap-2">
                                Start Renting <ArrowRight size={20} />
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="secondary" size="lg">List Item</Button>
                        </Link>
                    </div>
                </div>

                <div className="relative">
                    {/* Abstract Neo-Brutalist Graphic */}
                    <div className="absolute top-0 right-0 w-full h-full bg-primary border-4 border-black translate-x-4 translate-y-4 rounded-brutal"></div>
                    <Card className="relative bg-surface p-0 overflow-hidden min-h-[500px] flex items-center justify-center border-4">
                        <div className="text-center p-8">
                            <Star className="w-24 h-24 text-black mx-auto mb-4" />
                            <h2 className="text-4xl uppercase mb-2">CampusVault</h2>
                            <p className="font-bold text-2xl bg-secondary inline-block px-2 border-2 border-black">EST. 2026</p>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Categories Marquee */}
            <section className="border-y-4 border-black bg-secondary py-6 -mx-6 overflow-hidden flex whitespace-nowrap">
                <div className="flex gap-12 font-display text-2xl font-black uppercase tracking-widest text-black animate-marquee min-w-max px-6">
                    <span>Electronics</span> ✦ <span>Engineering</span> ✦ <span>Media</span> ✦ <span>Computing</span> ✦ <span>Events</span> ✦ <span>Textbooks</span> ✦
                    <span>Electronics</span> ✦ <span>Engineering</span> ✦ <span>Media</span> ✦ <span>Computing</span> ✦ <span>Events</span> ✦ <span>Textbooks</span>
                </div>
                <div className="flex gap-12 font-display text-2xl font-black uppercase tracking-widest text-black animate-marquee min-w-max px-6" aria-hidden="true">
                    <span>Electronics</span> ✦ <span>Engineering</span> ✦ <span>Media</span> ✦ <span>Computing</span> ✦ <span>Events</span> ✦ <span>Textbooks</span> ✦
                    <span>Electronics</span> ✦ <span>Engineering</span> ✦ <span>Media</span> ✦ <span>Computing</span> ✦ <span>Events</span> ✦ <span>Textbooks</span>
                </div>
            </section>

            {/* Featured Section */}
            <section>
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-5xl text-white uppercase">Featured Drops</h2>
                    <Link to="/marketplace">
                        <Button variant="outline" className="bg-white">View All</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featured.map((item) => (
                        <ProductCard key={item.id || item._id} item={item} />
                    ))}
                    {featured.length === 0 && (
                        <div className="col-span-3 text-center text-gray-300 font-bold text-xl border-2 border-dashed border-gray-600 p-12 rounded-brutal">
                            Loading fresh gear...
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Home
