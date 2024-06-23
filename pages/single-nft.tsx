import {singleNFT} from "../json/single-nft";
import Image from "next/image";

const SingleNft = () => {
  return (
    <section>
      {/* <!-- single nft --> */}
      {singleNFT.map(({card, image, subtitle, title, fingerPrint, fingerId, fingerInfo}, key) => (
        <section
          key={key}
          className="border rounded-xl max-w-screen-lg mx-auto p-7 my-10 md:flex gap-10"
        >
          <Image
            className="h-full lg:w-1/2 md:min-w-60 w-full mx-auto object-container"
            src={image}
            alt="single-nft"
          />
          <section className="md:mt-0 mt-5">
            <div>
              <p className="text-xs font-medium">{title}</p>
              <h3 className="font-bold text-3xl">{subtitle}</h3>
            </div>
            <div className="grid grid-cols-2 gap-y-3 gap-x-10 mt-5">
              {card.map(({img, subtitle, title}, key) => (
                <div
                  key={key}
                  className="bg-white border lg:p-3 p-2 flex items-center gap-2 rounded-xl"
                >
                  <Image src={img} alt="single-nft-icon" />
                  <div>
                    <p className="text-xs font-semibold">{title}</p>
                    <p className="text-xs font-semibold">{subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center lg:mt-10 mt-6 gap-3">
              <Image src={fingerPrint} className="w-5 h-5" alt="single-nft-icon" />
              <div>
                <p className="text-sm font-normal">{fingerId}</p>
                <p className="text-sm font-normal text-secondary/70">{fingerInfo}</p>
              </div>
            </div>
          </section>
        </section>
      ))}
    </section>
  );
};

export default SingleNft;
