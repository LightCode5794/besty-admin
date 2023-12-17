interface Category {
    id: number,
    name: string
}

interface Product {
    id: number,
    name: string,
    price: number;
    discountPercent: number;
    fixedPrice: number,
    status: string
    categories: Category[];
    thumbnail: string;
}