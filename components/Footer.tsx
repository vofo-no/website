import { ChevronRightIcon } from "@heroicons/react/outline";

const Sep = () => <span className="inline-block px-3 opacity-50">|</span>;

export default function Footer() {
  return (
    <footer className="bg-gray-800 mt-8 py-8 text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <ul className="flex flex-col gap-4">
            <li className="uppercase font-semibold text-gray-300">
              Voksenopplæringsforbundet
            </li>
            <li>Akersgata 41, 0158 Oslo</li>
            <li>
              <address className="not-italic">
                Telefon:{" "}
                <a href="tel:+4722410000" className="hover:underline">
                  22 41 00 00
                </a>
                <br />
                E-post:{" "}
                <a href="mailto:vofo@vofo.no" className="hover:underline">
                  vofo@vofo.no
                </a>
              </address>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Våre regionskontorer
                <ChevronRightIcon className="w-4 h-4 inline-block ml-1" />
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Ansatte
                <ChevronRightIcon className="w-4 h-4 inline-block ml-1" />
              </a>
            </li>
            <li>Organisasjonsnummer: 971 454 423</li>
          </ul>
          <ul className="flex flex-col gap-4">
            <li>
              <p>
                Få siste nytt om studieforbund og voksnes læring hver måned:
              </p>
              <div>
                <form>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="din.epost@eksempel.no"
                      required
                      className="text-base py-1.5 px-3 my-2 bg-gray-900 rounded-md border-gray-600 border"
                    />
                    <button
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700 px-4 py-2 my-2 rounded-md font-semibold text-white inline-flex gap-2 items-center"
                    >
                      Meld deg på nyhetsbrev
                    </button>
                  </div>
                </form>
              </div>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Facebook
              </a>
              <Sep />
              <a href="#" className="hover:underline">
                Twitter
              </a>
              <Sep />
              <a href="#" className="hover:underline">
                YouTube
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Personvern og cookies
                <ChevronRightIcon className="w-4 h-4 inline-block ml-1" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
