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
        <h1>Church Stack: Church Growth Platform</h1>

        <ul>
          <li>
           Monitor Membership Attendance
          </li>
          <li>
          Work Team Management.
          </li>
          <li>
           Track Growth
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
