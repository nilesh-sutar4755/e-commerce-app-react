import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { Product } from "../../utils/Interfaces";
import Filters, { Filter } from "../../components/Filters";
import { useState, useEffect, useMemo } from "react";

const Products = () => {
  const { context, handleCart } = useCart();
  const products = useMemo(() => context?._products || [], [context?._products]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeFilters, setActiveFilters] = useState<Filter & { price?: number }>({});

  const applyFilters = (filters: Filter & { price?: number }) => {
    let filtered = [...products];

    // Apply brand filter
    if (filters.brand && filters.brand !== "all") {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    // Apply category filter
    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply rating filter
    if (filters.rating && filters.rating !== "all") {
      filtered = filtered.filter(product =>
        Math.max(product.rating).toFixed() == Math.max(Number(filters.rating)).toFixed()
      );
    }
    console.log(filters, filtered);

    // Apply price filter
    if (filters.price !== undefined && filters.price < 1000) {
      filtered = filtered.filter(product => product.price <= filters.price!);
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (value: Filter) => {
    // Check if this is a clear all operation (all values are "all")
    if (value.brand === "all" && value.category === "all" && value.rating === "all") {
      setActiveFilters({});
      setFilteredProducts(products); // Directly set to all products
      return;
    }

    // If empty object is passed (clear all filters), reset everything
    if (Object.keys(value).length === 0) {
      setActiveFilters({});
      setFilteredProducts(products); // Directly set to all products
      return;
    }

    const newFilters = { ...activeFilters, ...value };

    // Handle clearing individual filters when "all" is selected
    if (value.brand === "all") {
      delete newFilters.brand;
    }
    if (value.category === "all") {
      delete newFilters.category;
    }
    if (value.rating === "all") {
      delete newFilters.rating;
    }

    setActiveFilters(newFilters);
    applyFilters(newFilters);
  };

  const handlePriceChange = (price: number) => {
    const newFilters = { ...activeFilters };
    if (price >= 1000) {
      delete newFilters.price;
      // If no other filters are active, show all products
      if (Object.keys(newFilters).length === 0) {
        setActiveFilters({});
        setFilteredProducts(products);
        return;
      }
    } else {
      newFilters.price = price;
    }
    setActiveFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleClearFilters = () => {
    setActiveFilters({});
    setFilteredProducts(products);
  };

  // Update filtered products when products change
  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(products);
      setActiveFilters({});
    }
  }, [products]);
  return (
    <div className="row overflow-hidden">
      <div className="col-md-3">
        <h5>Showing ({filteredProducts.length}) Results</h5>
        <Filters
          products={products}
          onFilterChange={handleFilterChange}
          onPriceChange={handlePriceChange}
          onClearFilters={handleClearFilters}
        />
      </div>
      <div className="col-md-9">
        <div className="row mt-3 pt-3">
          {filteredProducts.map((product: Product, index: number) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card p-card h-100">
                <Link to={product.id.toString()}>
                  <img
                    className="card-img-top"
                    src={product.thumbnail}
                    alt="Card image cap"
                  />
                </Link>
                <div className="card-body d-flex flex-column">
                  <div>
                    <h4 className="card-title text-truncate" title={product.title}>
                      {product.title}
                    </h4>
                    <span className="badge bg-warning-subtle my-3 p-2 text-black">
                      {product?.brand}
                    </span>
                  </div>
                  <div>
                    <span
                      className="badge bg-success cursor-pointer my-3 me-3 p-2 text-white d-inline-flex align-items-center"
                    >
                      {product?.rating.toFixed(1)}
                      <span className="material-icons ms-1 fs-6">star</span>
                    </span>
                    <span className="badge bg-primary-subtle my-3 p-2 text-black">
                      {product?.category}
                    </span>
                  </div>
                  <p
                    className="card-text text-truncate flex-grow-1"
                    title={product.description}
                  >
                    {product.description}
                  </p>
                  <ul className="list-group list-group-flush mt-auto">
                    <li className="list-group-item">
                      <h4>
                        ₹{product.price}
                        <span className="text-black-50 text-decoration-line-through ms-2 fs-6">
                          {product.discountPercentage}% off
                        </span>
                      </h4>
                    </li>
                    <li className="list-group-item">
                      {product.isAddedToCart ? (
                        <div className="d-flex justify-content-between">
                          <Link className="btn btn-dark d-flex" to={"/cart"}>
                            Go to cart
                            <span className="material-icons ms-2">
                              call_missed_outgoing
                            </span>
                          </Link>
                          <button
                            className="btn btn-danger d-flex"
                            onClick={() => handleCart(product, "remove")}
                          >
                            Remove
                            <span className="material-icons ms-2">remove</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-primary d-flex"
                          onClick={() => handleCart(product, "add")}
                        >
                          Add to cart
                          <span className="material-icons ms-2">
                            add_shopping_cart
                          </span>
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
