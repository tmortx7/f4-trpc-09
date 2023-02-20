import MainLayout from "~/components/MainLayout";
import { api } from "~/utils/api";

const HomePage = () => {
  const { data, isLoading, error } = api.user.getUser.useQuery();

  if (isLoading) {
    return <p> Loading...</p>;
  }
  if (error) {
    return <p>Error...</p>;
  }

  return(
    <div>
      {data?.id}
    </div>
  )
}
HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default HomePage