import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BrutalCard from './BrutalCard'
import Badge from './Badge'
import BrutalButton from './BrutalButton'

const ProductCard = ({ product }) => {
  return (
    <div className="h-full flex flex-col p-0 overflow-hidden bg-white border-4 border-black hover:-translate-y-2 hover:shadow-[8px_8px_0px_#000] transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block h-full flex flex-col">
          <div className="h-64 overflow-hidden border-b-4 border-black bg-surface relative group">
            {product.image ? (
                <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            ) : (
                <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    <span className="font-heading text-4xl text-neutral-gray opacity-20 uppercase tracking-tighter mix-blend-multiply">
                        {product.category}
                    </span>
                </div>
            )}
            <Badge variant="success" className="absolute top-4 left-4 border-4">Available</Badge>
            <div className="absolute bottom-4 right-4 bg-white border-2 border-black px-2 font-bold uppercase text-xs">
                {product.condition}
            </div>
          </div>
          <div className="p-4 flex flex-col flex-grow bg-white">
            <h3 className="font-heading text-xl uppercase tracking-tighter text-black mb-1 line-clamp-1">{product.title}</h3>
            <p className="font-sans text-sm font-bold text-neutral-gray mb-4">{product.category}</p>
            
            <div className="mt-auto flex justify-between items-center border-t-2 border-dashed border-black pt-4">
              <div>
                <span className="font-heading text-2xl text-primary">Rs {product.price}</span>
                <span className="font-sans text-xs font-bold text-neutral-gray ml-1 uppercase">/{product.rateType}</span>
              </div>
              <BrutalButton variant="secondary" size="sm" className="px-4 py-1 whitespace-nowrap min-w-[100px] flex justify-center items-center">
                  Rent
              </BrutalButton>
            </div>
          </div>
      </Link>
    </div>
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
