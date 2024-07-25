"use client";

import { useRouter } from "next/navigation";

const DeleteRecipeButton = ({ id }) => {
  //   console.log(id);
  const router = useRouter();

  const deleteRecipe = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/recipes?id=${id}`, {
        method: "DELETE",
      });

      router.push("/my-account/recipes");
    } catch (error) {
      console.error("There was an error while deleting recipes!", error);
    }
  };

  return (
    <button
      onClick={deleteRecipe}
      className="inline-block py-1 px-3 my-3 text-sm font-medium rounded-md bg-border"
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
