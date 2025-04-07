import { LoadingSpinner } from "@/icons/loadingSpinner";

const Loading = () => {
  return (
    <div className={"h-screen flex justify-center items-center w-full"}>
        <LoadingSpinner size={200} className=" animate-spin" />
    </div>
  );
};
export default Loading;
