import DeleteRecipeButton from "@/components/recipes/DeleteRecipeButton";
import RecipeCard from "@/components/recipes/RecipeCard";
import { companyData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

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

const formatDate = (createdAt) => {
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formattedDate;
};

const RecipesPage = async () => {
  const data = await getRecipes();

  return (
    <main id="page-wrap" className="pt-24">
      <section className="add-recipe">
        <div className="section-container">
          <h2 className="text-3xl font-semibold text-center py-4">My Recipes</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {data.map((item) => {
              return (
                <div key={item._id} className="grid-item">
                  <div className="card-wrap space-y-3">
                    <div className="card-media">
                      {item.image_url ? (
                        <div className="image-wrap relative rounded-lg overflow-hidden w-full aspect-video">
                          <Image
                            src={item.image_url}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="dummy-image-wrap relative w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-border">
                          <div className="image-wrap h-16 aspect-square">
                            <Image
                              src={"/logo-white.svg"}
                              alt="Dummy Image"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="card-body">
                      <h5 className="text-base font-medium">{item.title}</h5>
                      <p className="text-sm">{formatDate(item.createdAt)}</p>
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/recipes/${item.slug}/edit`}
                          className="inline-block py-1 px-3 my-3 text-sm font-medium rounded-md bg-border"
                        >
                          Edit Recipe
                        </Link>
                        <DeleteRecipeButton id={item._id} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default RecipesPage;
