"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "@/utils/firebase";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";
import Navbar from "@/containers/public/Navbar";

const ProductDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docSnap = await getDoc(doc(db, "listings", id));
        if (docSnap.exists()) {
          setProduct({ id, ...docSnap.data() });
        }
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "listings", id));
    toast.success("Listing deleted");
    router.push("/explore");
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (!product) return <p className="text-center mt-10 text-red-500">Product not found.</p>;

  return (
    <>
      <Navbar />
      <div className="bg-maroon-50 min-h-screen py-10 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden grid md:grid-cols-2 gap-8 p-8">
          <Image
            src={product.imageURL || "/noImage.svg"}
            alt={`Image of ${product.title}`}
            width={500}
            height={500}
            className="rounded-xl border border-black object-cover w-full max-h-[500px]"
          />

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-maroon-900">{product.title}</h1>
              <p className="mt-2 text-gray-700 text-lg">{product.description}</p>

              <ul className="mt-4 text-sm text-gray-600 space-y-1">
                <li><strong>Category:</strong> {product.category}</li>
                <li><strong>Condition:</strong> {product.condition}</li>
                <li><strong>Meeting Spot:</strong> {product.meetingSpot}</li>
              </ul>
            </div>

            {/* User options */}
            {user?.uid === product.user_id ? (
              <div className="flex flex-wrap gap-4 mt-6">
                <Link
                  href={`/product/edit/${id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Edit Listing
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Delete Listing
                </button>
              </div>
            ) : (
              <button className="mt-6 px-4 py-2 bg-maroon-900 hover:bg-maroon-700 text-white rounded-lg w-full">
                Request Swap
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
