import MainLayout from "~/components/MainLayout";

const HomePage = () => {
  return(
    <div>
      homepage
    </div>
  )
}
HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage