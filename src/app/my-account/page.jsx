import Link from "next/link";
import React from "react";

export const metadata = {
  title: "My Account",
};

const MyAccountPage = () => {
  return (
    <main id="page-wrap" className="pt-24">
      <section className="add-recipe">
        <div className="add-recipe-form form-wrap max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-center py-4">My Account</h2>

          <Link href={"/my-account/recipes"}>My Recipes</Link>
        </div>
      </section>
    </main>
  );
};

export default MyAccountPage;
