import mongoose from "mongoose";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Mid from "../components/Mid";
import FAQ from "../models/FAQ";
import { useRouter } from "next/router";
import AddFaqPage from "./addFaqPage";

const Home = ({ faqs }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [queryModelVisible,setQueryModelVisible] = useState(false);
  // const [animate,setAnimate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const mytoken = localStorage.getItem("token");
    setUserLoggedIn(mytoken);
  }, []);

  const clickHandlerFAQ = () => {};
  console.log(faqs);

  const askQueryButtonClicked = (userLoggedIn) => {
    if (userLoggedIn != null) {
      if(!queryModelVisible){ 
        // setAnimate(true);
        setQueryModelVisible(true);
      }
      else
      setQueryModelVisible(false);
      // router.push("/addFaqPage");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="dark:bg-gray-900">
      <Head>
        <title>NVBookstore</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <div className="relative">
        <Image
          src="/book.jpg"
          alt=""
          height={3000}
          width={5000}
          className=" opacity-30"
        />
        {/* <div className="absolute top-1/3  w-full text-center  font-bold text-3xl text-orange-400 ">Welcome to the BookStore</div> */}
        <div className="type-bookstore absolute top-1/3  w-full text-center font-bold text-xl md:text-2xl lg:text-3xl text-orange-300"></div>
      </div>

      <Mid />
      <div className="dark:bg-gray-900 px-5 md:px-10 lg:px-20">
        <div className="sm:text-3xl text-2xl font-medium title-font text-gray-900 dark:text-orange-300 text-center my-4">
          Frequently Asked Questions
        </div>
        {/* <div className="sm:text-2xl text-1xl font-medium title-font bg-orange-500 text-gray-900 dark:text-orange-300 text-center my-10">
          <a
            href={"/addFaqPage"}
            className=" hover:text-gray-800 dark:hover:text-orange-800"
          >
            Cant find your question ? Ask here.
          </a>
        </div> */}

        {/* {faqs.map((item) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [visible, setVisible] = useState(false);
          return (
            <div key={item._id}>
              <h2>
                <button
                  onClick={() => {
                    if (visible == false) setVisible(true);
                    else setVisible(false);
                  }}
                  type="button"
                  className="flex items-center justify-between w-full p-5 font-medium text-left border border-b-0 border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <span className="w-fit">
                    {item.question}?{" "}
                    {item.name != "anonymous" && item.name !== "Anonymous" && (
                      <span className="text-xs w-fit text-left text-gray-500 dark:text-gray-500">
                        {" "}
                        &nbsp; &nbsp; By : {item.name}
                      </span>
                    )}
                  </span>

                  <svg
                    className={
                      visible === true
                        ? "w-6 h-6 rotate-180 shrink-0"
                        : "w-6 h-6 shrink-0"
                    }
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </h2>
              {visible && (
                <div>
                  <div className="p-5 font-normal border border-b-1 border-gray-200 dark:border-gray-700 dark:bg-gray-900 ">
                    <p className="mb-2 text-gray-600 dark:text-gray-300">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })} */}

        <div className="flex flex-col items-center justify-center">
          {/* <Link href={"/addFaqPage"}> */}
          <button
            className=" relative font-semibold"
            onClick={() => {
              askQueryButtonClicked(userLoggedIn);
            }}
          >
            <div className={"relative bg-orange-600 text-gray-50 border border-gray-500 rounded-lg text-center mb-4 mt-8 py-4 px-8 focus:outline-none hover:bg-orange-500 "}>
            {userLoggedIn?"New Query? Ask Here!":"Login to Ask Your Question/Query "} 
            </div>
          </button>
          {/* </Link> */}
        </div>
          {/* <div className={"transition-all duration-150 ease-out "+(animate?"animate-scalein":"animate-scaleout")}> */}
        {queryModelVisible &&
            <AddFaqPage cancelHandler={askQueryButtonClicked}/>
          }
          {/* </div> */}
      </div>
    </div>
  );
};
// export async function getServerSideProps(context) {
//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect(process.env.MONGO_URI);
//   }
//   let faqs = await FAQ.find({
//     question: { $exists: true },
//     answer: { $ne: "" },
//   });
//   console.log(faqs);
//   return {
//     props: { faqs: JSON.parse(JSON.stringify(faqs)) }, // will be passed to the page component as props
//   };
// }
export default Home;
