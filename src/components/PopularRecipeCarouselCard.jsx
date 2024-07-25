import Link from "next/link";
import React from "react";

const PopularRecipeCarouselCard = ({ recipe }) => {
  return (
    <div className="card-wrap">
      <Link href={"/"}>
        <div
          className="card-inner group grid rounded-3xl h-[30rem] py-6 px-5 bg-cover bg-center relative overflow-hidden"
          style={{ backgroundImage: `url(${recipe.featuredImage})` }}
        >
          <div className="overlay"></div>
          <div className="card-content space-y-2 place-content-end z-[1]">
            <h2 className="text-lg font-medium text-background">{recipe.title}</h2>
            <ul className="tags flex items-center gap-2">
              <li className="py-1 px-2 rounded-full bg-white bg-opacity-15 text-white text-xs">
                {recipe.cuisine[0]}
              </li>

              <li className="py-1 px-2 rounded-full bg-white bg-opacity-15 text-white text-xs">
                {recipe.courses[0]}
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PopularRecipeCarouselCard;
