import React from "react";
import Image from "next/image";

function FileChat() {
  return (
    <div className="h-2/3 p-6 flex items-center justify-center">
      <Image
        src={require("../public/add_files.svg")}
        alt="add file"
        width={400}
        height={400}
      />
    </div>
  );
}

export default FileChat;
