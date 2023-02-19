import { Navbar } from "./Navbar";

const MainLayout = ({children}:{children:React.ReactNode}) => {
  return(
    <div className="flex flex-col w-full h-[100vh]">
      <Navbar />
      {children}
    </div>
  )
}

export default MainLayout;