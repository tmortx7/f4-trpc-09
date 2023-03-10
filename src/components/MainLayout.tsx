import { Navbar } from "./Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full flex-row justify-center">
      <div className="flex h-[100vh] w-full max-w-7xl flex-col ">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
