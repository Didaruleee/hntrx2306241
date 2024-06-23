'use client';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import images from '../components/images';
import Navigation from '../components/navbar';

export default function Home() {
  // next.js hooks
  const pathname = usePathname();
  // local state
  const [bgColor, setBgColor] = useState('');
  const [leadingImages, setLeadingImages] = useState<
    string | StaticImport | undefined
  >();

  // react hooks
  useEffect(() => {
    const colors = [
      'bg-primary',
      'bg-primary_yellow',
      'bg-primary_orange',
      'bg-primary_pink',
      'bg-primary_white',
      'bg-primary_orange_deep',
      'bg-primary_gray',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  }, []);
  useEffect(() => {
    const leadingImages = [
      images.leading_enemi,
      images.leading_enemi_1,
      images.leading_enemi_2,
      images.leading_enemi_3,
      images.leading_enemi_4,
      images.leading_enemi_5,
      images.leading_enemi_6,
    ];
    const randomImage =
      leadingImages[Math.floor(Math.random() * leadingImages.length)];
    setLeadingImages(randomImage);
  }, []);

  return (
    <section
      className={`${bgColor} min-h-screen flex flex-col justify-between`}>
      {pathname === '/' && (
        <div>
          <Navigation bgColor={bgColor} />
        </div>
      )}
      pito
      <div className="max-w-screen-xl mx-auto flex-grow relative">
        <div className="text-center flex justify-center items-center mt-36">
          <button className="bg-black text-white flex items-center px-4 py-2 rounded-lg">
            <Image className="w-5 h-5 mr-2" src={images.wallet} alt="wallet" />
            <p>Connect Wallet</p>
          </button>
        </div>
        <div className="flex justify-center items-end w-96">
          {leadingImages && (
            <Image
              className="absolute bottom-0"
              src={leadingImages}
              alt="leading-enemy"
            />
          )}
        </div>
      </div>
    </section>
  );
}
