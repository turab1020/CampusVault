import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BrutalCard from './BrutalCard'
import Badge from './Badge'
import BrutalButton from './BrutalButton'

const ProductCard = ({ product }) => {
  return (
    <BrutalCard className="flex flex-col h-full bg-white transition-transform hover:-translate-y-2 hover:shadow-brutal-hover duration-200">
      <div className="relative h-48 w-full border-b-4 border-black bg-surface overflow-hidden group">
        <div className="w-full h-full flex items-center justify-center bg-white transition-transform duration-300 group-hover:scale-105">
          {product.image ? (
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          ) : (
            <span className="font-heading text-4xl text-neutral-gray opacity-20 uppercase tracking-tighter mix-blend-multiply">
              {product.category}
            </span>
          )}
        </div>
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <Badge variant="primary">{product.category}</Badge>
          {product.condition === 'New' && <Badge variant="secondary">New</Badge>}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-heading text-xl uppercase tracking-tighter text-black mb-1 line-clamp-1">{product.title}</h3>
        <p className="font-sans text-sm font-bold text-neutral-gray mb-4">By {product.ownerName}</p>
        
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <span className="font-sans text-xs font-bold text-neutral-gray uppercase">Price</span>
            <span className="font-heading text-2xl text-primary">
              Rs {product.price}
              <span className="font-sans text-sm text-black ml-1">/{product.rateType}</span>
            </span>
          </div>
          <Link to={`/product/${product.id}`} className="shrink-0 ml-2">
            <BrutalButton variant="outline" size="sm" className="whitespace-nowrap">View</BrutalButton>
          </Link>
        </div>
      </div>
    </BrutalCard>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    ownerName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rateType: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
}

export default ProductCard
