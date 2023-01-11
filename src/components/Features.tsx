import React from "react";

const FeatureList = [
  {
    title: "Scalable",
    imgUrl: "/img/undraw_docusaurus_mountain.svg",
    description: (
      <>
        Stacked is built to make your team scalable and keep your productivity
        high. With good code conventions and a strong opinion on how to develop
        functionality, you or your team will have a clear guide around adding
        and maintaining features.
      </>
    ),
  },
  {
    title: "Testable",
    imgUrl: "/img/undraw_docusaurus_tree.svg",
    description: (
      <>
        We put an emphasis on unit tests and our MVVM architecture is designed
        to make unit testing any part of your business logic or state as easy as
        possible.
      </>
    ),
  },
  {
    title: "Maintainable",
    imgUrl: "/img/undraw_docusaurus_react.svg",
    description: (
      <>
        We have strong opinions on separation of concerns. This in combination
        with our strict coding principles will allow you to scale your code
        consistently and without worry of turning into spaghetti as you grow.
      </>
    ),
  },
];

export default function HomepageFeatures() {
  return (
    <section className="container mx-auto">
      <h2 className="ml-4 text-4xl">Features</h2>
      <div className="flex flex-col justify-center gap-4 px-6 py-4 md:gap-8 md:flex-row">
        {FeatureList.map(({ title, description, imgUrl }) => (
          <div
            className="flex flex-col w-full gap-2 p-4 rounded-lg bg-gray-100/50"
            key={title}
          >
            <img className="w-24 h-24" src={imgUrl} />
            <div>
              <h3 className="text-2xl font-bold">{title}</h3>
              <p className="text-xl text-gray-500">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
