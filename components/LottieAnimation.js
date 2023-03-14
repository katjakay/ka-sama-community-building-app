'use client';

import Lottie from 'lottie-react';
import React from 'react';
import jugglingMaster from './jugglingMaster.json';

const LottieAnimation = () => (
  <div className="flex flex-wrap justify-center">
    <Lottie className="w-60" animationData={jugglingMaster} loop={true} />
  </div>
);

export default LottieAnimation;
