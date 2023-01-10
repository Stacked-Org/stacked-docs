import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Scalable',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Stacked is built to make your team scalable and keep your productivity high. With good code conventions and a strong opinion on how to develop functionality, you or your team will have a clear guide around adding and maintaining features.
      </>
    ),
  },
  {
    title: 'Testable',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        We put an emphasis on unit tests and our MVVM architecture is designed to make unit testing any part of your business logic or state as easy as possible.
      </>
    ),
  },
  {
    title: 'Maintainable',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        We have strong opinions on separation of concerns. This in combination with our strict coding principles will allow you to scale your code consistently and without worry of turning into spaghetti as you grow.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div>
        <h3 className="font-bold text-4xl py-3">{title}</h3>
        <p className="text-gray-500 text-xl py-3">{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
