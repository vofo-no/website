const Sep = () => <span className="inline-block px-3 opacity-50">|</span>;

export default function Footer() {
  return (
    <footer className="bg-gray-700 mt-8 py-8 text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-600 pb-8 mb-8">
          <div>
            <p className="text-xs uppercase font-semibold text-gray-400 my-2">
              Voksenopplæringsforbundet
            </p>
            <ul className="flex flex-col gap-2">
              <li>22 41 00 00</li>
              <li>vofo@vofo.no</li>
              <li>Akersgata 41, 0158 Oslo</li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase font-semibold text-gray-400 my-2">
              Snarveier
            </p>
            <ul className="flex flex-col gap-2">
              <li>22 41 00 00</li>
              <li>vofo@vofo.no</li>
              <li>Akersgata 41, 0158 Oslo</li>
            </ul>
          </div>
          <div className="col-span-2">
            <p className="text-xs uppercase font-semibold text-gray-400 my-2">
              Få nyhetsbrev fra Vofo
            </p>
            <p>
              Få siste nytt om studieforbund og voksnes læring rett i innboksen
              hver måned:
            </p>
            <div>
              <form>
                <input
                  type="email"
                  placeholder="din.epost@eksempel.no"
                  required
                  className="text-base py-1 px-2 my-2 bg-gray-800 rounded-sm"
                />
                <button
                  type="submit"
                  className="bg-gray-800 py-1 px-2 my-2 mx-2 rounded-sm hover:bg-gray-900"
                >
                  Meld på
                </button>
              </form>
            </div>
          </div>
        </div>
        <p>
          &copy; 2022 Voksenopplæringsforbundet <Sep />
          <a href="#" className="hover:underline">
            Personvern og cookies
          </a>
          <Sep />
          Nettredaktør:{" "}
          <a href="#" className="hover:underline">
            Stian Juell
          </a>
        </p>
      </div>
    </footer>
  );
}
