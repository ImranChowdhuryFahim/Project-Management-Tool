import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon,UserCircleIcon,UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "store";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {

  const socket = useSelector((state:RootState)=>state.socket.socket);

  useEffect(() => {
    if (socket) {
      socket.on("notification", (notification:any) => {
        console.log(notification);
      });

      return () => {
        socket.off("notification");
      };
    }
  }, []);
  
  return (
    <div className="sticky top-0 z-30 bg-white border shadow-md border-d-gray-300">
      <>
        <div className="px-2 mx-auto max-w sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center flex-1 justify-left sm:items-stretch sm:justify-start">
              <div className="flex items-center flex-shrink-0">
                <img
                  className="block w-auto h-8 lg:hidden"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
                <img
                  className="hidden w-auto h-8 lg:block"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
                <Link
                  href="/"
                  className="items-center justify-center px-3 font-bold text-black"
                >
                  JLACK
                </Link>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className=" bg-light text-black-400 hover:text-black focus:outline-none"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="w-6 h-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex text-sm bg-white rounded-full">
                    <span className="sr-only">Open user menu</span>
                    <UserCircleIcon className="w-6 h-6" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Your Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
