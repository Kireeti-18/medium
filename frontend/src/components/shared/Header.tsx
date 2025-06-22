import { useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import ProfileDropdown from './ProfileDropdown';

export default function Header({
  type,
}: {
  type: 'login' | 'home' | 'create';
}) {
  const navigate = useNavigate();
  const navContent = useMemo(() => {
    if (type === 'login') {
      return (
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
      );
    }

    if (type === 'home' || type === 'create') {
      return (
        <div className="flex gap-10 items-center">
          {type !== 'create' && (
            <button
              type="button"
              className="text-gray border-1 border-gray-800 hover:bg-gray-200 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
              onClick={() => navigate('/create/blog')}
            >
              Create Blog
            </button>
          )}

          <ProfileDropdown />
        </div>
      );
    }

    return null;
  }, [type]);

  return (
    <div className="sticky top-0 z-10 bg-white shadow h-16 flex items-center justify-between px-10">
      <div>
        <Logo />
      </div>
      <div className="flex gap-5">{navContent}</div>
    </div>
  );
}
