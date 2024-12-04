import Image from "next/image";
import MapWithMarkers from "../../../../public/map-with-markers.jpg";
import TravelPeople from "../../../../public/travel-people.jpg";

export default function HomeBento() {
  return (
    <div id="features" className="bg-white py-12 sm:py-22">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-indigo-600">
          Interactive Map Features
        </h2>
        <p className="text-center mx-auto mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
          Visualize and Track Your Travels with Ease
        </p>
        <p className="text-center mx-auto text-2xl mt-4 max-w-md]">
          Mark your visited locations, add personalized notes, and create a
          beautiful visual log of your journeys—all in one place.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6">
          <div className="relative lg:col-span-3">
            <div className="absolute inset-px rounded-lg bg-white" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
              <Image
                alt=""
                src={MapWithMarkers}
                className="h-80 object-cover"
                width={700}
                height={600}
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-indigo-600">
                  Journey Highlights
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                  Helpful Interactive Features
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Add notes and dates to every stop on your travels, making each
                  destination memorable and unique.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
          </div>
          <div className="relative lg:col-span-3">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
              <Image
                alt=""
                src={TravelPeople}
                className="h-80 object-cover"
                width={700}
                height={600}
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-indigo-600">
                  Organised Memories
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                  Never Forget a Moment
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Quickly browse your past trips with a simple and intuitive
                  interface, designed to help you treasure every adventure.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
          </div>
        </div>
      </div>
    </div>
  );
}
