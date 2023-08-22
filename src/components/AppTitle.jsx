import React from "react";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AppTitle = () => {
  library.add(faBullseye);
  
  return (
    <div className="title-container flex h-1/6 w-full items-center justify-center p-3">
      <div className="title text-5xl font-bold text-white mb-2">
        FocusOne
        <FontAwesomeIcon icon={faBullseye} className="pl-2" />
      </div>
    </div>
  );
};

export default AppTitle;
