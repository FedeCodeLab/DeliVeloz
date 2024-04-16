import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

//import Mercadopago from "../mercadopago/Mercadopago";
import { useNavigate } from "react-router-dom";
import { postOrder } from "../../redux/actions/actions";

const TotalAmount = () => {
  const shoppingCartDB = useSelector((state) => state.shoppingCartDB);
  const user = useSelector((state) => state.user);
  const [idUser, setIdUser] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const [showMercadoPago, setShowMercadoPago] = useState(false);

  useEffect(() => {
    setIdUser(user?.user?.id);
  }, [user]);

  const totalpay = () => {
    let total = 0;
    shoppingCartDB?.products?.map((product) => {
      total += product.price * product.quantity;
    });
    return total.toFixed(2);
  };

  const handlePayment = async () => {
    const total = parseFloat(totalpay());
    console.log("Total a pagar: ", total);
    console.log("Usuario: ", idUser);

    const payload = {
      idUser: idUser,
      total: total,
    };
    try {
      const response = await dispatch(postOrder(payload));
      // Guardar el ID de la orden en el estado
      setOrderId(response?.data);
      console.log("ID de la orden dentro: ", response?.data);
      // Redirige al usuario a orderUser
      //navigate("/orderUser");
    } catch (error) {
      console.error("Error al procesar la orden: ", error);
    }
    console.log("ID de la orden fuera: ", orderId);
  };

  return (
    <article className="container flex flex-col justify-center ">
      <div className=" w-full h-16 mt-6 p-4 bg-gray-100 rounded-lg border flex justify-between text-lg text-sundown-500 font-bold">
        <p className="flex items-center">Total a pagar: </p>
        <p className="flex items-center">${totalpay()}</p>
      </div>
      <button
        className="btn-bg flex items-center justify-center"
        onClick={handlePayment}
      >
        Generar Pago
      </button>
    </article>
  );
};

export default TotalAmount;
