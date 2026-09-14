import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useSearchParams } from "react-router-dom";

import {
  useHistoryDataContext,
  type THistoryData,
} from "../../../contexts/history-data-context";

export const HISTORY_YEAR_SEARCH_PARAM_KEY = "year";

export type TSelectedHistoryContext = {
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  data: THistoryData["all"][number];
};
const SelectedHistoryContext = createContext<TSelectedHistoryContext | null>(
  null,
);

export const useSelectedHistoryContext = () => {
  const context = useContext(SelectedHistoryContext);
  if (!context) {
    throw new Error(
      "[ERROR] useSelectedHistoryContext must be used within SelectedHistoryContextProvider.",
    );
  }
  return context;
};

export const SelectedHistoryContextProvider = ({
  initialValue,
  children,
}: {
  initialValue: Pick<TSelectedHistoryContext, "year">;
  children: React.ReactNode;
}) => {
  const { all: historyDataset } = useHistoryDataContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const yearSearchParam = searchParams.get(HISTORY_YEAR_SEARCH_PARAM_KEY);
  const searchParamData = historyDataset.find(
    (d) => String(d.year) === yearSearchParam,
  );
  const hasInvalidYearSearchParam =
    yearSearchParam !== null && searchParamData === undefined;

  const year = searchParamData?.year ?? initialValue.year;
  const data = historyDataset.find((d) => d.year === year);

  useEffect(() => {
    if (!hasInvalidYearSearchParam) {
      return;
    }
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete(HISTORY_YEAR_SEARCH_PARAM_KEY);
        return next;
      },
      { replace: true },
    );
  }, [hasInvalidYearSearchParam, setSearchParams]);

  const setYear = useCallback<TSelectedHistoryContext["setYear"]>(
    (action) => {
      const nextYear = typeof action === "function" ? action(year) : action;
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(HISTORY_YEAR_SEARCH_PARAM_KEY, String(nextYear));
          return next;
        },
        { replace: true },
      );
    },
    [year, setSearchParams],
  );

  if (!data) {
    throw new Error(
      `[ERROR] History data for the year(${year}) does not exist.`,
    );
  }

  return (
    <SelectedHistoryContext.Provider
      value={{ year, setYear, data }}
      children={children}
    />
  );
};
