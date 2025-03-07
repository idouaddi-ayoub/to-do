import { useEffect, useState } from "react";
import type { Category, GetCategoryResponse } from "../types";
import useAxios from "./useAxios";
import { AxiosResponse } from "axios";

export default function useCategories() {
  const axios = useAxios();
  const [categories, setCategories] = useState<Category[]>([]);

  async function getCategories() {
    const response: AxiosResponse<GetCategoryResponse> = await axios.get(
      "category"
    );

    setCategories(response.data.data);
  }

  useEffect(() => {
    console.log("Categories state changed:", categories);
  }, [categories]);

  return { categories, getCategories };
}
