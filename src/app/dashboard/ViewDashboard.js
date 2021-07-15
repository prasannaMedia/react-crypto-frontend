import React from "react";
import HeroCards from "./HeroCards";
import View from "../tables/View";

export const ViewDashboard = () => {
  return (
    <div>
      <div className="mb-5">
        <HeroCards />
      </div>
      <View />
    </div>
  );
};
