import COC from "../../public/coc-logo.svg";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { signIn, signOut, useSession } from "next-auth/react";
import router from "next/router";
import type { FC } from "react";

type AppProps = {
  onClick: () => void;
}

export const Navbar:FC<AppProps> = () => {


  const { status } = useSession();
  return (
    <div className="navbar">
      <div className="flex-1">
        <COC className="h-[40px]" />
      </div>
      <div className="flex-none">
        {status === "unauthenticated" && (
          <button
            className=" btn-ghost btn  hover:bg-red-600 hover:text-white"
            onClick={()=> router.push("/login")}
          >
            <p className="text-xs">Sign Up / Login</p>
          </button>
        )}
        {status === "authenticated" && (
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn">
              <div className="">
                <HiOutlineUserCircle size={24} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <label
                  className=""
                  onClick={() => {
                    signOut();
                  }}
                >
                  logout
                </label>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
