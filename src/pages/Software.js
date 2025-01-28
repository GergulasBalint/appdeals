import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { fetchSoftwareProducts, fetchCategories } from '../services/api';

const Software = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortOrder, setSortOrder] = useState('');
  const productsPerPage = 12;

  // Fetch categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, []);

  // Fetch products with debounced search
  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      try {
        setLoading(true);
        const offset = (currentPage - 1) * productsPerPage;
        console.log('Fetching with sort order:', sortOrder);
        
        const productsData = await fetchSoftwareProducts(
          productsPerPage, 
          offset, 
          searchTerm, 
          selectedCategory,
          sortOrder
        );
        
        if (productsData) {
          setProducts(productsData.products);
          setTotalProducts(productsData.total);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [currentPage, searchTerm, selectedCategory, sortOrder]);

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Add this pagination helper function
  const getPaginationRange = (currentPage, totalPages) => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    range.push(1);

    if (totalPages <= 1) return range;

    if (totalPages <= 5) {
      for (let i = 2; i < totalPages; i++) {
        range.push(i);
      }
    } else {
      if (currentPage <= 3) {
        range.push(2, 3, 4);
      } else if (currentPage >= totalPages - 2) {
        range.push(totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        range.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }

    range.push(totalPages);

    let last = null;
    for (const i of range) {
      if (last) {
        if (i - last === 2) {
          rangeWithDots.push(last + 1);
        } else if (i - last !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      last = i;
    }

    return rangeWithDots;
  };

  const handlePriceChange = (e) => {
    setMaxPrice(parseInt(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 pt-24 flex-grow">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4 sticky top-24">
              {/* Search Input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 pl-8 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none text-sm"
                  />
                  <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Price Range</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={maxPrice}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>$0</span>
                    <span>Max: ${maxPrice}</span>
                  </div>
                </div>
              </div>

              {/* Sort Order */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Sort By</h3>
                <select
                  value={sortOrder}
                  onChange={(e) => {
                    console.log('Sort changed to:', e.target.value); // Debug log
                    setSortOrder(e.target.value);
                    setCurrentPage(1); // Reset to first page when sorting changes
                  }}
                  className="w-full p-2 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none text-sm"
                >
                  <option value="">Default</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="name_asc">Name: A to Z</option>
                  <option value="name_desc">Name: Z to A</option>
                </select>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-2">Categories</h3>
                <div className="max-h-[400px] overflow-y-auto pr-2 space-y-1 categories-scroll">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      selectedCategory === ''
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.category}
                      onClick={() => setSelectedCategory(cat.category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                        selectedCategory === cat.category
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {cat.category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold">
                    {selectedCategory || 'All Products'}{' '}
                    <span className="text-sm font-normal text-gray-500">
                      ({totalProducts} products)
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
                  {products.map((product) => (
                    <ProductCard key={product.absolute_href} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-1 mt-8">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-2 py-1 rounded text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:hover:bg-gray-200"
                    >
                      Prev
                    </button>
                    
                    {getPaginationRange(currentPage, totalPages).map((pageNum, idx) => (
                      <button
                        key={idx}
                        onClick={() => typeof pageNum === 'number' && setCurrentPage(pageNum)}
                        disabled={pageNum === '...'}
                        className={`px-2 py-1 rounded text-sm min-w-[2rem] ${
                          currentPage === pageNum
                            ? 'bg-primary text-white'
                            : pageNum === '...'
                            ? 'bg-transparent cursor-default'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-2 py-1 rounded text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:hover:bg-gray-200"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Software;