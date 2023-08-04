import LinkIcon from "./icons/short-link";

const CreateLink = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <form action="javascript:void(0);">
        <label
          for="create-short-link"
          class="mb-2 text-sm font-medium  sr-only text-white">
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <div className="flex justify-center items-center w-6 h-6 text-gray-400">
              <LinkIcon />
            </div>
          </div>
          <input
            type="text"
            id="create-short-link"
            class="block w-full p-4 pl-12 text-sm  border  rounded-lg   bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Paste your link here: eg. https://www.example.com/products/category/subcategory/item?utm_source=google"
          />
          <button class="text-white absolute right-2.5 bottom-2.5  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
            Short It
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLink;
