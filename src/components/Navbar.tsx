import COC from '../../public/coc-logo.svg'
import { HiOutlineUserCircle } from "react-icons/hi2";

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <COC className="h-[25px]"/>
      </div>
      <div className="flex-none">

        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn">
            <div className="">
              <HiOutlineUserCircle size={24

              }/>
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
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
