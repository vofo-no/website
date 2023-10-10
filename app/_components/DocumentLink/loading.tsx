export default function DocumentLoading() {
  return (
    <div className="flex gap-4 border p-4 animate-pulse">
      <div>
        <span className=" h-5 w-2/3 inline-block bg-gray-500"></span>
      </div>
      <div>
        <span className=" h-4 w-1/3 inline-block bg-gray-500"></span>
      </div>
    </div>
  );
}
