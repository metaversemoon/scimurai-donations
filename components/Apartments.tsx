import React, { useEffect } from "react";
import { Polybase } from "@polybase/client";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";

const db = new Polybase({
  defaultNamespace:
    "0x1535283e7a32e43a2f96cf6f758afd6016ae7dc801f19b41b94e02b99410426f1f8c072e11a5af7aac9efe8d15da6042b37c0776c894dda55cba3de021303723",
});

const proposals = [
  {
    description:
      "We are a leading cancer-fighting organization with a vision to end cancer as we know it, for everyone. We are improving the lives of people with cancer and their families as the only organization combating cancer through advocacy, research, and patient support, to ensure that everyone has an opportunity to prevent, detect, treat, and survive cancer. ",
    id: "1",
    organizer: "0xd86b4aAaE82617719Ee228a57AF202ee72c40fDd",
    totalDonations: "100",
    title: "Every cancer.",
    category: "Medical",
    targetAmmount: "10000",
    creationDate: "April 10 2023",
    articles: [
      {
        title: "Rides and Transportation",
        description:
          "Road to Recovery connects cancer patients in need of transportation to treatment with volunteers to get them there. We also provide transportation grants to local healthcare systems partners to provide transportation assistance to their patients.",
        id: "1",
      },
    ],

    image:
      "https://images.unsplash.com/photo-1674574124345-02c525664b65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    description:
      "We are a leading cancer-fighting organization with a vision to end cancer as we know it, for everyone. We are improving the lives of people with cancer and their families as the only organization combating cancer through advocacy, research, and patient support, to ensure that everyone has an opportunity to prevent, detect, treat, and survive cancer. ",
    id: "1",
    organizer: "0xd86b4aAaE82617719Ee228a57AF202ee72c40fDd",
    totalDonations: "100",
    title: "Every cancer.",
    category: "Medical",
    targetAmmount: "10000",
    creationDate: "April 10 2023",
    articles: [
      {
        title: "Rides and Transportation",
        description:
          "Road to Recovery connects cancer patients in need of transportation to treatment with volunteers to get them there. We also provide transportation grants to local healthcare systems partners to provide transportation assistance to their patients.",
        id: "1",
      },
    ],

    image:
      "https://images.unsplash.com/photo-1674574124345-02c525664b65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    description:
      "We are a leading cancer-fighting organization with a vision to end cancer as we know it, for everyone. We are improving the lives of people with cancer and their families as the only organization combating cancer through advocacy, research, and patient support, to ensure that everyone has an opportunity to prevent, detect, treat, and survive cancer. ",
    id: "1",
    organizer: "0xd86b4aAaE82617719Ee228a57AF202ee72c40fDd",
    totalDonations: "100",
    title: "Every cancer.",
    category: "Medical",
    targetAmmount: "10000",
    creationDate: "April 10 2023",
    articles: [
      {
        title: "Rides and Transportation",
        description:
          "Road to Recovery connects cancer patients in need of transportation to treatment with volunteers to get them there. We also provide transportation grants to local healthcare systems partners to provide transportation assistance to their patients.",
        id: "1",
      },
    ],

    image:
      "https://images.unsplash.com/photo-1674574124345-02c525664b65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
];

// const initializedPolybase = async () => {
//   const createReview = await db.applySchema(
//     `@public
//     collection Review {
//       apartment_id: string;
//       address: string;
//       name: string;
//       company: string;
//       description_review?: string;
//       author: string;
//       price?: number;
//       managment?: number;
//       location?: number;
//       cleanliness?: number;
//       noise?: number;
//       safety?: number;
//       accessibility?: number;
//       value?: number;
//       maintenance?: number;
//       description_review?: string;
//       image?: string;

//       constructor (
//         apartment_id: string,
//         id: string,
//         description_review: string,
//         author: string,
//         managment: number,
//         location: number,
//         cleanliness: number,
//         noise: number,
//         safety: number,
//         accessibility: number,
//         value: number,
//         maintenance: number

//         apartment_id: string;
//       address: string;
//       name: string;
//       company: string;
//       description_review?: string;
//       author: string;
//       price?: number;
//       managment?: number;
//       location?: number;
//       cleanliness?: number;
//       noise?: number;
//       safety?: number;
//       accessibility?: number;
//       value?: number;
//       maintenance?: number;
//       description_review?: string;
//       image?: string;

//         ) {
//         this.apartment_id = apartment_id;
//         this.id = id;
//         this.description_review = description_review;
//         this.author = author;
//         this.managment = managment;
//         this.location = location;
//         this.cleanliness = cleanliness;
//         this.noise = noise;
//         this.safety = safety;
//         this.accessibility = accessibility;
//         this.value = value;
//         this.maintenance = maintenance;
//       }
//     }
//   `,
//     "0x1535283e7a32e43a2f96cf6f758afd6016ae7dc801f19b41b94e02b99410426f1f8c072e11a5af7aac9efe8d15da6042b37c0776c894dda55cba3de021303723",
//   ); // your-namespace is optional if you have defined a default namespace
//   console.log("🚀 ~ file: Apartments.tsx:83 ~ initializedPolybase ~ createReview:", createReview);
// };

// const review = "Great choice!";
// // id: string;
// const name = "Martin";
// const rate: "8";
// const author: string;
// const reviews: Review[];

const getReviews = async () => {
  const { data } = await db.collection("Review").get();
  console.log("🚀 ~ file: Apartments.tsx:99 ~ getReviews ~ data:", data);
};
const createReview = async () => {
  const reviewId = uuidv4();
  const apartment_id = "1";
  const res = await db
    .collection("Review")
    .create([apartment_id, reviewId, "This place was horrible", "Joe Smith", 1, 1, 2, 3, 4, 5, 6, 7]);
  console.log("🚀 ~ file: Apartments.tsx:98 ~ createReview ~ res:", res);
};

function Apartments() {
  useEffect(() => {
    // initializedPolybase();
    console.log("🚀 ~ file: Apartments.tsx:8 ~ db:", db);
    console.log("initializedPolybase");
  }, []);
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-5 gap-4">
        <div className=" col-span-4">
          <p className="text-sm text-cyan-700"> Reviews > Manhattan </p>

          <div className="flex items-center justify-between">
            <p className="">6,386 Manhattan Apartments for Rent</p>.
            <div className="md:w-1/3 px-3 mb-6 md:mb-0  justify-center">
              <div className="relative">
                <label htmlFor="">SORT BY</label>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  <option>Newest First</option>
                  <option>Oldest First</option>
                  <option>Alphabetically </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* CARD */}

          <div className="flex items-center justify-between pt-10">
            {proposals.length > 0 ? proposals.map((proposal, index) => <Card key={index} proposal={proposal} />) : ""}
          </div>
        </div>

        <div className="col-span-1">
          <p className="s">About Manhattan Rentals</p>

          <p className="s">
            Use Aparment Reviews to find apartments for rent in Manhattan for you and your pet by searching by price,
            bedrooms, amenities and more. Living in a Manhattan rental offers the unique opportunity to choose from many
            neighborhoods.
          </p>
          <img className="pb-4" src="/map.png" alt="Map" />
          <img src="/add.jpg" alt="Ad" />
        </div>
      </div>

      {/* <button className="btn bg-success" onClick={createReview}>
        create Review
      </button>
      <button className="btn bg-success" onClick={getReviews}>
        GEt Review
      </button> */}
      {/* <button className="btn bg-success" onClick={createSchemaApartment}>
        create Apartment
      </button> */}
    </div>
  );
}

export default Apartments;
