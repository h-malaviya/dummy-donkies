import { useState } from "react";
import ProductGrid from "../../../shared/components/ProductGrid";
import ProductEditorModal from "./ProductEditorModal";

const tmp_products = [
    {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
        "rating": {
            "rate": 3.9,
            "count": 120
        }
    },
    
]
export default function AdminProducts() {
    const [products, setProducts] = useState(tmp_products);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleDelete = (id) => {

        const ok = window.confirm(
            `Are you sure you want to delete this product?`
        );
        if (ok) {
            setProducts(prev => prev.filter(p => p.id !== id));
        }
    };


const handleSave = (updated) => {
    setProducts(prev =>
        prev.map(p => (p.id === updated.id ? updated : p))
    );
    setEditingProduct(null);
};

return (
    <>
        <ProductGrid
            products={products}
            isAdmin
            onEdit={setEditingProduct}
            onDelete={handleDelete}
        />

        {editingProduct && (
            <ProductEditorModal
                product={editingProduct}
                onSave={handleSave}
                onClose={() => setEditingProduct(null)}
            />
        )}
    </>
);
}
