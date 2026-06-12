import { TopNavbar } from "@components";
import { BaseLayout } from "@ui/layout/base-layout";
import { PolygonOfDoom } from "./_components/polygon-of-doom";

export const StateTortureScreen = () => {
  return (
    <BaseLayout safeAreaStyles={{ backgroundColor: "white" }} headerComponent={<TopNavbar />} footerComponent={<></>}>
      <PolygonOfDoom />
    </BaseLayout>
  );
};
