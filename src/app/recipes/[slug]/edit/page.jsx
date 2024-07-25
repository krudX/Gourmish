"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import EditRecipeForm from "@/components/EditRecipeForm";

const EditRecipePage = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/recipes/${slug}`);
        const data = await response.json();
        setRecipe(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      }
    };

    if (slug) {
      fetchRecipe();
    }
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <main id="page-wrap" className="pt-24">
      <section className="edit-recipe">
        <div className="section-container">
          <EditRecipeForm recipe={recipe} />
        </div>
      </section>
    </main>
  );
};

export default EditRecipePage;
