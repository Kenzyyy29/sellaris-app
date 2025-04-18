import Link from "next/link";

const Brands = [
 {icon: <FaCircleExclamation />},
 {icon: <FaCircleExclamation />},
 {icon: <FaCircleExclamation />},
];

const Brands2 = [
 {icon: <FaCircleExclamation />},
 {icon: <FaCircleExclamation />},
];

// React
import {FaArrowRightLong, FaCircleExclamation} from "react-icons/fa6";

const Home = () => {
 return (
  <div className="flex flex-col w-full">
   {/* Hero Section */}
   <div className="flex flex-col md:px-[50px] lg:px-[30px] xl:px-[100px] 2xl:px-[300px] justify-center h-screen font-bold bg-primary">
    <div className="flex flex-col justify-start lg:gap-5 2xl:gap-10 lg:w-[600px]">
     <h1 className="font-raleway italic font-bold lg:text-4xl 2xl:text-5xl text-tertiary">
      Lebih Praktis Lebih Baik!
     </h1>
     <p className=" 2xl:text-lg text-tertiary">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
      corporis blanditiis odio sapiente voluptatibus culpa explicabo qui sint
      hic eaque, et eos. Laborum et eum ipsa tempore inventore illum suscipit.
     </p>
     <div className="flex gap-3 w-full ">
      <button className="lg:px-2 lg:py-2 2xl:px-4 2xl:py-4 border border-tertiary bg-tertiary text-primary hover:bg-tertiary/80 hover:border-tertiary/80 cursor-pointer rounded-full w-full">
       <Link href="/a">Get Started</Link>
      </button>
      <button className="lg:px-2 lg:py-2 2xl:px-4 2xl:py-4 border border-tertiary bg-primary text-tertiary hover:border-tertiary/80 cursor-pointer  rounded-full w-full">
       <Link href="/a"> Contact Us!</Link>
      </button>
     </div>
    </div>
   </div>

   {/* Content Section */}
   <div className="flex flex-col md:px-[50px] lg:px-[30px] xl:px-[100px] 2xl:px-[300px] justify-center items-end h-screen font-bold bg-tertiary">
    <div className="flex flex-col justify-start gap-10 lg:w-[600px]">
     <h1 className="font-raleway italic font-bold lg:text-4xl 2xl:text-5xl text-primary">
      Pengelolaan Bisnis yang lebih Efisien
     </h1>
     <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
       <FaCircleExclamation className="fill-primary size-7" />{" "}
       <p className="2xl:text-xl font-medium">Lorem, ipsum.</p>
      </div>
      <div className="flex gap-2 items-center">
       <FaCircleExclamation className="fill-[gold] size-7" />{" "}
       <p className="2xl:text-xl font-medium">Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="flex gap-2 items-center">
       <FaCircleExclamation className="fill-[red] size-7" />{" "}
       <p className="2xl:text-xl font-medium">Lorem, ipsum dolor.</p>
      </div>
     </div>
     <button className="cursor-pointer w-[115px]">
      <Link
       href="/a"
       className="hover:underline w-full flex gap-2 items-center">
       Learn More <FaArrowRightLong className="fill-black" />
      </Link>
     </button>
    </div>
   </div>

   {/* Content Section */}
   <div className="flex flex-col md:px-[50px] lg:px-[30px] xl:px-[100px] 2xl:px-[300px] justify-center items-center h-auto py-10 font-bold bg-gray-200">
    <div className="flex flex-col text-center items-center gap-10 lg:w-[600px]">
     <h1 className="font-raleway font-black text-5xl text-primary">
      Used By Premium Brands
     </h1>
     <div className="flex w-full gap-3">
      {Brands.map((item, index) => (
       <div
        key={index}
        className="flex w-full items-center justify-center text-primary text-6xl">
        {item.icon}
       </div>
      ))}
     </div>
     <div className="grid grid-cols-2 gap-[100px]">
      {Brands2.map((item, index) => (
       <div
        key={index}
        className="flex w-full items-center justify-center text-primary text-6xl">
        {item.icon}
       </div>
      ))}
     </div>
    </div>
   </div>

   {/* Content Section */}
   <div className="flex flex-col md:px-[50px] lg:px-[30px] xl:px-[100px] 2xl:px-[300px] justify-center h-screen font-bold bg-primary">
    <div className="flex flex-col justify-start gap-10 lg:w-[600px]">
     <h1 className="font-raleway italic font-bold text-5xl text-tertiary">
      What they say about Us!
     </h1>
     <p className="text-lg text-tertiary">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
      corporis blanditiis odio sapiente voluptatibus culpa explicabo qui sint
      hic eaque, et eos. Laborum et eum ipsa tempore inventore illum suscipit.
     </p>
    </div>
   </div>

   {/* Content Section */}
   <div className="flex flex-col md:px-[50px] lg:px-[30px] xl:px-[100px] 2xl:px-[300px] justify-center items-end h-screen font-bold bg-gray-200">
    <div className="flex flex-col justify-start gap-10 lg:w-[600px]">
     <h1 className="font-raleway italic font-bold lg:text-4xl 2xl:text-5xl text-primary">
      Harga yang lebih terjangkau!
     </h1>
     <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
       <FaCircleExclamation className="fill-primary size-7" />{" "}
       <p className="text-xl font-medium">Lorem, ipsum.</p>
      </div>
      <div className="flex gap-2 items-center">
       <FaCircleExclamation className="fill-[gold] size-7" />{" "}
       <p className="text-xl font-medium">Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="flex gap-2 items-center">
       <FaCircleExclamation className="fill-[red] size-7" />{" "}
       <p className="text-xl font-medium">Lorem, ipsum dolor.</p>
      </div>
     </div>
     <button className="cursor-pointer w-[115px]">
      <Link
       href="/a"
       className="hover:underline w-FULL flex gap-2 items-center">
       Learn More <FaArrowRightLong className="fill-black" />
      </Link>
     </button>
    </div>
   </div>
   <div className="flex flex-col md:px-[50px] lg:px-[30px] xl:px-[100px] 2xl:px-[300px] justify-center items-end h-screen font-bold bg-tertiary">
    <div className="flex flex-col justify-start gap-10 lg:w-[600px]">
     <h1 className="font-raleway italic font-bold lg:text-4xl 2xl:text-5xl text-primary">
      Harga yang lebih terjangkau!
     </h1>
     <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
       <FaCircleExclamation className="fill-primary size-7" />{" "}
       <p className="text-xl font-medium">Lorem, ipsum.</p>
      </div>
      <div className="flex gap-2 items-center">
       <FaCircleExclamation className="fill-[gold] size-7" />{" "}
       <p className="text-xl font-medium">Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="flex gap-2 items-center">
       <FaCircleExclamation className="fill-[red] size-7" />{" "}
       <p className="text-xl font-medium">Lorem, ipsum dolor.</p>
      </div>
     </div>
     <button className="cursor-pointer w-[115px]">
      <Link
       href="/a"
       className="hover:underline w-FULL flex gap-2 items-center">
       Learn More <FaArrowRightLong className="fill-black" />
      </Link>
     </button>
    </div>
   </div>
  </div>
 );
};

export default Home;
