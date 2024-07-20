import { Link } from "@remix-run/react";
export default function NeedHelp() {
  return (
    <>
      {/* CTA Section: Boxed Brand */}
      <div className="overflow-hidden bg-white dark:bg-gray-900 dark:text-gray-100">
        <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
          <div className="relative">
            <div className="absolute inset-0 -m-10 -rotate-2 rounded-xl bg-blue-50 dark:bg-blue-950" />
            <div className="absolute inset-0 -m-10 rotate-1 rounded-xl bg-blue-800/75 shadow-inner dark:bg-blue-900/75" />
            <div className="relative rounded-lg bg-white/95 p-8 text-center shadow backdrop-blur-sm sm:p-12 lg:px-16 lg:py-20 dark:bg-gray-950/20 dark:shadow-none">
              <div className="space-y-8">
                {/* Heading */}
                <div className="text-center">
                  <h2 className="mb-4 text-4xl font-black text-black dark:text-white">Do you need a custom bootable USB solution?</h2>
                  <h3 className="mx-auto text-xl font-medium leading-relaxed text-gray-700 lg:w-2/3 dark:text-gray-300">
                    We can assist you in creating a custom bootable USB solution for your business and security needs
                  </h3>
                </div>
                {/* END Heading */}

                {/* Actions */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
                  <Link
                    to="mailto:contact@bitlookup.net"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-700 bg-blue-700 px-8 py-4 font-semibold leading-6 text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400/50 active:border-blue-700 active:bg-blue-700 dark:focus:ring-blue-400/90"
                  >
                    <span>Get in touch</span>
                    <svg className="hi-mini hi-arrow-right inline-block size-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
                {/* END Actions */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END CTA Section: Boxed Brand */}
    </>
  );
}
