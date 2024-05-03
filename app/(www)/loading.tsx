export default function Loading() {
  return (
    <div className="h-80">
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="inline-block relative w-20 h-20 rotate-45 origin-center text-primary">
          <div className="animate-ping top-7 left-7 absolute w-8 h-8 bg-current after:content-[' '] after:absolute after:block after:w-8 after:h-8 after:bg-current after:-top-6 after:rounded-t-full before:content-[' '] before:absolute before:block before:w-8 before:h-8 before:bg-current before:-left-6 before:rounded-l-full"></div>
        </div>
      </div>
    </div>
  );
}
