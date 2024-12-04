import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  const notFoundImg = "/desert.jpg";

  return (
    <>
      <div className="grid min-h-full grid-cols-1 grid-rows-[1fr,auto,1fr] bg-white lg:grid-cols-[max(50%,36rem),1fr]">
        <main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
          <div className="max-w-lg">
            <p className="text-base/8 font-semibold text-indigo-600">
              404 Error
            </p>
            <h1 className="mt-4 text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
              Sorry, this page doesn&apos;t seem to exist 😅
            </h1>
            <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              Looks like you&apos;ve travelled somewhere unknown - not even our
              maps can find it!
            </p>
            <div className="mt-10">
              <Link
                href="/"
                className="text-sm/7 font-semibold text-indigo-600"
              >
                <span aria-hidden="true">&larr;</span> Journey to Home
              </Link>
            </div>
          </div>
        </main>
        <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
          <Image
            alt=""
            src={notFoundImg}
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
