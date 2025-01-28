import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <Link 
      to={`/products/software/${product.absolute_href?.split('products/')[1]?.replace('/', '')}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full max-w-[280px] flex flex-col transform hover:-translate-y-1"
    >
      <div className="relative pb-[60%] overflow-hidden">
        <img
          src={product.aspect_sku_card_src || product.inline_flex_src}
          alt={product.sr_only}
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-300">
          {product.sr_only}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
          {product.my_1}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-primary">
              {product.font_medium}
            </span>
            {product.text_sm_2 && (
              <span className="text-xs text-gray-500 line-through">
                {product.text_sm_2}
              </span>
            )}
          </div>
          {product.text_sm && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.text_sm}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;