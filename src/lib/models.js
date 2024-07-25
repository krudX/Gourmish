import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  comment: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    prep_time: { type: String },
    cook_time: { type: String },
    total_time: { type: String },
    servings: { type: Number },
    difficulty: { type: String },
    category: { type: String },
    meal_type: { type: String },
    image_url: { type: String },
    author_id: { type: String },
    // author_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    nutritional_facts: {
      calories: { type: String },
      fat: { type: String },
      protein: { type: String },
      carbs: { type: String },
      sugar: { type: String },
      fiber: { type: String },
      sodium: { type: String },
    },
    notes: { type: String },
    popularity_score: { type: Number, default: 0 },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_picture: { type: String },
    bio: { type: String },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  },
  { timestamps: true }
);

export const Recipe = mongoose.models?.Recipe || mongoose.model("Recipe", recipeSchema);
export const User = mongoose.models?.User || mongoose.model("User", userSchema);
