// "use client";
// import {artData} from "../json/art";
// import {Button, Card, CardBody, CardFooter, Image} from "@nextui-org/react";
// import {useEffect, useState} from "react";
// import CardSkeleton from "../components/card-skeleton";
// import { useRouter } from 'next/router';

// const Art = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);
//   // const openCollectionsPage = () => {
//   //   router.push(`/${collectionName}`);
//   // };
//   return (
//     <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 place-items-center gap-5 max-w-screen-lg md:w-11/12 w-8/12 mx-auto mt-20">
//       {artData.map(({button, description, img, name, tag, collectionName}, index) =>
//         isLoading ? (
//           <CardSkeleton className="min-w-60 h-80" skeleton={7} key={index} />
//         ) : (
//           <Card
//             key={index}
//             shadow="sm"
//             className="border drop-shadow-xl shadow-black border-black/20 w-full rounded-[30px]"
//           >
//             <div className="flex justify-center w-full border-b border-black/20">
//               <div className="w-full">
//                 <Image className="h-40 w-[100vw]" src={img} isZoomed radius="none" alt="art" />
//               </div>
//             </div>
//             <CardBody className="flex flex-col gap-2 bg-[#fffdf7] ml-1">
//               <h1 className="text-2xl font-extrabold">{name}</h1>
//               <p className="text-sm font-bold bg-[#E8E8E8] w-fit p-1">{tag}</p>
//               <p className="text-sm font-medium">{description.slice(0, 92)}...</p>
//             </CardBody>
//             <CardFooter className="bg-[#fffdf7] ml-1">
//               <Button onClick={() => router.push(`/${collectionName}`)} size="sm" className="bg-black text-white w-full mr-3">
//                 {button}
//               </Button>
//             </CardFooter>
//           </Card>
//         ),
//       )}
//     </div>
//   );
// };

// export default Art;


"use client";
import {artData} from "../json/art";
import {Button, Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import {useEffect, useState} from "react";
import CardSkeleton from "../components/card-skeleton";
import { useRouter } from 'next/router';

const Art = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  // const openCollectionsPage = () => {
  //   router.push(`/${collectionName}`);
  // };
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3  sm:grid-cols-2 grid-cols-1 place-items-center gap-5 max-w-screen-lg md:w-11/12 w-8/12 mx-auto mt-20">
      {artData.map(({button, description, img, name, tag, collectionName}, index) =>
        isLoading ? (
          <CardSkeleton className="min-w-60 h-80" skeleton={7} key={index} />
        ) : (
          <Card
            key={index}
            shadow="sm"
            className="border drop-shadow-xl shadow-black border-black/20 w-full rounded-[30px]"
          >
            <div className="flex justify-center w-full border-b border-black/20">
              <div className="w-full">
                <Image className="h-40 w-[100vw]" src={img} isZoomed radius="none" alt="art" />
              </div>
            </div>
            <CardBody className="flex flex-col gap-2 bg-[#fffdf7] ml-1">
              <h1 className="text-2xl font-extrabold">{name}</h1>
              <p className="text-sm font-bold bg-[#E8E8E8] w-fit p-1">{tag}</p>
              <p style={{ width: '201px', height: '52px' }} className="text-sm font-medium">{description.slice(0, 80)}...</p>
            </CardBody>
            <CardFooter className="bg-[#fffdf7] ml-1">
              <Button onClick={() => router.push(`/${collectionName}`)} size="sm" className="bg-black text-white w-full mr-3">
                {button}
              </Button>
            </CardFooter>
          </Card>
        ),
      )}
    </div>
  );
};

export default Art;

