import { useParams } from "react-router-dom";
import { projectMap } from "../utils/map";

//라우트 파람을 불러와서 해당 페이지를 띄우는 페이지 입니다
const PageManager = () => {
  const { weekId, projectId } = useParams<{
    weekId: string;
    projectId: string;
  }>();

  if (!weekId || !projectId) {
    return <h1>잘못된 접근입니다.</h1>;
  }

  const Component = projectMap[weekId]?.[projectId];

  return Component ?? <h1>404 Not Found</h1>;
};

export default PageManager;
