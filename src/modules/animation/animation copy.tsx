import React, { Component,Fragment } from 'react';
import posed from 'react-pose';
import './animation.css';
import { tween } from 'popmotion';
import { interpolate } from 'flubber';

const paths = {
    dev :
    "m 141.2015,-179.20313 a 17.319041,15.540296 0 0 0 -22.60135,7.38164 L -85.331558,223.13513 a 16.712875,14.996386 0 0 0 8.139949,19.96928 16.279899,14.607878 0 0 0 4.935928,1.32093 16.712875,14.996386 0 0 0 17.31904,-8.62487 L 149.34145,-159.15615 a 17.319041,15.540296 0 0 0 -8.13995,-20.04698 z M -68.532089,61.205244 a 17.319041,15.540296 0 0 0 1.64531,-11.422117 17.319041,15.540296 0 0 0 -7.880164,-9.168773 L -181.79862,-14.6314 a 8.6595205,7.7701481 0 0 1 -4.50295,-6.915432 8.6595205,7.7701481 0 0 1 4.41636,-6.915432 l 107.378052,-57.110587 a 17.319041,15.540296 0 0 0 7.620379,-9.246478 16.712875,14.996386 0 0 0 -12.036733,-18.259851 14.374804,12.898446 0 0 0 -4.243166,-0.54391 16.62628,14.918684 0 0 0 -8.659521,2.17565 l -144.613991,77.235267 a 16.712875,14.996386 0 0 0 0,25.952295 L -91.220032,66.72205 a 17.319041,15.540296 0 0 0 22.687943,-5.516806 z M 300.88305,74.569899 155.6629,-2.6653718 a 17.319041,15.540296 0 0 0 -8.65952,-2.0979398 16.79947,15.074087 0 0 0 -8.65952,27.9725336 L 245.72192,80.31981 a 8.6595205,7.7701481 0 0 1 0,13.908565 L 138.77683,149.47413 a 16.79947,15.074087 0 0 0 -6.23485,20.51319 17.319041,15.540296 0 0 0 22.94773,5.5945 L 300.45008,100.5999 a 16.79947,15.074087 0 0 0 0,-26.030001 z",
  plane:
    'M510,255c0-20.4-17.85-38.25-38.25-38.25H331.5L204,12.75h-51l63.75,204H76.5l-38.25-51H0L25.5,255L0,344.25h38.25 l38.25-51h140.25l-63.75,204h51l127.5-204h140.25C492.15,293.25,510,275.4,510,255z',
  circle:
    'M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z',
  heart:
    'M255,489.6l-35.7-35.7C86.7,336.6,0,257.55,0,160.65C0,81.6,61.2,20.4,140.25,20.4c43.35,0,86.7,20.4,114.75,53.55 C283.05,40.8,326.4,20.4,369.75,20.4C448.8,20.4,510,81.6,510,160.65c0,96.9-86.7,175.95-219.3,293.25L255,489.6z',
  bookmark:
    'M357,0H102C73.95,0,51,22.95,51,51v408l178.5-76.5L408,459V51C408,22.95,385.05,0,357,0z'
   };

const pathIds = Object.keys(paths);

const morphTransition = ({ from, to }) =>
  tween({
    from: 0,
    to: 1
  }).pipe(interpolate(from, to));

const Icon = posed.path(
  pathIds.reduce((config, id) => {
    config[id] = {
      d: paths[id],
      transition: morphTransition
    };

    return config;
  }, {})
);


class Animator extends React.Component {
  state = { pathIndex: 0 };

  gotoNext = () => {
    const { pathIndex } = this.state;
    const nextIndex = pathIndex + 1;
    this.setState({
      pathIndex: nextIndex > pathIds.length - 1 ? 0 : nextIndex
    });
  };
  componentDidMount() {
    setInterval(() => {
      this.gotoNext()
    }, 2000);
  }
  render() {
    return (
      <Fragment>
        <svg width="400" height="400" viewBox="0 0 520 500">
          <Icon pose={pathIds[this.state.pathIndex]} />
        </svg>
      </Fragment>
    );
  }
}


export default Animator;