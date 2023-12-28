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


interface SizeColor {
   
    inventory: number;
    size: string;
}
interface Variation {
    color: string,
    image: string,
    price: number,
    sizesColor: SizeColor[]
}
interface ProductDetails {
    id: number,
    name: string,
    price: number;
    description: string,
    discountPercent: number;
    fixedPrice: number,
    status: string
    categories: Category[];
    thumbnail: string;
    images: string[],
    variations: Variation[]
}