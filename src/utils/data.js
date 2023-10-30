import image2 from "../images/arifaizin.jpeg";
import image3 from "../images/rfajri27.jpeg";
const getData = () => {
  return [
    {
      id: 1,
      name: "Dimas Saputra",
      tag: "dimasmds",
      imageUrl: "./images/arifaizin.jpeg",
    },
    {
      id: 2,
      name: "Arif Faizin",
      tag: "arifaizin",
      imageUrl: { image2 },
    },
    {
      id: 3,
      name: "Rahmat Fajri",
      tag: "rfajri27",
      imageUrl: { image3 },
    },
  ];
};

export { getData };
