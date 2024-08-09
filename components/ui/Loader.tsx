import { Spinner, LoadingProps } from "./spinner";
import { cn } from "@/lib/utils";

const Loader = ({ className, ...spinnerProps }: LoadingProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <Spinner {...spinnerProps} />
    </div>
  );
};

export default Loader;
