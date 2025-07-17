"use client";
import { useEffect, useState } from "react";
import { lusitana } from "@/app/ui/fonts";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [editId, setEditId] = useState<number | null>(null);

  // Fungsi untuk load dari localStorage
  const fetchProducts = () => {
    const stored = localStorage.getItem("products");
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts([]);
    }
  };

  // Fungsi untuk simpan ke localStorage
  const saveProducts = (updated: Product[]) => {
    localStorage.setItem("products", JSON.stringify(updated));
    setProducts(updated);
  };

  const addProduct = () => {
    if (!name || price <= 0) return;

    if (editId !== null) {
      const updated = products.map((p) =>
        p.id === editId ? { ...p, name, price } : p
      );
      saveProducts(updated);
      setEditId(null);
    } else {
      const newProduct: Product = {
        id: Date.now(),
        name,
        price,
      };
      saveProducts([...products, newProduct]);
    }

    setName("");
    setPrice(0);
  };

  const deleteProduct = (id: number) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  const startEdit = (product: Product) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>

      <div className="mb-4 mt-4 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Product Name"
          className="border px-3 py-2 rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          className="border px-3 py-2 rounded w-full"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button
          onClick={addProduct}
          className={`${
            editId
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white px-4 py-2 rounded`}
        >
          {editId ? "Save" : "Add"}
        </button>
        {editId && (
          <button
            onClick={() => {
              setEditId(null);
              setName("");
              setPrice(0);
            }}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>

      <ul className="space-y-3">
        {products.map((product) => (
          <li
            key={product.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-gray-600">Rp {product.price}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => startEdit(product)}
                className="text-yellow-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
