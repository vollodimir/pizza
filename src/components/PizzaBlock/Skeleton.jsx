import React from 'react';
import ContentLoader from 'react-content-loader';

///https://skeletonreact.com/

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={491}
    viewBox="0 0 280 491"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="135" cy="132" r="130" />
    <rect x="1" y="280" rx="5" ry="5" width="275" height="54" />
    <rect x="1" y="344" rx="5" ry="5" width="275" height="88" />
    <rect x="3" y="454" rx="5" ry="5" width="89" height="27" />
    <rect x="124" y="439" rx="23" ry="23" width="150" height="45" />
  </ContentLoader>
);

export default Skeleton;
