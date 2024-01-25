import FileUploader from "@/components/fileupload";
import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  return (
    <div className="h-full flex flex-col lg:flex-row">
      <FileUploader params={{ userId }} />
      <div className="h-2/3 p-6 flex items-center justify-center">
        <Image
          src={require("../../../../public/add_files.svg")}
          alt="add file"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};
export default DashboardPage;
