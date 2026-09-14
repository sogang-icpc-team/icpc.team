import React, { createContext, useCallback, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  TSpcData,
  useSpcDataContext,
} from "../../../contexts/spc-data-context";

export const SPC_YEAR_SEARCH_PARAM_KEY = "year";

export type TSelectedSpcHistoryContext = {
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  data: TSpcData["all"][number];
};
const SelectedSpcHistoryContext =
  createContext<TSelectedSpcHistoryContext | null>(null);

export const useSelectedSpcHistoryContext = () => {
  const context = useContext(SelectedSpcHistoryContext);
  if (!context) {
    throw new Error(
      "[ERROR] useSelectedSpcHistoryContext must be used within SelectedSpcHistoryContextProvider.",
    );
  }
  return context;
};

export const SelectedSpcHistoryContextProvider = ({
  initialValue,
  children,
}: {
  initialValue: Pick<TSelectedSpcHistoryContext, "year">;
  children: React.ReactNode;
}) => {
  const { all: spcDataset } = useSpcDataContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const yearSearchParam = searchParams.get(SPC_YEAR_SEARCH_PARAM_KEY);
  const searchParamData = spcDataset.find(
    (d) => String(d.year) === yearSearchParam,
  );
  const hasInvalidYearSearchParam =
    yearSearchParam !== null && searchParamData === undefined;

  const year = searchParamData?.year ?? initialValue.year;
  const data = spcDataset.find((d) => d.year === year);

  useEffect(() => {
    if (!hasInvalidYearSearchParam) {
      return;
    }
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete(SPC_YEAR_SEARCH_PARAM_KEY);
        return next;
      },
      { replace: true },
    );
  }, [hasInvalidYearSearchParam, setSearchParams]);

  const setYear = useCallback<TSelectedSpcHistoryContext["setYear"]>(
    (action) => {
      const nextYear = typeof action === "function" ? action(year) : action;
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(SPC_YEAR_SEARCH_PARAM_KEY, String(nextYear));
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
    <SelectedSpcHistoryContext.Provider
      value={{ year, setYear, data }}
      children={children}
    />
  );
};
