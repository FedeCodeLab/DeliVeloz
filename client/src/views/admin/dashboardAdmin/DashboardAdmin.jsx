import { useState, useEffect } from "react";
import SidebarAdmin from "../../../components/admin/SidebarAdmin.jsx";
import UsersAdmin from "../../../components/admin/UsersAdmin.jsx";
import NewsAdmin from "../../../components/admin/NewsAdmin.jsx";
// import ProductsAdmin from "../../components/admin/ProductsAdmin";
import ProductsAdmin from "../../../components/admin/ProductsAdmix.jsx";
import { useLocalStoreUserData } from "../../../hooks/useLocalStoreUserData.js";
import { useLocalStoreUserDataGoogle } from "../../../hooks/useLocalStoreUserDataGoogle.js";
import { useGetShoppingDB } from "../../../hooks/useGetShoppingDB.js";

export default function DashboardAdmin() {
  const [selectedComponent, setSelectedComponent] = useState(
    () => localStorage.getItem("selectedComponent") || "products"
  );

  useEffect(() => {
    localStorage.setItem("selectedComponent", selectedComponent);
  }, [selectedComponent]);

  useLocalStoreUserData();
  useLocalStoreUserDataGoogle();
  useGetShoppingDB();

  const renderComponent = () => {
    switch (selectedComponent) {
      case "users":
        return <UsersAdmin />;
      case "products":
        return <ProductsAdmin />;
      case "news":
        return <NewsAdmin />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-5 relative">
      <SidebarAdmin setSelectedComponent={setSelectedComponent} />
      {renderComponent()}
    </div>
  );
}
