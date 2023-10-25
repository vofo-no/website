import { PropsWithChildren, Suspense } from "react";

export default function NewsListLoader(props: PropsWithChildren) {
  return <Suspense fallback={<NewsListSkeleton />} {...props} />;
}

function NewsListSkeleton() {
  return (
    <div className="animate-pulse">
      <h2 className="mt-2 mb-0">
        <span className="block h-6 w-24 bg-gray-300 rounded-sm" />
      </h2>
      <div className="flex flex-col divide-y">
        <div className="pt-6 mb-6 flex gap-3">
          <div className="w-28 sm:w-40 max-h-48 min-h-[5rem] sm:min-h-[7rem] shrink-0 relative bg-gray-300 rounded-sm"></div>
          <div className="self-center grow">
            <div className="mb-2 h-5 w-4/5 bg-gray-300 rounded-sm"></div>
            <div className="mb-4 h-5 w-1/3 bg-gray-300 rounded-sm"></div>
            <div className="mb-2 h-3 bg-gray-300 rounded-sm" />
            <div className="mb-2 h-3 bg-gray-300 rounded-sm" />
            <div className="mb-4 h-3 w-1/2 bg-gray-300 rounded-sm" />
            <div className="mb-1 h-2 w-1/6 bg-gray-300 rounded-sm" />
          </div>
        </div>
        <div className="pt-6 mb-6 flex gap-3">
          <div className="w-28 sm:w-40 max-h-48 min-h-[5rem] sm:min-h-[7rem] shrink-0 relative bg-gray-300 rounded-sm"></div>
          <div className="self-center grow">
            <div className="mb-2 h-5 w-4/5 bg-gray-300 rounded-sm"></div>
            <div className="mb-4 h-5 w-1/3 bg-gray-300 rounded-sm"></div>
            <div className="mb-2 h-3 bg-gray-300 rounded-sm" />
            <div className="mb-2 h-3 bg-gray-300 rounded-sm" />
            <div className="mb-4 h-3 w-1/2 bg-gray-300 rounded-sm" />
            <div className="mb-1 h-2 w-1/6 bg-gray-300 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
