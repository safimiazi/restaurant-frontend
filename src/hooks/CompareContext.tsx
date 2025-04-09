import React, { createContext, useEffect } from "react";
import Swal from "sweetalert2";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface CompareContextType {
  compareList: any[];
  addToCompare: (product: any) => void;
  removeFromCompare: (productId: string) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: any }) => {
  const [compareList, setCompareList] = React.useState<any[]>([]);

  // LocalStorage থেকে compare list লোড করা
  useEffect(() => {
    const savedCompareList = localStorage.getItem("compareList");
    if (savedCompareList) {
      setCompareList(JSON.parse(savedCompareList));
    }
  }, []);

  // Compare List আপডেট হলে LocalStorage-এ সংরক্ষণ করা
  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {}, [compareList]);

  const addToCompare = (product: any) => {
    if (compareList.length >= 2) {
      Swal.fire({
        title: "Limit Reached!",
        text: "You can compare up to 2 products only.",
        icon: "warning",
      });
      return;
    } else {
      setCompareList((prevList) => {
        if (prevList.find((p) => p._id === product._id)) return prevList;
        return [...prevList, product];
      });
    }
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) =>
      prev.filter((product) => product._id !== productId)
    );
  };

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = React.useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};
