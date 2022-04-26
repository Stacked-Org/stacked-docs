import React from "react";
import Link from "@docusaurus/Link";

export default function CaseProjects() {
  return (
    <div className="bg-gray-100">
      <div className="bg-white flex flex-row justify-between items-center w-3/4 md:w-1/2 xl:w-1/3 py-5 px-7 rounded-lg relative -top-10 mx-auto shadow-md">
        <h3 className="font-extrabold text-2xl md:text-4xl">Spotify</h3>
        <button className="bg-purple-500 text-white rounded-lg px-3 md:px-10 lg:px-14 py-3 shadow-xl shadow-purple-200 hover:text-purple-500 hover:bg-white hover:border-purple-500 transition duration-700 ease-in-out">
          Read Case Study
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col space-y-5 justify-center text-center mt-10">
        <h2 className="font-bold text-3xl">Who's Using Stacked</h2>
        <p className="text-gray-500 w-2/3 mx-auto">
          We’re honored some of the most talented creatives out there build with
          Stacked
        </p>
      </div>

      {/* Projects */}
      <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 justify-center m-auto my-24 pb-28 overflow-x-hidden">
        <Link
          className="group cursor-pointer relative rounded-lg slide shadow-md"
        >
          <img
            className="h-full w-full rounded-md"
            src={
              "https://nextjs.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fshowcases-02.983de4fa.jpg&w=750&q=75"
            }
          />
          <div className="hidden group-hover:block py-2 absolute bottom-0 bg-purple-500 text-center text-white w-full transition duration-700 delay-150 ease-in-out">
            <p className="">Netflix</p>
          </div>
        </Link>
        <Link
          className="group cursor-pointer w-1/5 relative rounded-lg slide shadow-md top-5"
          style={{ width: "330px", height: "185px" }}
        >
          <img
            className="h-full w-full rounded-md"
            src={
              "https://nextjs.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftwitch.5e75fd8c.jpg&w=750&q=75"
            }
          />
          <div className="hidden group-hover:block py-2 absolute bottom-0 bg-purple-500 text-center text-white w-full transition duration-700 delay-150 ease-in-out">
            <p className="">Twitch</p>
          </div>
        </Link>
        <Link
          className="group cursor-pointer w-1/5 relative rounded-lg slide shadow-md top-10"
          style={{ width: "330px", height: "185px" }}
        >
          <img
            className=" h-full w-full rounded-md"
            src={
              "https://nextjs.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgithub.1a84a558.jpg&w=750&q=75"
            }
          />
          <div className="hidden group-hover:block py-2 absolute bottom-0 bg-purple-500 text-center text-white w-full transition duration-700 delay-150 ease-in-out">
            <p className="">GitHub Copilot</p>
          </div>
        </Link>
        <Link
          className="group cursor-pointer w-1/5 relative rounded-lg slide shadow-md top-14 z-40"
          style={{ width: "330px", height: "185px" }}
        >
          <img
            className="h-full w-full rounded-md"
            src={
              "https://nextjs.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fshowcases-17.0f2b1794.jpg&w=750&q=75"
            }
          />
          <div className="hidden group-hover:block py-2 absolute bottom-0 bg-purple-500 text-center text-white w-full transition duration-700 delay-150 ease-in-out">
            <p className="">Hulu</p>
          </div>
        </Link>
        <Link
          className="group cursor-pointer w-1/5 relative rounded-lg slide z-30 top-10 shadow-md"
          style={{ width: "330px", height: "185px" }}
        >
          <img
            className="h-full w-full rounded-md"
            src={
              "https://nextjs.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnike.509ec268.jpg&w=750&q=75"
            }
          />
          <div className="hidden group-hover:block py-2 absolute bottom-0 bg-purple-500 text-center text-white w-full transition duration-700 delay-150 ease-in-out">
            <p className="">Nike</p>
          </div>
        </Link>
        <Link
          className="group cursor-pointer w-1/5 relative slide rounded-lg z-20 top-5 shadow-md"
          style={{ width: "330px", height: "185px" }}
        >
          <img
            className="h-full w-full rounded-md"
            src={
              "https://nextjs.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Frealtor.7234df5f.jpg&w=750&q=75"
            }
          />
          <div className="hidden group-hover:block py-2 absolute bottom-0 bg-purple-500 text-center text-white w-full transition duration-700 delay-150 ease-in-out">
            <p className="">Realtor.com</p>
          </div>
        </Link>
        <Link
          className="group cursor-pointer w-1/5 relative slide rounded-lg z-10 shadow-md"
          style={{ width: "330px", height: "185px" }}
        >
          <img
            className="h-full w-full rounded-md"
            src={
              "https://nextjs.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fatt.1f25011a.jpg&w=750&q=75"
            }
          />
          <div className="hidden group-hover:block py-2 absolute bottom-0 bg-purple-500 text-center text-white w-full transition duration-700 delay-150 ease-in-out">
            <p className="">Spotify</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
