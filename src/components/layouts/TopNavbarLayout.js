import React, { useState, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';

import DropDownItem from '../dropdowns/DropDownItem';
import DropDown from '../dropdowns/DropDown';
import { useAuth } from '../../services/api-authentication';
import DefaultNavbar from '../navigation/navbars/DefaultNavbar';
import { useTranslation } from 'react-i18next';
import { useSubscriptionToSingleUser } from '../../graphql/user';

import imageSignet from '../../images/logos/monogramme.svg';
import imageUserPlaceholder from '../../images/placeholders/user.png';

const TopNavbarLayout = ({ children }) => {
  const { signOut, status, user: userId } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user, loading } = useSubscriptionToSingleUser({ userId });

  const { t } = useTranslation();

  const onClickDropDown = useCallback(
    () => setIsDropdownOpen(!isDropdownOpen),
    [isDropdownOpen]
  );

  return (
    <>
      <DefaultNavbar
        renderFullSizeContent={() => (
          <>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/">
                  <img src={imageSignet} className="h-8 w-8" alt="" />
                </Link>
              </div>
              {status === 'logged-in' && (
                <div className="hidden md:block pl-10 w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                  <div className="text-sm lg:flex-grow">
                    <NavLink
                      to="/studies"
                      className="ml-4 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                      activeClassName="text-gray-900"
                    >
                      Studies
                    </NavLink>

                    <NavLink
                      to="/users/volunteers"
                      className="ml-4 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                      activeClassName="text-gray-900"
                    >
                      Volunteers
                    </NavLink>

                    <NavLink
                      to="/messages"
                      className="ml-4 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                      activeClassName="text-gray-900"
                    >
                      Messages
                    </NavLink>

                    <NavLink
                      to="/devices"
                      className="ml-4 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                      activeClassName="text-gray-900"
                    >
                      Devices
                    </NavLink>

                    <NavLink
                      to="/forms"
                      className="ml-4 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                      activeClassName="text-gray-900"
                    >
                      Forms
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
            {status === 'logged-in' ? (
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <DropDown
                    renderTitle={() => (
                      <button
                        onClick={onClickDropDown}
                        className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                      >
                        <img
                          className="h-8 w-8 rounded-lg border border-gray-500 hover:border-gray-600 ease-in-out"
                          src={
                            loading
                              ? null
                              : user.photoURL || imageUserPlaceholder
                          }
                          alt=""
                        />
                      </button>
                    )}
                    renderItems={() => (
                      <>
                        <DropDownItem>
                          <Link to="/user/profile">
                            <strong>{loading ? 'email' : user.id}</strong>
                          </Link>
                        </DropDownItem>
                        <DropDownItem>
                          <button
                            onClick={signOut}
                            className="block w-full text-left"
                          >
                            {t('auth:signout')}
                          </button>
                        </DropDownItem>
                      </>
                    )}
                  />
                </div>
              </div>
            ) : (
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <span className="ml-4 flex items-baseline">
                    <NavLink
                      to="/auth/signin"
                      className="ml-4 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                      activeClassName="text-gray-900"
                    >
                      {t('auth:signin')}
                    </NavLink>
                  </span>
                  <span className="ml-4 flex items-baseline">
                    <NavLink
                      to="/auth/signup"
                      className="ml-4 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                      activeClassName="text-gray-900"
                    >
                      {t('auth:signup')}
                    </NavLink>
                  </span>
                </div>
              </div>
            )}
          </>
        )}
        renderHamburgerContent={() => (
          <>
            <div className="px-2 pt-2 pb-3 sm:px-3">
              {status === 'logged-in' && (
                <>
                  <div className="pt-4 pb-3 border-t border-gray-700">
                    <NavLink
                      to="/studies"
                      className="ml-4 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                      activeClassName="text-gray-900"
                    >
                      Studies
                    </NavLink>
                  </div>
                  <div className="pt-4 pb-3 border-t border-gray-700">
                    <NavLink
                      to="/users/volunteers"
                      className="ml-4 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                      activeClassName="text-gray-900"
                    >
                      Volunteers
                    </NavLink>
                  </div>
                  <div className="pt-4 pb-3 border-t border-gray-700">
                    <NavLink
                      to="/messages"
                      className="ml-4 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                      activeClassName="text-gray-900"
                    >
                      Messages
                    </NavLink>
                  </div>
                  <div className="pt-4 pb-3 border-t border-gray-700">
                    <NavLink
                      to="/devices"
                      className="ml-4 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                      activeClassName="text-gray-900"
                    >
                      Devices
                    </NavLink>
                  </div>
                </>
              )}
            </div>
            {status === 'logged-in' ? (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-lg border border-gray-500 hover:border-gray-600 ease-in-out"
                      src={
                        loading ? null : user.photoURL || imageUserPlaceholder
                      }
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-gray-600">
                      {loading ? 'name' : user.name}
                    </div>
                    <div className="mt-1 text-sm font-medium leading-none text-gray-400">
                      {loading ? 'email' : user.id}
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2">
                  <span
                    onClick={signOut}
                    className="mt-1 block font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out cursor-pointer"
                  >
                    {t('auth:signout')}
                  </span>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="mt-3 px-2">
                  <NavLink
                    to="/auth/signin"
                    className="ml-4 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                    activeClassName="text-gray-900"
                  >
                    {t('auth:signin')}
                  </NavLink>
                </div>
                <div className="mt-3 px-2">
                  <NavLink
                    to="/auth/signup"
                    className="ml-4 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                    activeClassName="text-gray-900"
                  >
                    {t('auth:signup')}
                  </NavLink>
                </div>
              </div>
            )}
          </>
        )}
      />
      <div className="pt-16 h-screen">{children}</div>
    </>
  );
};

export default TopNavbarLayout;
