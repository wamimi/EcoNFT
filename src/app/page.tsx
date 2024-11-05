// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative isolate bg-white overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-300 to-green-700 animate-gradient" aria-hidden="true" />

      {/* Hero Section */}
      <div className="px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl transition-transform transform hover:scale-105">
              Transform Carbon Credits into Digital Assets
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              EcoNFT empowers you to make a real impact on climate change. Purchase, collect, and retire carbon credit NFTs while earning rewards for your environmental contributions.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/mint"
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-green-500 transition duration-300 transform hover:scale-105"
              >
                Start Minting
              </Link>
              <Link
                href="/marketplace"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-green-600 transition duration-300"
              >
                Browse Marketplace <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-green-600">Better for the Planet</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to offset carbon emissions
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform makes it easy to participate in carbon markets while ensuring transparency and traceability through blockchain technology.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col transition-transform transform hover:scale-105">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                Verified Carbon Credits
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Each NFT is backed by real, verified carbon credits from trusted projects worldwide.</p>
              </dd>
            </div>
            <div className="flex flex-col transition-transform transform hover:scale-105">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                Reward System
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Earn rewards for your environmental impact and climb our leaderboard.</p>
              </dd>
            </div>
            <div className="flex flex-col transition-transform transform hover:scale-105">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                Transparent Impact
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Track your contribution to carbon reduction with full transparency on the blockchain.</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-green-300 to-green-700 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
}