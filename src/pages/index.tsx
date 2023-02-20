import { useSession } from "next-auth/react";
import MainLayout from "~/components/MainLayout";

const HomePage = () => {
  const { data } = useSession();
  return(
    <div>
      {JSON.stringify(data, null, 2)}
    </div>
  )
}
HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage