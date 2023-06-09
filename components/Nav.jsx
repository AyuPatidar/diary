"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Nav = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [toggleDropDown, setToggleDropDown] = useState(false);
  return (
    <nav className="flex-between w-full m-1 p-3">
      <div className="flex flex-center">
        <p className="logo_text">SECRET SPACE</p>
      </div>
      {/* DESKTOP NAVIGATION */}
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5">
          {pathname === `/profile` && (
            <Link
              href="/create-memory"
              className="black_btn"
            >
              Create Memory
            </Link>
          )}
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="outline_btn"
          >
            Sign Out
          </button>
        </div>
      </div>
      {/* MOBILE NAVIGATION */}
      <div className="sm:hidden flex relative">
        <div className="flex">
          <Image
            src={session?.user.image}
            width={37}
            height={37}
            alt="user-image"
            className="rounded-full"
            onClick={() => setToggleDropDown((prev) => !prev)}
          />
          {toggleDropDown && (
            <div className="dropdown">
              {pathname === `/profile` && (
                <Link
                  href="/create-memory"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Memory
                </Link>
              )}
              <button
                type="button"
                className="mt-2 black_btn w-full"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
