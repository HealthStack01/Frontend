import {motion} from "framer-motion";
import React from "react";

import {backgroundVariants} from "../../../ui/animations/utils";
import {InnerWrapper, SideBanner} from "./styles";
import coat_of_arms from "./ndphcn_logo.jpg";


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
        <h1> Nigerian Digital Primary Healthcare Network (NDPHCN)</h1> 

        <ul>
          <li>
            Transform your primary healthcare organisation  using a simple digital health
            solution suite. 
          </li> 
          <li>
            Offer exceptional quality healthcare services to your clients.
          </li>
          <li>
            Improve your organisation productivity and efficiency {/* and
            profitability. */}
          </li>
        </ul>
      </InnerWrapper>
      <img
        src={coat_of_arms}
        alt="background"
        className="fixed"
        aria-hidden="true"
        style={{
          width: "40%",
          height: "30vh",
        }}
      />
    </SideBanner>
  );
}

export default Side;
