// export const getCurrentLocation = () => {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const userCoords = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };
//         resolve({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//       },
//       (error) => {
//         reject('Position could not be determined.' + error);
//       }
//     );
//   });
// };
