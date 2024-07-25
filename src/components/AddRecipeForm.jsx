"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/(^-|-$)/g, ""); // Remove leading or trailing hyphens
};

const convertToMinutes = (time) => {
  const value = parseInt(time.value, 10); // Ensure the value is a number
  if (isNaN(value)) return 0; // Return 0 if the value is not a number

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

const AddRecipeForm = () => {
  const router = useRouter();

  const [titleValue, setTitleValue] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState(["", "", ""]);
  const [instructions, setInstructions] = useState(["", "", ""]);
  const [prepTime, setPrepTime] = useState({ value: "", unit: "minutes" });
  const [cookTime, setCookTime] = useState({ value: "", unit: "minutes" });
  const [totalTime, setTotalTime] = useState("");
  const [servings, setServings] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [mealType, setMealType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [nutritionalFacts, setNutritionalFacts] = useState({
    calories: "",
    fat: "",
    protein: "",
    carbs: "",
    sugar: "",
    fiber: "",
    sodium: "",
  });
  const [notes, setNotes] = useState("");

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
      // console.log(titleValue);
    } else {
      setSlug("");
    }
  }, [titleValue]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const recipe = {
      title: titleValue,
      slug,
      description,
      ingredients,
      instructions,
      prep_time: `${prepTime.value} ${prepTime.unit}`,
      cook_time: `${cookTime.value} ${cookTime.unit}`,
      total_time: totalTime,
      servings,
      difficulty,
      category,
      meal_type: mealType,
      image_url: imageUrl,
      author_id: authorId,
      nutritional_facts: nutritionalFacts,
      notes,
    };

    console.log(recipe);

    try {
      const response = await fetch("http://localhost:3000/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleValue,
          slug,
          description,
          ingredients,
          instructions,
          prep_time: `${prepTime.value} ${prepTime.unit}`,
          cook_time: `${cookTime.value} ${cookTime.unit}`,
          total_time: totalTime,
          servings,
          difficulty,
          category,
          meal_type: mealType,
          image_url: imageUrl,
          author_id: authorId,
          nutritional_facts: nutritionalFacts,
          notes,
        }),
      });
      const data = await response.json();
      console.log("Recipe added:", data);
      router.push(`/my-account/recipes`);
    } catch (error) {
      console.error("There was an error adding the recipe!", error);
    }
  };

  return (
    <div className="add-recipe-form form-wrap max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold text-center py-4">Add New Recipe</h2>
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

        {/* <div className="input-group">
          <label htmlFor="authorId" className="w-full">
            Author ID
          </label>
          <input
            type="text"
            name="authorId"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            className="w-full"
          />
        </div> */}

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
          <h6 className="w-full text-xl font-semibold">Instructions</h6>
          <p className="text-sm text-opacity-70 py-3">
            Explain how to make your recipe, including oven temperatures, baking or cooking times,
            and pan sizes, etc. Use optional headers to organize the different parts of the recipe
            (i.e. Prep, Bake, Decorate).
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
            name="prepTime"
            value={prepTime.value}
            onChange={(e) => setPrepTime({ ...prepTime, value: e.target.value })}
            placeholder="e.g., 15"
            className="w-full"
          />
          <select
            value={prepTime.unit}
            name="prepTimeUnit"
            onChange={(e) => setPrepTime({ ...prepTime, unit: e.target.value })}
            className="w-full"
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </div>

        <div className="input-group flex items-center gap-4">
          <label htmlFor="cookTime" className="w-full md:max-w-[120px]">
            Cook Time
          </label>
          <input
            type="number"
            name="cookTime"
            value={cookTime.value}
            onChange={(e) => setCookTime({ ...cookTime, value: e.target.value })}
            placeholder="e.g., 30"
            className="w-full"
          />
          <select
            value={cookTime.unit}
            name="cookTimeUnit"
            onChange={(e) => setCookTime({ ...cookTime, unit: e.target.value })}
            className="w-full"
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </div>

        <div className="input-group flex items-center gap-4">
          <label htmlFor="totalTime" className="w-full md:max-w-[120px]">
            Total Time
          </label>
          <input type="text" value={totalTime} readOnly className="w-full" />
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
          <p className="text-sm text-opacity-70 py-3">
            Add any helpful tips about ingredient substitutions, serving, or storage here.
          </p>
          <textarea
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full"
          />
        </div>

        <button className="py-2 px-5 bg-primary text-background rounded-lg">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
