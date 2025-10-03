import { ProjectApp } from "../weeks/week3/mission/mission1/pages/ProjectApp";
import Study1Page from "../weeks/week3/study/study1";
import type { ReactElement } from "react";

export const projectMap: Record<string, Record<string, ReactElement>> = {
  "3": {
    "1": <Study1Page />, //3주차의 study1
    "2": <ProjectApp />,
  },
  "4": {
    study1: <h1>week4-study1 페이지</h1>,
  },
};
