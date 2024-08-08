import React from "react";

export const NoData = ({ message }: { message?: string }) => {
  return (
    <div className="flex p-4 items-center justify-center">
      {message || "No Data"}
    </div>
  );
};
