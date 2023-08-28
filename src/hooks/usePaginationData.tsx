import { useState } from "react";
import { Result } from "../App";

export type Action = 0 | 1 | 2 | 3;

export type GroupsOfOneHundred = Result[][];

const getPageIndex = (index: number) => {
  if (index <= 9) {
    return 0;
  }

  return Math.floor((index - 100) / 100) + 1;
};

const usePaginationData = (data: Result[]) => {
  const [activePage, setActivePage] = useState(0);

  const groupsOfOneHundred = data.reduce(
    (acc: GroupsOfOneHundred, item: Result, i: number) => {
      const itemPageIndex: number = getPageIndex(i);

      if (!acc[itemPageIndex]) {
        acc[itemPageIndex] = [];
      }

      acc[itemPageIndex].push(item);

      return acc;
    },
    []
  );

  const handleClickNumber = (page: number) => {
    setActivePage(page);
  };

  const handleClickArrows = (action: Action) => {
    if (action === 0) {
      setActivePage(0);
    }

    if (action === 1) {
      setActivePage((prev) => {
        if (prev > 0) {
          return prev - 1;
        }

        return prev;
      });
    }

    if (action === 2) {
      setActivePage((prev) => {
        const limit = groupsOfOneHundred.length - 1;

        if (prev < limit) {
          return prev + 1;
        }

        return prev;
      });
    }

    if (action === 3) {
      setActivePage(groupsOfOneHundred.length - 1);
    }
  };

  return {
    groupsOfOneHundred,
    activePage,
    handleClickArrows,
    handleClickNumber
  };
};

export default usePaginationData;
