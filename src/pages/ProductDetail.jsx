import React from 'react'
import { useParams } from 'react-router-dom'
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
                {/* Left Pane will go here */}
                <div>Left Pane Scaffold</div>
                
                {/* Right Pane will go here */}
                <div>Right Pane Scaffold</div>
            </div>
        </div>
    )
}

export default ProductDetail
