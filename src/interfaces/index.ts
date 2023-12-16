interface Category {
    id: number,
    name: string
}

interface Product {
    id: number,
    name: string,
    price: number;
    discountPercent: Float32Array;
    fixedPrice: number,
    status: string
    categories: Category[];
    thumbnail: string;
}