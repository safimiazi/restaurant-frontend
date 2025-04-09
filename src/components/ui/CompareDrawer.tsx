/* eslint-disable @typescript-eslint/no-explicit-any */
import { Drawer, Table, Image, Button } from "antd";
import { useCompare } from "../../hooks/CompareContext";
import { X } from "lucide-react";

const CompareDrawer = ({ onClose, open }: any) => {
  const { removeFromCompare, compareList } = useCompare();

  return (
    <Drawer
      className="rounded-b-xl shadow-2xl"
      placement="top"
      onClose={() => onClose(false)}
      open={open}
      height={400}
      title="Compare Products"
    >
      {compareList.length === 0 ? (
        <p className="text-center text-gray-500">No products to compare.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table
            pagination={false}
            bordered
            columns={[
              { title: "Image", dataIndex: "feature", key: "feature" },
              ...compareList.map((product, index) => ({
                title: (
                  <div className="flex items-center gap-2">
                    <Image src={product.productImages[0]} width={50} />
                    <span>{product.productName}</span>
                    <Button
                      type="text"
                      icon={<X size={16} />}
                      onClick={() => removeFromCompare(product._id)}
                      danger
                    />
                  </div>
                ),
                dataIndex: `product_${index}`,
                key: `product_${index}`,
              })),
            ]}
            dataSource={[
              { key: "brand", feature: "Brand", ...Object.fromEntries(compareList.map((p, i) => [`product_${i}`, p.productBrand?.name || "N/A"])) },
              { key: "price", feature: "Price", ...Object.fromEntries(compareList.map((p, i) => [`product_${i}`, `$${p.productSellingPrice}`])) },
              { key: "offer", feature: "Offer Price", ...Object.fromEntries(compareList.map((p, i) => [`product_${i}`, p.productOfferPrice ? `$${p.productOfferPrice}` : "N/A"])) },
              { key: "stock", feature: "Stock", ...Object.fromEntries(compareList.map((p, i) => [`product_${i}`, p.productStock])) },
              { key: "description", feature: "Description", ...Object.fromEntries(compareList.map((p, i) => [`product_${i}`, p.productDescription])) },
              { key: "colors", feature: "Available Colors", ...Object.fromEntries(compareList.map((p, i) => [`product_${i}`, (
                  <div className="flex gap-1">
                    {p.variantcolor?.map((color : any) => (
                      <span key={color._id} className="w-5 h-5 rounded-full border" style={{ backgroundColor: color.colorCode }} />
                    ))}
                  </div>
                )])) 
              },
            ]}
          />
        </div>
      )}
    </Drawer>
  );
};

export default CompareDrawer;
