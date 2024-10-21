// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import ServiceList from './ServiceList';
// import AddServices from './AddServices';

// const ServicesContainer = () => {
//   const [services, setServices] = useState([]);

//   // Load services from local storage on component mount
//   useEffect(() => {
//     const storedServices = JSON.parse(localStorage.getItem('services')) || [];
//     setServices(storedServices);
//   }, []);

//   const addService = (newService) => {
//     setServices((prevServices) => {
//       const updatedServices = [...prevServices, newService];
//       localStorage.setItem('services', JSON.stringify(updatedServices));
//       return updatedServices;
//     });
//   };

//   const updateService = (index, updatedService) => {
//     const updatedServices = services.map((service, i) =>
//       i === index ? updatedService : service
//     );
//     setServices(updatedServices);
//     localStorage.setItem('services', JSON.stringify(updatedServices));
//   };

//   const deleteService = (index) => {
//     const updatedServices = services.filter((_, i) => i !== index);
//     setServices(updatedServices);
//     localStorage.setItem('services', JSON.stringify(updatedServices));
//   };

//   return (
//     <Router>
//       <div className="container mx-auto">
//         <Routes>
//           <Route path="/add_services">
//             <AddServices addService={addService} />
//           </Route>
//           <Route path="/services_List">
//             <ServiceList
//               services={services}
//               updateService={updateService}
//               deleteService={deleteService}
//             />
//           </Route>
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default ServicesContainer;
