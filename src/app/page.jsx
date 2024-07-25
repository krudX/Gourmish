import PopularRecipesCarousel from "@/components/PopularRecipesCarousel";
import { getPopularRecipes } from "@/lib/data";

const getRecipes = async () => {
  const res = await fetch("http://localhost:3000/api/recipes", { cache: "no-store" });
};

const Home = async () => {
  // const recipes = await getRecipes();

  return (
    <main id="page-wrap" className="pt-24">
      {/* <PopularRecipesCarousel recipes={recipes} /> */}
    </main>
  );
};

export default Home;
