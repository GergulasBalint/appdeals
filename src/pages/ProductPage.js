import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById, fetchSoftwareProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        
        // Fetch more products for random recommendations
        const recsData = await fetchSoftwareProducts(12, 0, '', '');
        const filteredRecs = recsData.products.filter(p => p.absolute_href !== data.absolute_href);
        const randomRecs = filteredRecs.sort(() => 0.5 - Math.random()).slice(0, 3);
        setRecommendations(randomRecs);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-8" />
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="text-center text-gray-600">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Image Section */}
              <div className="relative">
                <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={product.aspect_sku_card_src || product.inline_flex_src}
                    alt={product.sr_only}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
                    }}
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <div className="mb-4">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {product.relative}
                  </span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.sr_only}
                </h1>
                
                <p className="text-gray-600 mb-6 text-lg">
                  {product.my_1}
                </p>

                <div className="flex items-baseline gap-4 mb-8">
                  <span className="text-4xl font-bold text-primary">
                    {product.font_medium}
                  </span>
                  {product.text_sm_2 && (
                    <span className="text-xl text-gray-400 line-through">
                      {product.text_sm_2}
                    </span>
                  )}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-green-800 mb-2">🎉 Limited Time Offer</h3>
                  <ul className="text-green-700 text-sm space-y-2">
                    <li>✓ One-time payment, lifetime access</li>
                    <li>✓ 60-day money-back guarantee</li>
                    <li>✓ Instant digital delivery</li>
                  </ul>
                </div>

                {product.text_sm && (
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-sm text-gray-600">
                      Reviews: {product.text_sm}
                    </span>
                  </div>
                )}

                <a 
                  href={product.absolute_href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors w-full md:w-auto text-lg text-center"
                >
                  Get This Deal 🚀
                </a>

                <p className="text-xs text-gray-500 mt-4 text-center md:text-left">
                  *Price and availability are subject to change. Deal activated upon purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {recommendations.map(rec => (
                <ProductCard key={rec.absolute_href} product={rec} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;