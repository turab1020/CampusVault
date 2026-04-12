import { Link } from 'react-router-dom'
import Card from './Card'
import Badge from './Badge'
import Button from './Button'
import { ArrowRight } from 'lucide-react'

const ProductCard = ({ item }) => {
    return (
        <Link to={`/listings/${item.id || item._id}`}>
            <Card hoverEffect className="h-full flex flex-col p-0 overflow-hidden bg-white border-4 border-black">
                <div className="aspect-square overflow-hidden border-b-4 border-black bg-gray-100 relative group">
                    <img
                        src={(() => {
                            const img = item.images && item.images[0];
                            if (!img) return 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image';
                            if (img.startsWith('http')) return img;
                            // FORCE ABSOLUTE PATH: Extract filename and prepend backend URL
                            const filename = img.split('/').pop();
                            const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').replace('/api', '');
                            return `${baseUrl}/images/${filename}`;
                        })()}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => { e.target.src = 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image' }}
                    />
                    <Badge variant={item.status === 'ACTIVE' ? 'success' : 'warning'} className="absolute top-4 left-4">
                        {item.status || "ACTIVE"}
                    </Badge>
                    <div className="absolute bottom-4 right-4 bg-white border-2 border-black px-2 font-bold uppercase text-xs">
                        {item.condition || "GOOD"}
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
    )
}

export default ProductCard
