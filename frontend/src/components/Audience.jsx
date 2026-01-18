import React from "react";
import { useState, useEffect } from "react";
import happyAudience from '/happynwhacks26.png';
import sadAudience from '/sadnwhacks26.png';

function Audience({timeLimit, currentTime}) {
    const [audience, setAudience] = useState(happyAudience);

    useEffect(() => {
        if (currentTime > timeLimit) {
            setAudience(sadAudience);
        }

    }, [currentTime])
    

  return (
    <div>
      <img src = {audience} className="audience"/>
    </div>
  );
}

export default Audience;
