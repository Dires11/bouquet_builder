export type OptionItem = {
  name: string;
  image: string;
  alt: string;
  heroImage: string;
  heroAlt: string;
};

export type Category = {
  bgColor: string;
  title: string;
  options: OptionItem[];
};
export const screenTypes: string[] = ["Food", "Drinks", "Desserts"];
export const categories: Category[] = [
  {
    title: "Location",
    bgColor: "bg-location",
    options: [
      {
        name: "View",
        image: "/selected-assets/view.jpg",
        alt: "Image of a view",
        heroImage: "/selected-assets/view-hero.jpeg",
        heroAlt: "Image of a view",
      },
      {
        name: "Beach",
        image: "/selected-assets/beach.jpeg",
        alt: "Image of a beach",
        heroImage: "/selected-assets/beach-hero.jpeg",
        heroAlt: "Image of a beach",
      },
      {
        name: "Park",
        image: "/selected-assets/park.jpg",
        alt: "Image of a park",
        heroImage: "/selected-assets/park-hero.jpeg",
        heroAlt: "Image of a park",
      },
    ],
  },
  {
    title: "Food",
    bgColor: "bg-food",
    options: [
      {
        name: "Chipotle",
        image: "/selected-assets/chipotle.png",
        alt: "Chipotle Logo",
        heroImage: "/selected-assets/chipotle-hero.jpeg",
        heroAlt: "Image of Chipotle food",
      },
      {
        name: "Filled Potato",
        image: "/selected-assets/filled-potato.jpeg",
        alt: "Image of filled potatoes",
        heroImage: "/selected-assets/filled-potato-hero.jpeg",
        heroAlt: "Image of Chipotle food",
      },
      {
        name: "Sushi aka Semochka",
        image: "/selected-assets/sushi.jpeg",
        alt: "Image of temaki cone sushi",
        heroImage: "/selected-assets/sushi-hero.jpeg",
        heroAlt: "Image of Chipotle food",
      },
    ],
  },
  {
    title: "Drink",
    bgColor: "bg-blue-200",
    options: [
      {
        name: "Tan (Mint)",
        image: "/selected-assets/tan.jpg",
        alt: "Image of a tan",
        heroImage: "/selected-assets/tan-hero.png",
        heroAlt: "Image of a tan",
      },
      {
        name: "Coffee",
        image: "/selected-assets/coffee.jpg",
        alt: "Image of a coffee",
        heroImage: "/selected-assets/coffee-hero.jpeg",
        heroAlt: "Image of a coffee",
      },
      {
        name: "Smoothie",
        image: "/selected-assets/smoothie.jpeg",
        alt: "Image of a smoothie",
        heroImage: "/selected-assets/smoothie-hero.jpeg",
        heroAlt: "Image of a smoothie",
      },
    ],
  },
  {
    title: "Dessert",
    bgColor: "bg-pink-200",
    options: [
      {
        name: "Acai Bowl",
        image: "/selected-assets/acai.jpg",
        alt: "Image of a acai bowl",
        heroImage: "/selected-assets/acai-hero.png",
        heroAlt: "Image of a acai bowl",
      },
      {
        name: "Gelato",
        image: "/selected-assets/gelato.jpeg",
        alt: "Image of a gelato",
        heroImage: "/selected-assets/gelato-hero.png",
        heroAlt: "Image of a gelato",
      },
      {
        name: "Waffle",
        image: "/selected-assets/waffle.jpg",
        alt: "Image of a waffle",
        heroImage: "/selected-assets/waffle-hero.png",
        heroAlt: "Image of a waffle",
      },
    ],
  },
];

/*

  {
    title: "Drinks",
    bgColor: "bg-drinks",
    options: [
        {
            title: "Starbucks",
            image: "/starbucks.png",
            alt: "Starbucks Logo",
            heroImage: "/starbucks-hero.jpeg",
            heroAlt: "Image of Starbucks drinks",
        },
        {
            title: "Tan"
            image: "/tan.jpg",
            alt: "Image of drink tan",
            heroImage: "/starbucks-hero.jpeg",
            heroAlt: "Image of Starbucks drinks",

        },
        
  }
*/
