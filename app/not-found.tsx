import BackButton from "@/components/ui/BackButton";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center flex-grow">
      <h2 className="text-center text-lg">404 | Not Found</h2>
      <p className="my-1">Could not find requested resource</p>
      <BackButton />
    </div>
  );
}
