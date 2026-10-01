import { useState, useEffect, createContext, useCallback } from "react";

export const ProductsContext = createContext({
  products: [],
  setProducts: () => {},
  totalProducts: 0,
  page: 1,
  totalPages: 1,
  hasMore: false,
  loading: false,
  loadingMore: false,
  fetchProducts: async () => {},
  fetchMoreProducts: async () => {},
  refreshProducts: async () => {},
});

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);


  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = useCallback(
    async (pageNum = 1, limitNum = 12, reset = true, customFilters = {}) => {
      try {
        if (reset) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const queryParams = new URLSearchParams({
          page: String(pageNum),
          limit: String(limitNum),
        });

        if (customFilters.search) {
          queryParams.set("search", customFilters.search);
        }

        const response = await fetch(`${API_URL}/product?${queryParams.toString()}`);
        const data = await response.json();

        if (response.ok) {
          const productList = Array.isArray(data)
            ? data
            : Array.isArray(data?.products)
            ? data.products
            : [];

          const total = data?.total !== undefined ? data.total : productList.length;
          const pages = data?.totalPages !== undefined ? data.totalPages : Math.ceil(total / limitNum) || 1;
          const more = data?.hasMore !== undefined ? data.hasMore : pageNum < pages;

          setProducts((prev) => {
            if (reset || pageNum === 1) {
              return productList;
            }
            const existingIds = new Set(prev.map((p) => p._id || p.id));
            const newUnique = productList.filter((p) => !existingIds.has(p._id || p.id));
            return [...prev, ...newUnique];
          });

          setPage(pageNum);
          setTotalProducts(total);
          setTotalPages(pages);
          setHasMore(more);
        } else {
          console.error("Failed to fetch products:", data?.message);
        }
      } catch (error) {
        console.error("Products fetch error:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [API_URL]
  );


  const fetchMoreProducts = useCallback(
    async (limitNum = 12, customFilters = {}) => {
      if (loadingMore || !hasMore) return;
      const nextPage = page + 1;
      await fetchProducts(nextPage, limitNum, false, customFilters);
    },
    [fetchProducts, hasMore, loadingMore, page]
  );

  const refreshProducts = useCallback(async () => {
    await fetchProducts(1, 12, true);
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts(1, 12, true);
  }, [fetchProducts]);


  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        totalProducts,
        page,
        totalPages,
        hasMore,
        loading,
        loadingMore,
        fetchProducts,
        fetchMoreProducts,
        refreshProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
