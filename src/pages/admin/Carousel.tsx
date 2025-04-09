/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { Form, Button, Modal, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import Swal from "sweetalert2";
import {
    useCarouselSoftDeleteMutation,
    useCreateCarouselMutation,
  useGetAllCarouselPhotoQuery,
  useUpdateMutation,
} from "../../redux/api/CarouselApi";
import CustomTable from "../../components/common/CustomTable";
import ReusableForm from "../../components/Reusable/ReusableForm";

const Carousel = () => {
  const [form] = Form.useForm();
  const [initialValues, setiInitialValues] = useState<any | null>(null);

  const [fileList, setFileList] = useState<any[]>(initialValues?.images || []);

  const [Edit, setEdit] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: data } = useGetAllCarouselPhotoQuery({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    isDelete: false,
    search: globalFilter,
  });
  const [previewImage, setPreviewImage] = useState("");

  const [create, { isLoading: isPostLoading }] = useCreateCarouselMutation();
  const [update, { isLoading: isEditLoading }] = useUpdateMutation();
  const [carouselSoftDelete] = useCarouselSoftDeleteMutation();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (Edit === null) {
      setLoading(isPostLoading);
    } else if (Edit !== null) {
      setLoading(isEditLoading);
    }
  }, [isEditLoading, isPostLoading]);

//   const handleEdit = (editData: any) => {
//     setEdit(editData);
//     setIsModalOpen(true);
//   };

  const handleDelete = async (id: string) => {
    try {
      const res = await carouselSoftDelete({ id }).unwrap();
      Swal.fire({
        title: "Good job!",
        text: `${res.message}`,
        icon: "success",
      });
    } catch (error: any) {
      Swal.fire({
        title: "Good job!",
        text: `${error.message}`,
        icon: "error",
      });
    }
  };
  const isDarkMode = false;
  const customColumns = [
    {
      header: "ACTION",
      size: 50,
      muiTableHeadCellProps: {
        sx: { color: `${isDarkMode ? "white" : "black"} ` },
      },
      Cell: ({ row }: any) => (
        <div className="flex justify-start gap-2">
          <Popconfirm
            title="Are you sure you want to delete this About?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(row._id)} // Executes delete on confirm
            okText="Yes, Delete"
            cancelText="Cancel"
            // okButtonProps={{ danger: true }}
          >
            <Button type="primary" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>

          {/* <Button loading={isDeleteLoading} onClick={() => handleEdit(row)}>
            Edit
          </Button> */}
        </div>
      ),
    },

  

    {
      header: "IMAGES",
      Cell: ({ row }: any) => (
        <div className="flex items-center gap-1">
          <img src={row.image} width={80} height={80} />
        </div>
      ),
    },

    {
      header: "CREATED DATE",
      Cell: ({ row }: any) => (
        <div className="space-y-1 text-sm">
          <p>
            {new Date(row.createdAt).toLocaleDateString("en", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (Edit && Edit !== null) {
      const initialValues = {
        name: Edit.name,
        isFeatured: Edit.isFeatured === "true" ? true : false,
      };
      setPreviewImage(Edit.image);
      setiInitialValues(initialValues);
    }
  }, [Edit]);

  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields();
      setEdit(null);
      setiInitialValues(null);
      setFileList([]);
      setPreviewImage("");
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (fileList.length > 0 && Edit) {
      setPreviewImage("");
    }
  }, [fileList]);

  const fields = [
    {
      name: "image",
      label: "Upload Image",
      type: "image", // ✅ Now supports images
      rules: [
        {
          required: Edit ? false : true,
          message: "Please upload product image",
        },
      ],
      maxCount: 1, // Optional: Max number of images allowed
    },
  ];

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();

      // Append images
      formData.append("image", values.images[0]);

      let res;
      if (Edit) {
        res = await update({
          data: formData,
          id: Edit._id,
        }).unwrap();

        Swal.fire({
          title: "Good job!",
          text: `${res.message}`,
          icon: "success",
        });
      } else {
        res = await create(formData).unwrap();
        Swal.fire({
          title: "Good job!",
          text: `${res.message}`,
          icon: "success",
        });
      }
      setIsModalOpen(false); // সাবমিশন সফল হলে মডাল ক্লোজ করবে
      form.resetFields(); // ফর্ম রিসেট করবে
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: `${error.data?.errorSource[0]?.message || error?.data?.message}`,
        icon: "error",
      });
    }
  };
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const deleteMultiple = async () => {};

  return (
    <div style={{ padding: 20 }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Carousel
        </Button>

        <CustomTable
          columns={customColumns}
          data={data?.data?.result || []}
          pagination={pagination}
          onPaginationChange={(pageIndex, pageSize) =>
            setPagination({ pageIndex, pageSize })
          }
          onBulkDelete={() => {
            deleteMultiple();
          }}
          enableBulkDelete={true}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          globalFilter={globalFilter}
          onFilterChange={setGlobalFilter}
          totalRecordCount={data?.data?.meta?.total || 0}
        />
      </div>

      <Modal
        title={Edit ? "Edit Brand" : "Add Brand"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <ReusableForm
          fields={fields}
          form={form}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          fileList={fileList}
          setFileList={setFileList}
          previewImage={previewImage}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default Carousel;
