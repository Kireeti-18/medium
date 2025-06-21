import { useAtomValue } from 'jotai';
import { useState, useEffect, useRef } from 'react';
import { userInfoAtom } from '../../services/atoms/user';
import { DefaultAvathar } from './DefaultAvathar';
import { removeToken } from '../../services/utilities';
import { useNavigate } from 'react-router-dom';
import { Avathar } from './Avathar';

export default function ProfileDropdown() {
  const navigate = useNavigate();
  const userInfo = useAtomValue(userInfoAtom);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const signout = () => {
    removeToken();
    navigate('/signin');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center text-sm pe-1 pr-2 font-medium text-gray-800 rounded-full hover:text-blue-600 focus:ring-4 focus:ring-gray-100"
        type="button"
      >
        {userInfo.userAvathar.length > 0 ? (
          <Avathar avathar={userInfo.userAvathar}></Avathar>
        ) : (
          <DefaultAvathar name={userInfo.userName} />
        )}

        {userInfo.userName}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-sm z-10">
          <div className="px-4 py-3 text-sm text-gray-800">
            {/* <div className="font-medium">Pro User</div> */}
            <div className="truncate">{userInfo.userEmail}</div>
          </div>
          <ul className="py-2 text-sm text-gray-800">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Settings
              </a>
            </li>
          </ul>
          <div className="py-2">
            <div
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
              onClick={signout}
            >
              Sign out
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
