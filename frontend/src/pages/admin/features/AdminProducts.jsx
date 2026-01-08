import { useState, useMemo } from "react";
import ProductGrid from "../../../shared/components/ProductGrid";
import ProductEditorModal from "./ProductEditorModal";
import useProducts from "../../../hooks/useProducts";
import { useOutletContext } from "react-router-dom";
import Loading from "../../../shared/components/Loading";
import './styles/adminProducts.scss'
const EMPTY_PRODUCT = {
    title: "",
    price: 0,
    description: "",
    category: "",
};
export default function AdminProducts() {

    const [editingProduct, setEditingProduct] = useState(null);
    const { products, loading, error, deleteProduct, updateProduct, createProduct } = useProducts();
    const { search } = useOutletContext();
    const handleDelete = async (id) => {
        const ok = window.confirm("Are you sure you want to delete this product?");
        if (ok) {
            try {
                await deleteProduct(id);
            } catch (error) {
                console.error("Error in product deletion");

            }
        }
    };
    const handleSave = async (updated) => {
        await updateProduct(updated.id, updated);
        setEditingProduct(null);
    };
    const handleAdd = async(productData) => {
        await createProduct(productData);
        setEditingProduct(null);
    }
    const filteredProducts = useMemo(() => {
        if (!search.trim()) return products;

        const q = search.toLowerCase();
        return products.filter(
            (p) =>
                p.title.toLowerCase().includes(q) ||
                p.description?.toLowerCase().includes(q) ||
                p.category?.toLowerCase().includes(q)
        );
    }, [products, search]);

    if (loading) return <Loading />;
    if (error) return <p>Error loading products</p>;
    return (
        <>
            <div className="admin-products-header">
                <h2>Products</h2>
                <button
                    className="add-product-btn"
                    onClick={() => setEditingProduct(EMPTY_PRODUCT)}
                >
                    + Add Product
                </button>
            </div>
            <ProductGrid
                products={filteredProducts}
                onEdit={setEditingProduct}
                onDelete={handleDelete}
            />

            {editingProduct && (
                <ProductEditorModal
                    product={editingProduct}
                    onSave={handleSave}
                    onClose={() => setEditingProduct(null)}
                    onAdd={handleAdd}
                />
            )}
        </>
    );
}
