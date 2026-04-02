import React from 'react'
import { useParams } from 'react-router-dom'
import { Shield } from 'lucide-react'
import BrutalCard from '../components/ui/BrutalCard'
import Badge from '../components/ui/Badge'
import BrutalButton from '../components/ui/BrutalButton'
import NbInput from '../components/ui/NbInput'
import productsData from '../data/products.json'

const ProductDetail = () => {
    const { id } = useParams()
    const product = productsData.find(item => String(item.id) === id)

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
                    <BrutalCard className="bg-white text-black border-4 p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full border-4 border-black overflow-hidden bg-surface relative flex items-center justify-center">
                                <span className="font-heading text-2xl tracking-tighter">{product.ownerName.charAt(0)}</span>
                            </div>
                            <div>
                                <h3 className="font-heading text-2xl uppercase leading-none">{product.ownerName}</h3>
                                <div className="flex items-center gap-2 text-sm font-bold text-neutral-gray mt-1">
                                    <Shield size={16} className="text-secondary" />
                                    <span>Verified Host</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 font-bold px-4 py-2 border-2 border-black bg-white hover:bg-surface shadow-[4px_4px_0px_0px_#000] uppercase transition-all duration-200 active:translate-y-1 active:shadow-[0px_0px_0px_0px_#000]">
                                Open Profile
                            </button>
                        </div>
                    </BrutalCard>
                    
                    {/* Booking Card */}
                    <BrutalCard className="bg-white text-black border-4 mt-auto p-6">
                        <div className="flex justify-between items-end mb-6 border-b-4 border-black pb-4">
                            <span className="font-heading font-black text-5xl tracking-tighter text-primary">
                                Rs {product.price}
                            </span>
                            <span className="font-sans font-bold text-neutral-gray mb-1 uppercase">per {product.rateType}</span>
                        </div>

                        <form className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <NbInput
                                    label="Start Date"
                                    type="date"
                                    name="startDate"
                                    required
                                />
                                <NbInput
                                    label="End Date"
                                    type="date"
                                    name="endDate"
                                    required
                                />
                            </div>
                            <BrutalButton type="button" variant="primary" size="lg" className="w-full mt-4">
                                Request Booking
                            </BrutalButton>
                            <p className="font-sans text-xs text-center font-bold text-neutral-gray mt-2 uppercase">
                                You won't be charged yet. Host must approve.
                            </p>
                        </form>
                    </BrutalCard>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
