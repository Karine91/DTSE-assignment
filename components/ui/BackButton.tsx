"use client";
import { useRouter } from "next/navigation";

import { Button, type ButtonProps } from "@/components/ui/button";

const BackButton = ({
  backUrl,
  ...buttonProps
}: ButtonProps & { backUrl?: string }) => {
  const router = useRouter();

  const handleNavigate = () => {
    if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };
  return (
    <Button className={"mt-10"} onClick={handleNavigate} {...buttonProps}>
      Back
    </Button>
  );
};

export default BackButton;
