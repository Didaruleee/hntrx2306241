import CardSkeleton from "../../../components/card-skeleton";
import {attributes} from "../../../json/the-den";
import {Image} from "@nextui-org/react";
import {useEffect, useState} from "react";

const Attributes = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
        {attributes.map(({img, name}, index) =>
          isLoading ? (
            <CardSkeleton skeleton={1} className="w-full min-h-60" key={index} />
          ) : (
            <div key={index} className="text-center bg-white rounded-xl border cursor-pointer">
              <Image
                isZoomed
                className="w-[100vw] lg:h-72 md:h-52 h-40 object-cover rounded-t-xl"
                src={img}
                alt="den"
                radius="none"
              />
              <h1 className="py-4 font-bold">{name}</h1>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default Attributes;
