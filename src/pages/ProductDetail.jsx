import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Input from '../components/ui/Input'
import { Shield, CheckCircle, ArrowRight } from 'lucide-react'

const ProductDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [listing, setListing] = useState(null)
    const [listingsData, setListingsData] = useState([])

    // Derived state for recommendations
    const recommendations = (() => {
        if (!listing) return []
        const currentId = listing.id || listing._id
        const sameCategory = listingsData.filter(l => l.category === listing.category && (l.id || l._id) !== currentId)
        if (sameCategory.length >= 3) return sameCategory.slice(0, 3)

        const otherCategories = listingsData.filter(l => l.category !== listing.category && (l.id || l._id) !== currentId)
        return [...sameCategory, ...otherCategories].slice(0, 3)
    })()

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [loading, setLoading] = useState(true)
    const [bookingSuccess, setBookingSuccess] = useState(false)
    const [error, setError] = useState('')

    const [host, setHost] = useState(null)

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await api.get(`/listings/${id}`)
                setListing(res.data)

                // Fetch Host Details
                if (res.data.hostId) {
                    try {
                        const hostRes = await api.get(`/users/${res.data.hostId}`)
                        setHost(hostRes.data)
                    } catch (hostErr) {
                        console.error("Failed to load host details", hostErr)
                    }
                }

            } catch (err) {
                console.error("Failed to load listing", err)
            } finally {
                setLoading(false)
            }
        }

        const fetchRecommendations = async () => {
            try {
                const res = await api.get('/listings')
                setListingsData(res.data)
            } catch (err) {
                console.error("Failed to load recommendations", err)
            }
        }

        fetchListing()
        fetchRecommendations()
    }, [id])

    const handleBooking = async (e) => {
        e.preventDefault()
        setError('')
        if (!user) {
            navigate('/login')
            return
        }

        try {
            await api.post('/bookings', {
                listingId: id,
                startDate,
                endDate
            })
            setBookingSuccess(true)
        } catch (err) {
            setError(err.response?.data?.error || 'Booking failed')
        }
    }

    if (loading) return <div className="text-white text-center py-20 text-2xl font-bold">Loading Gear...</div>
    if (!listing) return <div className="text-white text-center py-20 text-2xl font-bold">Listing not found.</div>

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-8">
            {/* Image Section */}
            <div className="flex flex-col gap-4">
                <Card className="p-0 border-4 border-black overflow-hidden bg-white aspect-square relative">
                    <img
                        src={listing.images[0] || 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image'}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image' }}
                    />
                    <Badge variant={listing.status === 'ACTIVE' ? 'success' : 'warning'} className="absolute top-6 right-6 text-xl px-4 py-2 border-4">
                        {listing.status}
                    </Badge>
                </Card>

                {/* Description Box */}
                <div className="bg-bg-main border-2 border-dashed border-gray-600 p-6 rounded-lg font-bold text-gray-300 leading-relaxed text-lg">
                    {listing.description}
                </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col gap-8 text-white">
                <div>
                    <h4 className="text-secondary font-bold uppercase mb-2 tracking-widest">{listing.category}</h4>
                    <h1 className="text-5xl md:text-6xl uppercase leading-none mb-6 text-white">{listing.title}</h1>
                    <div className="flex items-center gap-4">
                        <Badge variant="primary">Condition: {listing.condition}</Badge>
                        <div className="flex items-center gap-2 text-gray-400 font-bold">
                            <Shield size={18} className="text-secondary" />
                            <span>Verified Host</span>
                        </div>
                    </div>
                </div>

                {/* Host Profile Card */}
                {host && (
                    <Card className="bg-white text-black border-4 p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full border-4 border-black overflow-hidden bg-gray-200">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${host.profile.name}&background=random`}
                                    alt={host.profile.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black uppercase leading-none">{host.profile.name}</h3>
                                <div className="flex items-center gap-2 text-sm font-bold text-gray-500 mt-1">
                                    <Shield size={16} className="text-secondary" />
                                    <span>Verified Host</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button variant="outline" size="sm" className="flex-1 font-bold">
                                Open Profile
                            </Button>
                            <Button variant="secondary" size="sm" className="flex-1 font-bold">
                                Show More
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Booking Card */}
                <Card className="bg-white text-black border-4 mt-auto">
                    {!bookingSuccess ? (
                        <>
                            <div className="flex justify-between items-end mb-6 border-b-2 border-black pb-4">
                                <span className="font-display font-black text-4xl">${listing.dailyRate}</span>
                                <span className="font-bold text-gray-500 mb-1">per day</span>
                            </div>

                            {error && <div className="mb-4 text-primary font-bold bg-primary/10 p-2 border border-primary">{error}</div>}

                            <form onSubmit={handleBooking} className="flex flex-col gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="Start"
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                        className="bg-gray-100"
                                    />
                                    <Input
                                        label="End"
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required
                                        className="bg-gray-100"
                                    />
                                </div>
                                <Button type="submit" size="lg" className="w-full text-lg">
                                    Request Booking
                                </Button>
                                <p className="text-xs text-center font-bold text-gray-400 mt-2">
                                    You won't be charged yet. Host must approve.
                                </p>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <CheckCircle size={64} className="text-success mx-auto mb-4" />
                            <h3 className="text-2xl font-display uppercase mb-2">Request Sent!</h3>
                            <p className="font-bold text-gray-600 mb-6">Host has been notified.</p>
                            <Button onClick={() => navigate('/dashboard')} variant="outline">
                                Go to Dashboard
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
            {/* Recommendations Section */}
            <div className="col-span-1 lg:col-span-2 mt-12 border-t-4 border-black pt-12 text-black">
                <h2 className="text-4xl font-black uppercase mb-8 text-white">Recommended Gear</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recommendations.map((item) => (
                        <Link key={item.id || item._id} to={`/listings/${item.id || item._id}`} onClick={() => window.scrollTo(0, 0)}>
                            <Card hoverEffect className="h-full flex flex-col p-0 overflow-hidden bg-white border-4 border-black">
                                <div className="aspect-square overflow-hidden border-b-4 border-black bg-gray-100 relative group">
                                    <img
                                        src={item.images[0] || 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image'}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => { e.target.src = 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image' }}
                                    />
                                    <Badge variant={item.status === 'ACTIVE' ? 'success' : 'warning'} className="absolute top-4 left-4">
                                        {item.status}
                                    </Badge>
                                    <div className="absolute bottom-4 right-4 bg-white border-2 border-black px-2 font-bold uppercase text-xs">
                                        {item.condition}
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col flex-grow bg-white">
                                    <h3 className="text-xl font-display font-bold mb-1 truncate uppercase">{item.title}</h3>
                                    <p className="text-sm text-gray-500 font-bold mb-4">{item.category}</p>

                                    <div className="mt-auto flex justify-between items-center border-t-2 border-dashed border-gray-300 pt-4">
                                        <div>
                                            <span className="text-primary font-black text-2xl">${item.dailyRate}</span>
                                            <span className="text-xs font-bold text-gray-400">/DAY</span>
                                        </div>
                                        <Button size="sm" variant="secondary" className="px-4 py-1 whitespace-nowrap min-w-[100px] flex justify-center items-center">
                                            Rent <ArrowRight size={14} className="ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
