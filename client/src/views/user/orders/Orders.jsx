import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMyOrders } from "../../../redux/actions/actions";
import DataTable from "react-data-table-component";

export default function Orders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(setMyOrders(user.id));
  }, [dispatch]);

  const myOrders = useSelector((state) => state.myOrders);
  console.log(myOrders);

  return (
    <section className="container">
      <h1>Tablas de pedidos</h1>
    </section>
  );
}