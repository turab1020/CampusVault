import React from 'react'
import { useParams } from 'react-router-dom'
import BrutalCard from '../components/ui/BrutalCard'
import Badge from '../components/ui/Badge'
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
                    <div className="bg-surface border-2 border-dashed border-black p-6 font-bold text-black leading-relaxed text-lg shadow-brutal">
                        High-quality {product.category.toLowerCase()} gear strictly reserved for campus exchange. Must present active student card during meetup. Maintained in {product.condition.toLowerCase()} condition.
                    </div>
                </div>
                
                {/* Right Pane will go here */}
                <div>Right Pane Scaffold</div>
            </div>
        </div>
    )
}

export default ProductDetail
