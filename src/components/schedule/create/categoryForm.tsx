import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { categorySelector } from "@/recoil/schedule/scheduleState";
import { CategoryListType } from "@/types/schedule";
import Api from "@/api/schedule";

const CategoryForm = () => {
  const [category, setCategory] = useRecoilState(categorySelector);
  const [categoryList, setCategoryList] = useState<CategoryListType[]>([]);

  const selectCategory = (item: CategoryListType) => {
    if (item.id == category.id) {
    } else {
      setCategory(item);
    }
  };

  const getCategoryList = async () => {
    await Api.v1GetCategoryList().then((res) => {
      setCategoryList(res.data);
    });
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  // 상세 데이터 선택 처리를 위함
  useEffect(() => {
    if (category.id === -1 && category.name.length > 0) {
      const selectedCategory = categoryList.find(
        (c) => c.name === category.name,
      );
      selectedCategory && setCategory(selectedCategory);
    }
  }, [category]);

  return (
    <>
      <div className="flex items-center space-x-4 mt-2 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2 text-[12px]">
            {categoryList.map((el, idx) => (
              <div
                key={`category${idx}`}
                className="flex justify-center items-center min-w-[60px] h-[30px] px-3 py-1 font-[700] rounded-[10px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] cursor-pointer"
                style={{
                  backgroundColor: `${category.id === el.id ? category.colorCodeValue : "#fff"}`,
                }}
                onClick={() => selectCategory(el)}
              >
                {el.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryForm;
