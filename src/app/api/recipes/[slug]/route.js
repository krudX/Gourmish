import { connectDb } from "@/lib/connectDb";
import { Recipe } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    connectDb();

    const recipe = await Recipe.findOne({ slug });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch recipe!");
  }
};

export async function PUT(req, { params }) {
  console.log(params);
  const {
    newTitle: title,
    newSlug: slug,
    newDescription: description,
    newIngredients: ingredients,
    newInstructions: instructions,
    newPrepTime: prep_time,
    newCookTime: cook_time,
    newTotalTime: total_time,
    newServings: servings,
    newDifficulty: difficulty,
    newCategory: category,
    newMealType: meal_type,
    newImageUrl: image_url,
    newAuthorId: author_id,
    newNutritionalFacts: nutritional_facts,
    newNotes: notes,
  } = await req.json();

  await connectDb();
  await Recipe.findByIdAndUpdate(params.slug, {
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
  console.log("Recipe Updated!!");
}

export const DELETE = async (req) => {
  const id = request.nextUrl.searchParams.get("id");
  try {
    await connectDb();
    await Recipe.findByIdAndDelete(id);
    console.log("Recipe Deleted!");
  } catch (err) {
    console.error("Failed to delete recipe!", err);
  }
};
