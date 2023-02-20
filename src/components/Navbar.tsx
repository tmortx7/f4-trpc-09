import COC from "../../public/coc-logo.svg";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import type { FC } from "react";
import Link from "next/link";
import ClickAwayListener from "./ClickAwayListener";
import { api } from "~/utils/api";

export const Navbar: FC = () => {
  const router = useRouter();
  const userQuery = api.user.getUser.useQuery();
  const { data: session, status } = useSession();

  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const id = userQuery?.data?.id ?? ""
  return (
    <nav className="sticky top-0 z-20 border-b bg-white">
      <div className="mx-4 flex justify-center">
        <div className="flex h-[60px] w-full max-w-[1150px] items-center justify-between">
          <Link href="/">
            <div className="flex items-end gap-1">
              <COC className="h-[30px]" />
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link href={status === "authenticated" ? "/upload" : "/login"}>
              <div className="flex flex-row items-center gap-2 border p-1 mr-4">
                <AiOutlinePlus className="h-5 w-5" />
                <span>Order</span>
              </div>
            </Link>
            {status === "unauthenticated" ? (
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              <button
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => router.push("/login")}
                className="btn-info btn"
              >
                Log In
              </button>
            ) : status === "authenticated" ? (
              <ClickAwayListener onClickAway={() => setIsDropdownOpened(false)}>
                {(ref) => (
                  <div ref={ref} className="relative">
                    <button
                      className="btn-sm btn-circle btn"
                      onClick={() => setIsDropdownOpened(!isDropdownOpened)}
                    >
                      {session.user?.name?.charAt(0)}
                    </button>
                    <div
                      className={`absolute top-[120%] right-0 z-50 flex flex-col items-stretch rounded-md bg-white py-2 shadow-[rgb(0_0_0_/_12%)_0px_4px_16px] transition-all [&>*]:whitespace-nowrap ${
                        isDropdownOpened
                          ? "visible opacity-100"
                          : "invisible opacity-0"
                      }`}
                    >
                      <Link href={`/user/edit/${id}`}>
                        <div className="flex flex-row items-center gap-2">
                          <BiUser className="h-6 w-6 fill-black" />
                          <span>Profile</span>
                        </div>
                      </Link>
                      <button
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onClick={() => signOut()}
                        className="flex flex-row items-center gap-2 "
                      >
                        <IoLogOutOutline className="h-6 w-6 fill-black" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </ClickAwayListener>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
