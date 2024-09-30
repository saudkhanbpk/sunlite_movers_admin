import React, { useState } from 'react';
import pic1 from '../assets/pic1.png';
import packages from '../assets/packages.png';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import desert from '../assets/desert.png'

function Packages() {
    // Sample popular package data (could be fetched from an API)
    const [popularPackages] = useState([
        {
            id: 1,
            title: "Dubai Mall",
            location: "Abu Dhabi main city",
            rating: 5,
            image: packages
        },
        {
            id: 2,
            title: "Burj Khalifa",
            location: "Dubai main city",
            rating: 4,
            image: packages
        },
        {
            id: 3,
            title: "Palm Jumeirah",
            location: "Dubai Marina",
            rating: 5,
            image: packages
        },
        {
            id: 1,
            title: "Dubai Mall",
            location: "Abu Dhabi main city",
            rating: 5,
            image: packages
        },

    ]);

    return (
        <div className='w-full p-8'>
            <header className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">PACKAGES</h2>
                <div className="flex items-center">
                    <input type="text" placeholder="Search" className="p-2 rounded mr-4 bg-gray-100" />
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                </div>
            </header>

            <div className='flex gap-4'>
                {/* Static New Package Section */}
                <div className='md:w-2/3'>
                    <div className='flex justify-between'>
                        <h2 className='text-xl font-bold self-center'>New Package</h2>
                        <div>
                            <button className='bg-[#6AD2FF] text-white p-3 rounded-xl font-semibold'>Create Package</button>
                        </div>
                    </div>

                    <div className='w-full bg-gray-100 p-3 mt-2 rounded-xl flex gap-3'>
                        <div>
                            <img src={pic1} alt='Future Museum Dubai' />
                        </div>
                        <div className='md:w-[400px] p-2'>
                            <h1 className='text-3xl font-bold'>FUTURE MUSEUM<br /> DUBAI</h1>
                            <p className='mt-5 '>
                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature fro it over 2000 years old. Richard
                            </p>
                            <div className='flex justify-between mt-8'>
                                <p>price<br /><a className='text-blue-500 font-bold text-xl'>$120</a>/person</p>
                                <p>duration <br />7 Days / 6 Nights</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dynamic Popular Packages Section */}
                <div className='md:w-1/3'>
                    <h4 className='text-xl font-bold self-center mt-2'>Popular Packages</h4>
                    <div className='mt-5 p-2 bg-gray-100 rounded-xl'>
                        {/* Map through the popular packages to render them dynamically */}
                        {popularPackages.map(pkg => (
                            <div key={pkg.id} className='flex gap-2 bg-white rounded-xl p-2 mb-2'>
                                <img src={pkg.image} alt={pkg.title} className='w-24 h-16 object-cover rounded-xl' />
                                <div>
                                    <h4 className='font-bold'>{pkg.title}</h4>
                                    <p>{pkg.location}</p>
                                    <div className='flex'>
                                        {/* Render star ratings based on the package rating */}
                                        {Array(pkg.rating).fill().map((_, i) => (
                                            <MdOutlineStarPurple500 key={i} className='text-yellow-400' />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <h4 className='text-xl font-bold self-center my-2'>Featured Packages</h4>
                <div className='w-full bg-gray-100 p-3  rounded-xl flex gap-4'>
                    <div >
                        <img src={desert} alt='desert' />
                    </div>
                    <div className='w-full p-2'>
                        <div className='flex justify-between w-full'>
                            <h2 className='text-2xl font-bold'>DESERT SAFARI</h2>
                            <h2 className='text-2xl font-bold'>$200/<a className='text-xl'>person</a></h2>
                        </div>


                        <div className='gap-10 flex my-2'><p className='font-semibold'>7 Days / 6 Nights</p> <p className='font-semibold'>Main Dubai city</p></div>
                        <div className='w-full flex gap-3'>
                            <div className='md:w-[470px]'>
                                <h2 className='font-semibold'>Description</h2>
                                <p className=''>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard Contrary to popular belief, Lorem Ipsum is not simply random text.
                                    It has roots in a piece of classical Latin literature fro it over 2000 years old. Richard</p>
                            </div>
                            <div className='w-fit '>
                                <h2 className='font-semibold'>Activities</h2>
                                <div className='flex gap-1'>
                                <MdOutlineStarPurple500 className='self-center' />
                                <p>rary to popular belief, Lorem Ipsum is n</p>
                                </div>
                                <div className='flex gap-1'>
                                <MdOutlineStarPurple500 className='self-center' />
                                <p>rary to popular belief, Lorem Ipsum is n</p>
                                </div>
                                <div className='flex gap-1'>
                                <MdOutlineStarPurple500 className='self-center' />
                                <p>rary to popular belief, Lorem Ipsum is n</p>
                                </div>
                                <div className='flex gap-1'>
                                <MdOutlineStarPurple500 className='self-center' />
                                <p>rary to popular belief, Lorem Ipsum is n</p>
                                </div>
                                <div className='flex gap-1'>
                                <MdOutlineStarPurple500 className='self-center' />
                                <p>rary to popular belief, Lorem Ipsum is n</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Packages;
// import React from 'react';
// import package from '../assets/packages.png'
// import { Clock, Zap } from 'lucide-react';
// const packages = [
//   {
//     id: 1,
//     title: 'Dubai City Tour',
//     image: '../asses',
//     duration: '4 Hours',
//     price: 'from 250 AED',
//     rating: 5
//   },
//   {
//     id: 2,
//     title: 'Desert Safari Experience',
//     image: '/api/placeholder/800/600',
//     duration: '6 Hours',
//     price: 'from 350 AED',
//     rating: 5
//   },
//   {
//     id: 3,
//     title: 'Burj Khalifa At The Top',
//     image: '/api/placeholder/800/600',
//     duration: '1.5 Hours',
//     price: 'from 200 AED',
//     rating: 5
//   },
//   {
//     id: 4,
//     title: 'Dubai Marina Cruise',
//     image: '/api/placeholder/800/600',
//     duration: '2 Hours',
//     price: 'from 180 AED',
//     rating: 5
//   }
// ];

// const StarRating = ({ rating }) => {
//   return (
//     <div className="flex">
//       {[...Array(5)].map((_, i) => (
//         <svg
//           key={i}
//           className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//         </svg>
//       ))}
//     </div>
//   );
// };

// const PackageCard = ({ pack }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <img src={pack.image} alt={pack.title} className="w-full h-48 object-cover" />
//       <div className="p-4">
//         <h3 className="text-lg font-semibold mb-2">{pack.title}</h3>
//         <StarRating rating={pack.rating} />
//         <div className="flex items-center mt-2 text-sm text-gray-600">
//           <Clock className="w-4 h-4 mr-1" />
//           <span>{pack.duration}</span>
//         </div>
//         <div className="flex items-center mt-1 text-sm font-medium text-orange-500">
//           <Zap className="w-4 h-4 mr-1" />
//           <span>{pack.price}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TourPackages = () => {
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold mb-6">Packages</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {packages.map(pack => (
//           <PackageCard key={pack.id} pack={pack} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TourPackages;
