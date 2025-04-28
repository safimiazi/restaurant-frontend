// utils/formDataUtils.ts
export const objectToFormData = (obj: any): FormData => {
    const formData = new FormData();
    
    Object.entries(obj).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      
      if (Array.isArray(value)) {
        value.forEach(item => {
          if (typeof item === 'object' && !(item instanceof File)) {
            formData.append(key, JSON.stringify(item));
          } else {
            formData.append(key, item);
          }
        });
      } else if (typeof value === 'object' && !(value instanceof File)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as any);
      }
    });
    
    return formData;
  };