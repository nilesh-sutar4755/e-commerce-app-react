import { useState } from 'react';
import { Product } from '../utils/Interfaces';

export interface Filter {
    brand?: string;
    category?: string;
    rating?: string;
    price?: number;
}

interface Props {
    products: Product[];
    onFilterChange: (filters: Filter) => void;
    onPriceChange: (price: number) => void;
    onClearFilters?: () => void; // Add new prop for clearing
}
const Filters = ({ products, onFilterChange, onPriceChange, onClearFilters }: Props) => {
    const [priceValue, setPriceValue] = useState<number>(1000);
    const [selectValues, setSelectValues] = useState({
        brand: "all",
        category: "all",
        rating: "all"
    });

    const brands = Array.from(new Set(products.map(product => product.brand)));
    const categories = Array.from(new Set(products.map(product => product.category)));
    const ratings = Array.from(new Set([1, 2, 3, 4, 5])); // Assuming ratings are from 1 to 5 stars
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const price = Number(event.target.value);
        setPriceValue(price);
        onPriceChange(price);
    };

    const handleFilterChange = (filter: Filter) => {
        // Update select values
        if (filter.brand !== undefined) {
            setSelectValues(prev => ({ ...prev, brand: filter.brand || "all" }));
        }
        if (filter.category !== undefined) {
            setSelectValues(prev => ({ ...prev, category: filter.category || "all" }));
        }
        if (filter.rating !== undefined) {
            setSelectValues(prev => ({ ...prev, rating: filter.rating || "all" }));
        }

        onFilterChange(filter);
    };

    const clearFilters = () => {
        setPriceValue(1000);
        setSelectValues({ brand: "all", category: "all", rating: "all" });

        // Call the parent's clear function directly
        if (onClearFilters) {
            onClearFilters();
        }
    };
    return (
        <>
            <div className="card p-card">
                <div className="card-body">
                    <h5 className="card-title">Filters</h5>

                    {/* Applied Filters Section */}
                    {(selectValues.brand !== "all" || selectValues.category !== "all" || selectValues.rating !== "all" || priceValue < 1000) && (
                        <div>
                            <div className="mb-3">
                                <h6>Applied Filters:</h6>
                                <div className="d-flex flex-wrap gap-1">
                                    {selectValues.brand !== "all" && (
                                        <span className="badge bg-primary text-white d-flex align-items-center gap-2">Brand: {selectValues.brand}
                                            <span className='text-black material-icons' onClick={() => handleFilterChange({ brand: "" })}>
                                                close
                                            </span>
                                        </span>
                                    )}
                                    {selectValues.category !== "all" && (
                                        <span className="badge bg-primary">Category: {selectValues.category}</span>
                                    )}
                                    {selectValues.rating !== "all" && (
                                        <span className="badge bg-primary">Rating: {selectValues.rating}★</span>
                                    )}
                                    {priceValue < 1000 && (
                                        <span className="badge bg-primary">Price: ≤ ₹{priceValue}</span>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3">
                                <button onClick={clearFilters} className="btn btn-secondary btn-sm">Clear All Filters</button>
                            </div>
                        </div>
                    )}


                    <h6>Price: ₹{priceValue}</h6>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceValue}
                        onChange={handlePriceChange}
                        className="form-range mb-3"
                    />

                    <h6>Brand</h6>
                    <select
                        onChange={(e) => handleFilterChange({ brand: e.target.value })}
                        className='form-select mb-3'
                        value={selectValues.brand}
                    >
                        <option value="all">All</option>
                        {brands.map((brand, index) => (
                            <option key={index} value={brand}>{brand}</option>
                        ))}
                    </select>
                    <h6>Category</h6>
                    <select
                        style={{ textTransform: 'capitalize' }}
                        onChange={(e) => handleFilterChange({ category: e.target.value })}
                        className='form-select mb-3'
                        value={selectValues.category}
                    >
                        <option value="all">All</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                    <h6>Rating</h6>
                    <div>
                        {ratings.map((_rating, index) => (
                            <span className="material-icons w-40px" onClick={() => handleFilterChange({ rating: Math.max(index + 1).toString() })}>
                                {(selectValues.rating === (index + 1).toString() || Number(selectValues.rating) > index) ? 'star' : 'star_bordered'}
                            </span>
                        ))}
                        {
                            selectValues.rating != 'all' &&
                            <button onClick={() => handleFilterChange({ rating: "" })} className="btn btn-sm">
                                <span className="material-icons">
                                    restart_alt
                                </span>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filters