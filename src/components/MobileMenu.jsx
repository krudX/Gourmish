"use client";

import { menuLinks } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mobile-menu-trigger md:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="">
        <div className="image-wrap grid place-content-center h-10 md:h-12 aspect-square">
          <Image src={"/icon-menu.svg"} width={30} height={30} alt="Mobile Menu" />
        </div>
      </button>
      {isOpen && (
        <div className="mobile-menu fixed right-0 top-0 w-4/5 h-screen">
          <div className="menu-wrap bg-background h-full border-l border-l-primary p-4">
            <button onClick={() => setIsOpen(!isOpen)} className="">
              <div className="image-wrap grid place-content-center h-10 md:h-12 aspect-square">
                <Image src={"/icon-close.svg"} width={30} height={30} alt="Mobile Menu" />
              </div>
            </button>
            <ul className="menu-list space-y-3">
              {menuLinks.map((item) => {
                return (
                  <li key={item.title} className="overflow-x-hidden">
                    <Link href={item.path} className="mobile-link py-1 inline-block font-medium">
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
