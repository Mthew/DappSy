import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useDisconnect } from "wagmi";
//NAVIGATION
// import { navigation } from "../../utils/navigationLinks";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import styles from "./header.module.css";

const navigation = [
  //   { name: "Product", href: "#" },
];

export default function Example() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const { disconnect } = useDisconnect();

  return (
    <header className="isolate">
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"></div>
      <div className="px-6 py-6 lg:px-8">
        <div>
          <nav
            className="flex h-9 items-center justify-between text-white"
            aria-label="Global"
          >
            <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">daapsy</span>
                <h3 className="h-8 text-white">Page.name</h3>
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
              </button>
            </div>
            <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-semibold text-gray-900 hover:text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
              {session?.user ? (
                <>
                  {session.user.image && (
                    <img
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  )}
                  &nbsp;
                  <span className="">
                    {session.user.email ?? session.user.name}
                  </span>
                  &nbsp;
                  <a
                    href={`/api/auth/signout`}
                    className="dappsy-button-primary inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600"
                    onClick={(e) => {
                      e.preventDefault();
                      disconnect();
                      signOut();
                    }}
                  >
                    Sign out&nbsp;
                    <span class="text-indigo-200" aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                </>
              ) : (
                <Link href={"/signin"}>
                  <a
                    href="#"
                    className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                  >
                    Log in
                  </a>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
