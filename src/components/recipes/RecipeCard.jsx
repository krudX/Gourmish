"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RecipeCard = ({ recipe }) => {
  // console.log(recipe);

  const router = useRouter();

  const deleteRecipe = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/recipes?id=${recipe._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        console.log("Recipe Deleted!!");
        router.push("/recipes");
      } else {
        console.log("Failed to delete the recipe");
      }
    } catch (error) {
      console.error("Something went wrong while deleting the recipe!", error);
    }
  };

  return (
    <div className="grid-item">
      <div className="card-wrap">
        <Link href={`/recipes/${recipe.slug}`}>
          <div
            className="card-inner group grid rounded-3xl h-[20rem] py-6 px-5 bg-cover bg-center relative overflow-hidden"
            style={{ backgroundImage: `url(${recipe.image_url})` }}
          >
            <div className="overlay"></div>
            <div className="card-content space-y-2 place-content-end z-[1]">
              <h2 className="text-lg font-medium text-background">{recipe.title}</h2>
              <ul className="tags flex items-center gap-2">
                <li className="py-1 px-2 rounded-full bg-white bg-opacity-15 text-white text-xs">
                  {recipe.difficulty}
                </li>

                <li className="py-1 px-2 rounded-full bg-white bg-opacity-15 text-white text-xs">
                  {recipe.meal_type}
                </li>
              </ul>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
