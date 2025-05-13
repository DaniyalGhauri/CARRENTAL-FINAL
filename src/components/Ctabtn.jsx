import React from "react";
import Link from "next/link"

const Ctabtn = ({ text = "Let's Talk", textColor = "text-black" }) => {
  return (
    <div>
    <Link href={"/login"}> 
    <button
        className={`mt-3 border-2 p-2 rounded-3xl transition-all duration-400 border-green-500 hover:bg-green-500 ${textColor}`}
      >
        {text}
      </button>
      </Link>
    </div>
  );
};

export default Ctabtn;
