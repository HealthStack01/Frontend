import {motion} from "framer-motion";
import React from "react";

import {backgroundVariants} from "../../../ui/animations/utils";
import {InnerWrapper, SideBanner} from "./styles";

function Side() {
  return (
    <SideBanner>
      <InnerWrapper>
        <motion.img
          src="/Healthstack.svg"
          alt="Healthstack logo"
          className="side-logo"
          variants={backgroundVariants}
          initial="hidden"
          animate="visible"
        />
        <h1> Africa's No. 1 Digital Healthcare Platform</h1>

        <ul>
          <li>
            Transform your health organisation with our simple digital health
            solution suite.
          </li>
          <li>
            Offer exceptional quality healthcare services to your clients.
          </li>
          <li>
            Improve your organisation productivity, efficiency and
            profitability.
          </li>
        </ul>
      </InnerWrapper>
      <img
        src="/hstack-backround.png"
        alt="background"
        className="fixed"
        aria-hidden="true"
      />
    </SideBanner>
  );
}

export default Side;
