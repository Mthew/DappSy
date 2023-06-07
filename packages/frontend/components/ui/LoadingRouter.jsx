import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Logo } from "../ui";

function LoadingRouter() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    loading && (
      <div
        className="fixed left-0 top-0 w-screen h-screen backdrop-blur-md bg-black/20"
        style={{ zIndex: 999 }}
      >
        <div class="flex items-center justify-center w-full h-full">
          <div class="flex justify-center items-center flex-col space-x-1 text-sm text-white">
            <svg
              fill="none"
              class="w-6 h-6 animate-spin"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                fill="currentColor"
                fill-rule="evenodd"
              />
            </svg>
            <Logo />
            <div>Loading ...</div>
          </div>
        </div>
      </div>
    )
  );
}

export default LoadingRouter;
