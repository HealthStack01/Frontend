import {motion} from "framer-motion";
import React from "react";

import {backgroundVariants} from "../../../ui/animations/utils";
import {InnerWrapper, SideBanner} from "./styles";
import coat_of_arms from "./coat_of_arms.png";


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
        <h1> Presidential Wing State House Medical Center (PWSHMC)</h1> 

        <ul>
         {/*  <li>
            Transform your health organisation  with our simple digital health
            solution suite. 
          </li> */}
          <li>
            Offer exceptional quality healthcare services to your clients.
          </li>
          <li>
            Improve your organisation productivity and efficiency a{/* nd
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
          width: "70%",
          height: "auto",
        }}
      />
    </SideBanner>
  );
}

export default Side;
