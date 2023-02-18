const MainLayout = ({children}:{children:React.ReactNode}) => {
  return(
    <div className="flex flex-row w-full h-[100vh]">
      {children}
    </div>
  )
}

export default MainLayout;