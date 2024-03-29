export default function Skeletons({ type }: { type: string }) {
  return (
    <>
      {type === "product" && (
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-1/3">
            <div className="max-w-sm rounded overflow-hidden shadow-lg animate-pulse">
              <div className="h-48 bg-gray-300"></div>
              <div className="px-6 py-4">
                <div className="h-6 bg-gray-300 mb-2"></div>
                <div className="h-4 bg-gray-300 w-2/3"></div>
              </div>
              <div className="px-6 pt-4 pb-2">
                <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-300 w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {type === "account" && (
        <div className="w-full">
          <div className="max-w-lg rounded overflow-hidden shadow-lg animate-pulse">
            <div className="px-6 pt-4 pb-2">
              <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-300 w-1/2"></div>
            </div>
          </div>
        </div>
      )}
      {type === "account-verification" && (
        <div className="w-full">
          <div className="max-w-20 rounded overflow-hidden shadow-lg animate-pulse">
            <div className="px-6 pt-4 pb-2">
              <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
            </div>
          </div>
        </div>
      )}
      {type === "account-header" && (
        <div className="w-[250px]">
          <div className="max-w-40 rounded overflow-hidden shadow-lg animate-pulse">
            <div className="px-6 pt-4 pb-2 ">
              <div className="h-4 bg-gray-300 w-[100px] mb-2"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
