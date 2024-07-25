import AddRecipeForm from "@/components/addRecipeForm";

export const metadata = {
  title: "Add Recipe",
};

const AddRecipePage = () => {
  return (
    <main id="page-wrap" className="pt-24">
      <section className="add-recipe">
        <div className="section-container">
          <AddRecipeForm />
        </div>
      </section>
    </main>
  );
};

export default AddRecipePage;
