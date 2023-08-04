import CreateLink from "components/create-link";
import LinkIcon from "components/icons/short-link";

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mt-48 mb-36">
        <h1 className="text-6xl text-white text-center font-bold flex items-center justify-center gap-4">
          <span>Unleash the Power of Short</span>
          <div className="flex items-center gap-2 text-blue-600 underline underline-offset-4 cursor-pointer">
            <span className="flex justify-center items-center w-10 h-10">
              <LinkIcon />
            </span>
            <span>Links</span>
          </div>
        </h1>
        <div className="flex justify-center my-3">
          <p className="text-gray-400 text-lg text-center">
            Discover the potential of brevity with our short link generator!{" "}
            <br />
            Unleash the power of concise, memorable URLs and boost your online
            presence today
          </p>
        </div>
      </div>
      <CreateLink />
    </div>
  );
};

export default HomePage;
