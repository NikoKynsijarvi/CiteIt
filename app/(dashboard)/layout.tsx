import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { auth } from "@clerk/nextjs";
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();
  return (
    <div className="h-full relative ">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar params={{ userId: userId! }} />
      </div>
      <main className="md:pl-72 h-full">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
