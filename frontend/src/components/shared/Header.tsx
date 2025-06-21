import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import ProfileDropdown from './ProfileDropdown';

export default function Header({ type }: { type: 'login' | 'home' }) {
  return (
    <div className="sticky top-0 z-10 bg-white shadow h-16 flex items-center justify-between px-10">
      <div>
        <Logo />
      </div>
      <div className="flex gap-5">
        {type === 'login' && (
          <>
            <NavLink
              to="/signup"
              className="text-xl focus:underline hover:cursor-pointer"
            >
              signup
            </NavLink>
            <NavLink to="/signin" className="text-xl hover:cursor-pointer">
              signin
            </NavLink>
          </>
        )}
        {type === 'home' && (
          <>
            <ProfileDropdown />
          </>
        )}
      </div>
    </div>
  );
}
