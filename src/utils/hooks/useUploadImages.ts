import Api from "@/api/schedule";
import { showToast } from "@/utils";

import { useCallback } from "react";

const useUploadImages = () => {
  const createFormData = useCallback((files: File[]): FormData => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });
    return formData;
  }, []);

  const isFormDataEmpty = (formData: FormData): boolean => {
    const entries = formData.entries();
    return entries.next().done ?? false;
  };

  return async (imageFiles: File[]) => {
    const formData = createFormData(imageFiles);

    if (isFormDataEmpty(formData)) {
      return null;
    }

    try {
      const { status, data } = await Api.v1UploadImage("schedule", formData);

      if (status === 200 && data?.uploaded) {
        return data.url;
      }
    } catch {
      showToast("이미지 업로드 문제가 발생했습니다.");
    }

    return null;
  };
};

export default useUploadImages;
