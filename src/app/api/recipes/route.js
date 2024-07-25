import { connectDb } from "@/lib/connectDb";
import { Recipe } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    connectDb();

    const recipes = await Recipe.find();
  } catch (error) {
    console.error("Failed to fetch!!", error);
  }
};

export async function POST(req, res) {
  try {
    await connectDb();
    const {
      title,
      slug,
      description,
      ingredients,
      instructions,
      prep_time,
      cook_time,
      total_time,
      servings,
      difficulty,
      category,
      meal_type,
      image_url,
      author_id,
      nutritional_facts,
      notes,
    } = await req.json();

    const newRecipe = new Recipe({
      title,
      slug,
      description,
      ingredients,
      instructions,
      prep_time,
      cook_time,
      total_time,
      servings,
      difficulty,
      category,
      meal_type,
      image_url,
      author_id,
      nutritional_facts,
      notes,
    });

    await newRecipe.save();
    console.log("Recipe Added!!");
  } catch (error) {
    console.error("Something went wrong while adding the recipe!", error);
  }
}

// export async function DELETE(request) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connectDb();
//   await Recipe.findByIdAndDelete(id);
//   console.log("Recipe Deleted!!");
//   return NextResponse.json({ message: "Recipe Deleted!!" });
// }
