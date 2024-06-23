export default function Home() {
  return (
    <section className="flex h-[250px] w-full flex-row items-center justify-between bg-neutral-700">
      <div className="flex flex-col gap-4">
        <div className="h-4 w-[200px] bg-white"></div>
        <div className="h-4 w-[200px] bg-white"></div>
        <div className="h-4 w-[200px] bg-white"></div>
        <div className="h-4 w-[200px] bg-white"></div>
        <div className="h-4 w-[200px] bg-white"></div>
        <div className="h-2 w-[11px]">hi</div>
      </div>
      <div className="flex flex-row items-center justify-center gap-3">
        <div className="h-32 w-32 rounded-full border-2 border-black bg-red-500 transition hover:bg-red-300"></div>
        <div className="h-32 w-32 rounded-full border-2 border-black bg-yellow-500 transition hover:bg-red-300"></div>
        <div className="h-32 w-32 rounded-full border-2 border-black bg-green-500 transition hover:bg-red-300"></div>
        <div className="h-32 w-32 rounded-full border-2 border-black bg-black-500 transition hover:bg-red-300"></div>
      </div>
      <div>|||</div>
    </section>
  );
}
