import React, { useState, useEffect } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { fetchCourseProducts } from '../services/api';

const Courses = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortOrder, setSortOrder] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const productsPerPage = 12;

  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      try {
        setLoading(true);
        const offset = (currentPage - 1) * productsPerPage;
        const productsData = await fetchCourseProducts(
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
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [currentPage, searchTerm, selectedCategory, sortOrder]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Online Courses</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none"
                />
                <FiSearch className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none"
              >
                <option value="">Sort by</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.absolute_href} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalProducts > productsPerPage && (
          <div className="flex justify-center mt-8 gap-2">
            {[...Array(Math.ceil(totalProducts / productsPerPage))].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses; 