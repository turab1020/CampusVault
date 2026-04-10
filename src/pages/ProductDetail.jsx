import React from 'react'
import { useParams } from 'react-router-dom'
import { Shield, CheckCircle } from 'lucide-react'
import BrutalCard from '../components/ui/BrutalCard'
import ProductCard from '../components/ui/ProductCard'
import Badge from '../components/ui/Badge'
import BrutalButton from '../components/ui/BrutalButton'
import NbInput from '../components/ui/NbInput'
import productsData from '../data/products.json'

const ProductDetail = () => {
    const { id } = useParams()
    const product = productsData.find(item => String(item.id) === id)
    const [bookingSuccess, setBookingSuccess] = React.useState(false)

    const recommendations = productsData.filter(item => String(item.id) !== id).slice(0, 3)

    if (!product) {
        return <div className="text-white text-center py-20 font-heading text-4xl uppercase">Product Not Found</div>
    }

    return (
        <div className="max-w-7xl mx-auto px-6 w-full py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Pane */}
                <div className="flex flex-col gap-6">
                    <BrutalCard className="p-0 border-4 border-black overflow-hidden bg-white aspect-square relative flex items-center justify-center">
                        {product.image ? (
                            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                        ) : (
                            <span className="font-heading text-6xl text-neutral-gray opacity-20 uppercase tracking-tighter mix-blend-multiply">
                                {product.category}
                            </span>
                        )}
                        <Badge variant="success" className="absolute top-6 right-6 text-xl px-4 py-2 border-4">
                            Available
                        </Badge>
                    </BrutalCard>
                    <div className="bg-[#2C2A29] border-2 border-dashed border-gray-600 rounded-lg p-6 font-bold text-gray-300 leading-relaxed text-lg">
                        High-quality {product.category.toLowerCase()} gear strictly reserved for campus exchange. Must present active student card during meetup. Maintained in {product.condition.toLowerCase()} condition.
                    </div>
                </div>
                
                {/* Right Pane */}
                <div className="flex flex-col gap-8 text-white">
                    <div>
                        <h4 className="text-secondary font-bold uppercase mb-2 tracking-widest">{product.category}</h4>
                        <h1 className="font-heading text-5xl md:text-6xl uppercase leading-none mb-6 tracking-tighter text-white">
                            {product.title}
                        </h1>
                        <div className="flex items-center gap-4">
                            <Badge variant="primary">Condition: {product.condition}</Badge>
                            <div className="flex items-center gap-2 text-gray-400 font-bold">
                                <Shield size={18} className="text-secondary" />
                                <span>Verified Host</span>
                            </div>
                        </div>
                    </div>

                    {/* Host Profile Card */}
                    <div className="bg-white text-black border-4 border-black rounded-brutal p-6 shadow-brutal">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full border-4 border-black overflow-hidden bg-gray-200">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${product.ownerName}&background=random`}
                                    alt={product.ownerName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black uppercase leading-none">{product.ownerName}</h3>
                                <div className="flex items-center gap-2 text-sm font-bold text-gray-500 mt-1">
                                    <Shield size={16} className="text-secondary" />
                                    <span>Verified Host</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <BrutalButton variant="outline" size="sm" className="flex-1 font-bold">
                                Open Profile
                            </BrutalButton>
                            <BrutalButton variant="secondary" size="sm" className="flex-1 font-bold text-black border-2 border-black shadow-[4px_4px_0px_#000]">
                                Show More
                            </BrutalButton>
                        </div>
                    </div>
                    
                    {/* Booking Card */}
                    <div className="bg-white text-black border-4 border-black p-6 rounded-brutal shadow-brutal mt-auto">
                        {!bookingSuccess ? (
                            <>
                                <div className="flex justify-between items-end mb-6 border-b-2 border-black pb-4">
                                    <span className="font-heading font-black text-4xl tracking-tighter">
                                        Rs {product.price}
                                    </span>
                                    <span className="font-sans font-bold text-gray-500 mb-1 uppercase">per {product.rateType}</span>
                                </div>

                                <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setBookingSuccess(true); }}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <NbInput
                                            label="Start"
                                            type="date"
                                            name="startDate"
                                            required
                                        />
                                        <NbInput
                                            label="End"
                                            type="date"
                                            name="endDate"
                                            required
                                        />
                                    </div>
                                    <BrutalButton type="submit" variant="primary" size="lg" className="w-full text-lg mt-4">
                                        Request Booking
                                    </BrutalButton>
                                    <p className="font-sans text-xs text-center font-bold text-gray-400 mt-2 uppercase">
                                        You won't be charged yet. Host must approve.
                                    </p>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <CheckCircle size={64} className="text-success mx-auto mb-4" />
                                <h3 className="font-heading text-2xl uppercase mb-2">Request Sent!</h3>
                                <p className="font-sans font-bold text-gray-600 mb-6">Host has been notified.</p>
                                <BrutalButton onClick={() => setBookingSuccess(false)} variant="outline">
                                    Go to Dashboard
                                </BrutalButton>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Recommendations Section */}
            <div className="col-span-1 lg:col-span-2 mt-12 border-t-4 border-black pt-12 text-black">
                <h2 className="font-heading text-4xl font-black uppercase mb-8 text-white tracking-tighter">Recommended Gear</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recommendations.map((item) => (
                        <div key={item.id}>
                            <ProductCard product={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
