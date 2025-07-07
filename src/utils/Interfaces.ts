export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    isAddedToCart: boolean;
    quantity: number;
}

export interface Review {
    id: number;
    body: string;
    postId: number;
    user: User;
}

export interface User {
    id: number;
    username: string;
}

export interface ProductDataLIst {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
}
