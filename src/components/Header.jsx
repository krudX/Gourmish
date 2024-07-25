import { companyData, defaultData, menuLinks } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const session = true;

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 w-full bg-background-rgba bg-opacity-30 backdrop-blur-sm"
    >
      <div className="section-container">
        <div className="header-inner py-5">
          <div className="flex items-center justify-between gap-5">
            <div className="header-left flex items-center gap-16">
              <Link href={"/"} className="logo-wrap flex items-center gap-2">
                <div className="image-wrap h-10 aspect-square">
                  <Image
                    src={companyData.logoMain}
                    alt={`${companyData.brandName} - ${companyData.tagline}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-medium">{companyData.brandName}</span>
              </Link>
              <div className="menu-wrap hidden md:block">
                <ul className="menu-list flex items-center gap-12">
                  {menuLinks.map((item) => {
                    return (
                      <li key={item.title} className="overflow-x-hidden">
                        <Link
                          href={item.path}
                          className="link py-1 inline-block font-medium transition-all"
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="header-right flex items-center gap-4">
              {session ? (
                <div className="add-recipe-btn hidden md:block">
                  <Link
                    href={"/recipes/add"}
                    className="inline-block font-medium py-3 px-4 rounded-full bg-primary text-background"
                  >
                    &#43; Add Recipe
                  </Link>
                </div>
              ) : (
                <div className="login-btn">
                  <Link
                    href={"/"}
                    className="inline-block font-medium py-3 px-5 rounded-full bg-primary text-background"
                  >
                    Login
                  </Link>
                </div>
              )}

              {session && (
                <div className="my-account">
                  <div className="user-avatar">
                    <Link href={"/my-account"}>
                      <div className="image-wrap grid place-content-center h-10 md:h-12 aspect-square rounded-full border border-primary bg-white">
                        {defaultData.defaultUserAvatar ? (
                          <Image
                            src={defaultData.defaultUserAvatar}
                            alt={`${defaultData.defaultUserFirstName} ${defaultData.defaultUserLastName}`}
                            fill
                            objectFit="cover"
                          />
                        ) : (
                          <span className="text-lg md:text-xl font-medium uppercase">
                            {defaultData?.defaultUserFirstName[0]}
                            {defaultData?.defaultUserLastName[0]}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
