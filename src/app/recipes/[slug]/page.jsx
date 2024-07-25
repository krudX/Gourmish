import Link from "next/link";
import React from "react";

const getRecipe = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/recipes/${slug}`);

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const RecipeDetailsPage = async ({ params }) => {
  const { slug } = params;

  const recipe = await getRecipe(slug);

  //   console.log(recipe);

  if (!recipe) {
    return <p className="font-medium text-lg">Loading...</p>;
  }

  return (
    <main id="page-wrap" className="pt-24">
      <section className="add-recipe">
        <div className="section-container">
          <h2 className="text-3xl font-semibold text-center py-4">
            {recipe.title || "Recipe Title"}
          </h2>
        </div>
      </section>
      <Link href={`/recipes/${recipe.slug}/edit`}>Edit Recipe</Link>
    </main>
  );
};

export default RecipeDetailsPage;
