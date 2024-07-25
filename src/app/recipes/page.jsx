import RecipeCard from "@/components/recipes/RecipeCard";

const getRecipes = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/recipes", {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("There was an error while fetching recipes!", error);
  }
};

const RecipesPage = async () => {
  const data = await getRecipes();

  //   console.log(data);

  return (
    <main id="page-wrap" className="pt-24">
      <section className="add-recipe">
        <div className="section-container">
          <h2 className="text-3xl font-semibold text-center py-4">All Recipes</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {data.map((item) => {
              return <RecipeCard key={item._id} recipe={item} />;
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default RecipesPage;
