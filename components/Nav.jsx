"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Nav = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [toggleDropDown, setToggleDropDown] = useState(false);
  if (!session?.user) return router.push("/");
  const handleSignOut = () => {
    setToggleDropDown(false);
    signOut();
  };
  return (
    <nav className="flex-between w-full m-1 p-3">
      <div className="flex flex-center">
        <p className="logo_text">SECRET SPACE</p>
      </div>
      {/* DESKTOP NAVIGATION */}
      <div className="sm:flex hidden">
        <div className="flex gap-3 md:gap-5">
          {pathname === `/profile/${session?.user.id}` && (
            <Link
              href="/create-memory"
              className="black_btn"
            >
              Create Memory
            </Link>
          )}
          <button
            type="button"
            onClick={handleSignOut}
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
              {pathname === `/profile/${session?.user.id}` && (
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
                onClick={handleSignOut}
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
