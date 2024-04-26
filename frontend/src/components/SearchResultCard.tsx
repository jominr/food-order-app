
import { Restaurant } from '@/types';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { Banknote, Clock, Dot } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = {
  restaurant: Restaurant;
}

const SearchResultCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      // for large screen, the left takes up 2/5 space, the right takes up 3/5 space
      // group: add hover effects to a child compontent,
      className='grid lg:grid-cols-[2fr_3fr] gap-5 group'
    >
      <AspectRatio ratio={16/6}>
        <img
          className='rounded-md w-full h-full object-cover'
          src={restaurant.imageUrl}
          alt="restaurant image"
        />
      </AspectRatio>
      <div>
        {/* Link group <=> h3 group-hover:underline */}
        <h3 className='text-2xl font-bold tracking-tight mb-2 group-hover:underline'>
          {restaurant.restaurantName}
        </h3>
        <div id="card-content" className='grid md:grid-cols-2 gap-2'>
          <div className='flex flex-row flex-wrap'>
            {restaurant.cuisines.map((item, index)=>(
              <span key={item} className='flex'>
                <span>{item}</span>
                {index < restaurant.cuisines.length - 1 && <Dot/>}
              </span>
            ))}
          </div>

          <div className='flex gap-2 flex-col'>
            <div className='flex items-center gap-1 text-green-600'>
              <Clock className="text-green-600"/>
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className='flex items-center gap-1'>
              <Banknote/>
              Delivery from ${(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;