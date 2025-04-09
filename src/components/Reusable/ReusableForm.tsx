/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { PlusOutlined } from "@ant-design/icons";
// import {
//   Form,
//   Input,
//   Select,
//   Radio,
//   Checkbox,
//   Button,
//   Upload,
//   Image,
// } from "antd";
// import { useEffect } from "react";

// const ReusableForm = ({
//   fields,
//   initialValues,
//   form,
//   onSubmit,
//   fileList,
//   setFileList,
//   previewImage,
//   loading,
// }: any) => {
//   // Set existing values when initialValues change
//   useEffect(() => {
//     if (initialValues !== null) {
//       form.setFieldsValue(initialValues);
//      if(initialValues?.images != null) {

//        setFileList(initialValues?.images || []);
//      }
//     }
//   }, [initialValues, form]);

//   const handleFinish = (values: any) => {
//     if (fileList && fileList.length > 0) {
//       values.images = fileList?.map((file: any) => file?.originFileObj || file);
//     }
//     onSubmit(values);
//   };

//   const handleUploadChange = ({ fileList }: any) => {
//     setFileList(fileList);
//     form.setFieldsValue({ images: fileList });
//   };

//   return (
//     <Form form={form} layout="vertical" onFinish={handleFinish}>
//       {fields?.map((field: any) => {
//         switch (field.type) {
//           case "text":
//             return (
//               <Form.Item
//                 key={field.name}
//                 label={field.label}
//                 name={field.name}
//                 rules={field.rules}
//               >
//                 <Input placeholder={field.placeholder} />
//               </Form.Item>
//             );
//           case "number":
//             return (
//               <Form.Item
//                 key={field.name}
//                 label={field.label}
//                 name={field.name}
//                 rules={field.rules}
//               >
//                 <Input type="number" placeholder={field.placeholder} />
//               </Form.Item>
//             );
//           case "select":
//             return (
//               <Form.Item
//                 key={field.name}
//                 label={field.label}
//                 name={field.name}
//                 rules={field.rules}
//               >
//                 <Select
//                   mode={field.mode}
//                   options={field.options}
//                   placeholder={field.placeholder}
//                 />
//               </Form.Item>
//             );
//           case "radio":
//             return (
//               <Form.Item
//                 key={field.name}
//                 label={field.label}
//                 name={field.name}
//                 rules={field.rules}
//               >
//                 <Radio.Group options={field.options} optionType="button" />
//               </Form.Item>
//             );
//           case "checkbox":
//             return (
//               <Form.Item
//                 key={field.name}
//                 name={field.name}
//                 rules={field.rules}
//                 valuePropName="checked"
//               >
//                 <Checkbox>{field.label}</Checkbox>
//               </Form.Item>
//             );

//           case "image": // ✅ Added dynamic image upload field
//             return (
//               <Form.Item
//                 key={field.name}
//                 label={field.label}
//                 name={field.name}
//                 rules={field.rules}
//               >
//                 <div>
//                   <Upload
//                     listType="picture-card"
//                     fileList={fileList}
//                     beforeUpload={() => false} // Prevent automatic upload
//                     onChange={handleUploadChange}
//                     multiple
//                   >
//                     {fileList?.length >= field?.maxCount ? null : (
//                       <div>
//                         <PlusOutlined />
//                         <div style={{ marginTop: 8 }}>Upload</div>
//                       </div>
//                     )}
//                   </Upload>
//                   {previewImage && (
//                     <div className="mt-2">
//                       <Image
//                         src={previewImage}
//                         alt="Preview"
//                         style={{ maxWidth: "100px", borderRadius: "8px" }}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </Form.Item>
//             );

//           default:
//             return null;
//         }
//       })}

//       <Form.Item>
//         <Button loading={loading} type="primary" htmlType="submit">
//           {initialValues ? "Edit" : "Submit"}
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default ReusableForm;


import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Select, Radio, Checkbox, Button, Upload, Image } from "antd";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import namer from "color-namer";

const ReusableForm = ({
  fields,
  initialValues,
  form,
  onSubmit,
  fileList,
  setFileList,
  previewImage,
  loading,
}: any) => {
  const [color, setColor] = useState("#1890ff"); // Default color

  // Set existing values when initialValues change
  useEffect(() => {
    if (initialValues !== null) {
      form.setFieldsValue(initialValues);
      if (initialValues?.images != null) {
        setFileList(initialValues?.images || []);
      }
      if (initialValues?.color) {
        setColor(initialValues?.color); // Set color from initialValues
      }
    }
  }, [initialValues, form]);

  const handleFinish = (values: any) => {
    if (fileList && fileList.length > 0) {
      values.images = fileList?.map((file: any) => file?.originFileObj || file);
    }
    onSubmit(values);
  };

  const handleUploadChange = ({ fileList }: any) => {
    setFileList(fileList);
    form.setFieldsValue({ images: fileList });
  };

  const getColorName = (hex: string) => {
    const names = namer(hex);
    return names?.basic[0]?.name || "Unknown"; // Using basic color names
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      {fields?.map((field: any) => {
        switch (field.type) {
          case "text":
            return (
              <Form.Item key={field.name} label={field.label} name={field.name} rules={field.rules}>
                <Input placeholder={field.placeholder} />
              </Form.Item>
            );
          case "number":
            return (
              <Form.Item key={field.name} label={field.label} name={field.name} rules={field.rules}>
                <Input type="number" placeholder={field.placeholder} />
              </Form.Item>
            );
          case "select":
            return (
              <Form.Item key={field.name} label={field.label} name={field.name} rules={field.rules}>
                <Select mode={field.mode} options={field.options} placeholder={field.placeholder} />
              </Form.Item>
            );
          case "radio":
            return (
              <Form.Item key={field.name} label={field.label} name={field.name} rules={field.rules}>
                <Radio.Group options={field.options} optionType="button" />
              </Form.Item>
            );
          case "checkbox":
            return (
              <Form.Item key={field.name} name={field.name} rules={field.rules} valuePropName="checked">
                <Checkbox>{field.label}</Checkbox>
              </Form.Item>
            );
          case "image":
            return (
              <Form.Item key={field.name} label={field.label} name={field.name} rules={field.rules}>
                <div>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={() => false} // Prevent automatic upload
                    onChange={handleUploadChange}
                    multiple
                  >
                    {fileList?.length >= field?.maxCount ? null : (
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                  {previewImage && (
                    <div className="mt-2">
                      <Image src={previewImage} alt="Preview" style={{ maxWidth: "100px", borderRadius: "8px" }} />
                    </div>
                  )}
                </div>
              </Form.Item>
            );
          case "color-picker":
            return (
              <Form.Item key={field.name} label={field.label} name={field.name} rules={field.rules}>
                <div>
                  <HexColorPicker color={color} onChange={(newColor) => {
                    setColor(newColor);
                    form.setFieldsValue({ color: newColor }); // Set the color in form
                  }} />
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "10px",
                      backgroundColor: color,
                      color: "#fff",
                      fontWeight: "bold",
                      borderRadius: "5px",
                      width: "200px",
                      marginBottom: "10px"
                    }}
                  >
                     Color Code: {color.toUpperCase()}
                  </div>
                  <Input type="text" value={getColorName(color)}/>
                </div>
              </Form.Item>
            );
          default:
            return null;
        }
      })}

      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          {initialValues ? "Edit" : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReusableForm;
