import {ChevronRightIcon} from "@heroicons/react/20/solid"

export default function BreadCrumb({ paths }: { paths: string[] }) {
  return (
    <>
      <nav className="flex px-6 mt-10 mb-10" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {paths.map((path, index) => {
            return (
              <>
                {index != 0 && index != path.length - 1 ? (
                  <li key={index}>
                    <div className="flex items-center">
                      <ChevronRightIcon className="h-6 w-6"></ChevronRightIcon>
                      <a
                        href="#"
                        className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                      >
                        {path}
                      </a>
                    </div>
                  </li>
                ) : (
                  <li key={index} className="inline-flex items-center">
                    <a
                      href="#"
                      className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      {path}
                    </a>
                  </li>
                )}
              </>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
