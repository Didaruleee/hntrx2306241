import CardSkeleton from "../../../components/card-skeleton";
import images from "../../../components/images";
import { overview } from "../../../json/the-den";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Overview = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full mb-3">
        <div className="flex items-center flex-wrap gap-6">
          <Button size="sm" className="uppercase rounded font-bold" color="secondary">
            All
          </Button>
          <p className="uppercase font-bold">My Collection</p>
        </div>
        {/* <div className="w-fit"> */}
        {/* <Image
            className="bg-secondary rounded p-2"
            src={images.reset}
            width={33}
            height={33}
            alt="arrow-down"
          /> */}
        {/* </div> */}
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
        {/* {overview.map(({img, name}, index) =>
          isLoading ? (
            <CardSkeleton skeleton={5} className="w-full min-h-60" key={index} />
          ) : (
            <div key={index} className="text-center bg-white rounded-xl border cursor-pointer">
              <Image
                className="w-full lg:max-h-64 md:max-h-52 max-h-40 object-cover rounded-t-xl"
                src={img}
                alt="den"
                width={192}
                height={192}
              />
              <h1 className="py-4 font-bold">{name}</h1>
            </div>
          ),
        )} */}
      </div>
    </div>
  );
};

export default Overview;
