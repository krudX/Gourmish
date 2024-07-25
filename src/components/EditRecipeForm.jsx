"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const convertToMinutes = (time) => {
  const value = parseInt(time.value, 10);
  if (isNaN(value)) return 0;

  switch (time.unit) {
    case "minutes":
      return value;
    case "hours":
      return value * 60;
    case "days":
      return value * 24 * 60;
    default:
      return 0;
  }
};

const formatTotalTime = (totalMinutes) => {
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  let result = "";
  if (days > 0) result += `${days} days `;
  if (hours > 0) result += `${hours} hours `;
  if (minutes > 0) result += `${minutes} minutes`;

  return result.trim();
};

const calculateTotalTime = (prepTime, cookTime) => {
  const totalMinutes = convertToMinutes(prepTime) + convertToMinutes(cookTime);
  return formatTotalTime(totalMinutes);
};

const EditRecipeForm = ({ recipe }) => {
  const router = useRouter();

  const [titleValue, setTitleValue] = useState(recipe.title);
  const [slug, setSlug] = useState(recipe.slug);
  const [description, setDescription] = useState(recipe.description);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [prepTime, setPrepTime] = useState({
    value: recipe.prep_time.split(" ")[0],
    unit: recipe.prep_time.split(" ")[1],
  });
  const [cookTime, setCookTime] = useState({
    value: recipe.cook_time.split(" ")[0],
    unit: recipe.cook_time.split(" ")[1],
  });
  const [totalTime, setTotalTime] = useState(recipe.total_time);
  const [servings, setServings] = useState(recipe.servings);
  const [difficulty, setDifficulty] = useState(recipe.difficulty);
  const [category, setCategory] = useState(recipe.category);
  const [mealType, setMealType] = useState(recipe.meal_type);
  const [imageUrl, setImageUrl] = useState(recipe.image_url);
  const [authorId, setAuthorId] = useState(recipe.author_id);
  const [nutritionalFacts, setNutritionalFacts] = useState({
    calories: recipe.nutritional_facts.calories,
    fat: recipe.nutritional_facts.fat,
    protein: recipe.nutritional_facts.protein,
    carbs: recipe.nutritional_facts.carbs,
    sugar: recipe.nutritional_facts.sugar,
    fiber: recipe.nutritional_facts.fiber,
    sodium: recipe.nutritional_facts.sodium,
  });
  const [notes, setNotes] = useState(recipe.notes);

  const handleAddIngredient = () => setIngredients([...ingredients, ""]);
  const handleRemoveIngredient = (index) =>
    setIngredients(ingredients.filter((_, i) => i !== index));
  const handleIngredientChange = (index, value) =>
    setIngredients(ingredients.map((ingredient, i) => (i === index ? value : ingredient)));

  const handleAddInstruction = () => setInstructions([...instructions, ""]);
  const handleRemoveInstruction = (index) =>
    setInstructions(instructions.filter((_, i) => i !== index));
  const handleInstructionChange = (index, value) =>
    setInstructions(instructions.map((instruction, i) => (i === index ? value : instruction)));

  useEffect(() => {
    setTotalTime(calculateTotalTime(prepTime, cookTime));
  }, [prepTime, cookTime]);

  useEffect(() => {
    if (titleValue) {
      setSlug(generateSlug(titleValue));
    } else {
      setSlug("");
    }
  }, [titleValue]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedRecipe = {
      newTitle: titleValue,
      newSlug: slug,
      newDescription: description,
      newIngredients: ingredients,
      newInstructions: instructions,
      newPrepTime: `${prepTime.value} ${prepTime.unit}`,
      newCookTime: `${cookTime.value} ${cookTime.unit}`,
      newTotalTime: totalTime,
      newServings: servings,
      newDifficulty: difficulty,
      newCategory: category,
      newMealType: mealType,
      newImageUrl: imageUrl,
      newAuthorId: authorId,
      newNutritionalFacts: nutritionalFacts,
      newNotes: notes,
    };

    console.log(updatedRecipe);

    try {
      const response = await fetch(`http://localhost:3000/api/recipes/${recipe._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTitle: titleValue,
          newSlug: slug,
          newDescription: description,
          newIngredients: ingredients,
          newInstructions: instructions,
          newPrepTime: `${prepTime.value} ${prepTime.unit}`,
          newCookTime: `${cookTime.value} ${cookTime.unit}`,
          newTotalTime: totalTime,
          newServings: servings,
          newDifficulty: difficulty,
          newCategory: category,
          newMealType: mealType,
          newImageUrl: imageUrl,
          newAuthorId: authorId,
          newNutritionalFacts: nutritionalFacts,
          newNotes: notes,
        }),
      });
      const data = await response.json();
      console.log("Recipe updated:", data);
      router.push(`/recipes/${recipe.slug}`);
    } catch (error) {
      console.error("There was an error updating the recipe!", error);
    }
  };

  return (
    <div className="add-recipe-form form-wrap max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold text-center py-4">Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="title" className="w-full">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            placeholder="Give your recipe a title"
            className="w-full"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="description" className="w-full">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share the story behind your recipe and what makes it special."
            className="w-full"
          ></textarea>
        </div>

        <div className="input-group">
          <label htmlFor="imageUrl" className="w-full">
            Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="divider my-8 border border-border"></div>

        <div className="input-group">
          <label htmlFor="ingredient" className="w-full text-xl">
            Ingredients
          </label>
          <p className="text-sm text-opacity-70 py-3">
            Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any
            special preparation (i.e. sifted, softened, chopped). Use optional headers to organize
            the different parts of the recipe (i.e. Cake, Frosting, Dressing).
          </p>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-field my-2 flex items-center gap-4">
              <input
                type="text"
                name="ingredient"
                value={ingredient || ""}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="w-full"
              />

              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
                className="p-1 text-sm rounded-full bg-border"
              >
                <Image src={"/icon-close.svg"} width={24} height={24} alt="Remove Ingredient" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="py-2 px-3 mt-3 text-sm bg-primary text-background rounded-lg"
          >
            Add Ingredient
          </button>
        </div>

        <div className="divider my-8 border border-border"></div>

        <div className="input-group">
          <label htmlFor="instructions" className="w-full text-xl">
            Instructions
          </label>
          <p className="text-sm text-opacity-70 py-3">
            List each step in your recipe to make it easy to follow. Use optional headers to
            organize the different parts of the recipe (i.e. Cake, Frosting, Dressing).
          </p>

          {instructions.map((instruction, index) => (
            <div key={index}>
              <label htmlFor="instruction" className="w-full">
                Step {index + 1}
              </label>
              <div className="instruction-field mb-3 flex items-center gap-4">
                <textarea
                  type="text"
                  name="instruction"
                  value={instruction || ""}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  className="w-full"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveInstruction(index)}
                  className="p-1 text-sm rounded-full bg-border"
                >
                  <Image src={"/icon-close.svg"} width={24} height={24} alt="Remove Ingredient" />
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddInstruction}
            className="py-2 px-3 mt-3 text-sm bg-primary text-background rounded-lg"
          >
            Add Instruction
          </button>
        </div>

        <div className="divider my-8 border border-border"></div>

        <div className="input-group flex items-center gap-4">
          <label htmlFor="prepTime" className="w-full md:max-w-[120px]">
            Prep Time
          </label>
          <input
            type="number"
            name="prepTimeValue"
            value={prepTime.value}
            onChange={(e) => setPrepTime({ ...prepTime, value: e.target.value })}
            className="w-full"
            required
          />
          <select
            name="prepTimeUnit"
            value={prepTime.unit}
            onChange={(e) => setPrepTime({ ...prepTime, unit: e.target.value })}
            className="w-full"
          >
            <option value="minutes">minutes</option>
            <option value="hours">hours</option>
            <option value="days">days</option>
          </select>
        </div>

        <div className="input-group flex items-center gap-4">
          <label htmlFor="cookTime" className="w-full md:max-w-[120px]">
            Cook Time
          </label>
          <input
            type="number"
            name="cookTimeValue"
            value={cookTime.value}
            onChange={(e) => setCookTime({ ...cookTime, value: e.target.value })}
            className="w-full"
            required
          />
          <select
            name="cookTimeUnit"
            value={cookTime.unit}
            onChange={(e) => setCookTime({ ...cookTime, unit: e.target.value })}
            className="w-full"
          >
            <option value="minutes">minutes</option>
            <option value="hours">hours</option>
            <option value="days">days</option>
          </select>
        </div>

        <div className="input-group flex items-center gap-4">
          <label htmlFor="totalTime" className="w-full md:max-w-[120px]">
            Total Time
          </label>
          <input type="text" name="totalTime" value={totalTime} readOnly className="w-full" />
        </div>

        <div className="divider my-8 border border-border"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
          <div className="input-group">
            <label htmlFor="servings" className="w-full">
              Servings
            </label>
            <input
              type="number"
              name="servings"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              placeholder="e.g., 4"
              className="w-full"
            />
          </div>
          <div className="input-group">
            <label htmlFor="difficulty" className="w-full">
              Difficulty
            </label>
            <input
              type="text"
              name="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              placeholder="e.g., Easy, Medium, Hard"
              className="w-full"
            />
          </div>
          <div className="input-group">
            <label htmlFor="category" className="w-full">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Dessert, Main Course"
              className="w-full"
            />
          </div>
          <div className="input-group">
            <label htmlFor="mealType" className="w-full">
              Meal Type
            </label>
            <input
              type="text"
              name="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              placeholder="e.g., Breakfast, Dinner"
              className="w-full"
            />
          </div>
        </div>

        <div className="divider my-8 border border-border"></div>

        <h5 className="text-xl font-semibold pb-4">Nutritional Information:</h5>
        <div className="input-group">
          <label htmlFor="calories" className="w-full">
            Calories
          </label>
          <input
            type="text"
            name="calories"
            value={nutritionalFacts.calories}
            onChange={(e) => setNutritionalFacts({ ...nutritionalFacts, calories: e.target.value })}
            placeholder="e.g., 200 kcal"
            className="w-full"
          />
        </div>

        <div className="input-group">
          <label htmlFor="fat" className="w-full">
            Fat
          </label>
          <input
            type="text"
            name="fat"
            value={nutritionalFacts.fat}
            onChange={(e) => setNutritionalFacts({ ...nutritionalFacts, fat: e.target.value })}
            placeholder="e.g., 10 g"
            className="w-full"
          />
        </div>

        <div className="input-group">
          <label htmlFor="Protein" className="w-full">
            Protein
          </label>
          <input
            type="text"
            name="Protein"
            value={nutritionalFacts.protein}
            onChange={(e) => setNutritionalFacts({ ...nutritionalFacts, protein: e.target.value })}
            placeholder="e.g., 5 g"
            className="w-full"
          />
        </div>

        <div className="input-group">
          <label htmlFor="carbs" className="w-full">
            Carbohydrates
          </label>
          <input
            type="text"
            name="carbs"
            value={nutritionalFacts.carbs}
            onChange={(e) => setNutritionalFacts({ ...nutritionalFacts, carbs: e.target.value })}
            placeholder="e.g., 30 g"
            className="w-full"
          />
        </div>

        <div className="input-group">
          <label htmlFor="sugar" className="w-full">
            Sugar
          </label>
          <input
            type="text"
            name="sugar"
            value={nutritionalFacts.sugar}
            onChange={(e) => setNutritionalFacts({ ...nutritionalFacts, sugar: e.target.value })}
            placeholder="e.g., 15 g"
            className="w-full"
          />
        </div>

        <div className="input-group">
          <label htmlFor="fiber" className="w-full">
            Fiber
          </label>
          <input
            type="text"
            name="fiber"
            value={nutritionalFacts.fiber}
            onChange={(e) => setNutritionalFacts({ ...nutritionalFacts, fiber: e.target.value })}
            placeholder="e.g., 5 g"
            className="w-full"
          />
        </div>

        <div className="input-group">
          <label htmlFor="sodium" className="w-full">
            Sodium
          </label>
          <input
            type="text"
            name="sodium"
            value={nutritionalFacts.sodium}
            onChange={(e) => setNutritionalFacts({ ...nutritionalFacts, sodium: e.target.value })}
            placeholder="e.g., 200 g"
            className="w-full"
          />
        </div>

        <div className="divider my-8 border border-border"></div>

        <div className="input-group">
          <label htmlFor="notes" className="w-full">
            Notes
          </label>
          <textarea
            name="notes"
            id="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Share any additional notes or tips for making this recipe."
            className="w-full"
          ></textarea>
        </div>

        {/* <div className="input-group">
          <label htmlFor="authorId" className="w-full">
            Author ID
          </label>
          <input
            type="text"
            name="authorId"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            placeholder="ID of the recipe author"
            className="w-full"
          />
        </div> */}

        <button type="submit" className="bg-primary text-background text-sm px-6 py-2 rounded mt-4">
          Save Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipeForm;
