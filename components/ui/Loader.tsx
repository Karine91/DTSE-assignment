import { cn } from "@/lib/utils";

import { Spinner, LoadingProps } from "./spinner";

const Loader = ({ className, ...spinnerProps }: LoadingProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <Spinner {...spinnerProps} />
    </div>
  );
};

export default Loader;
