import React, { useState, useEffect } from "react";
import { Button, Input, Select } from "antd";
import Parse from "parse";
import { useParseQuery } from "@parse/react";
import SingleOrder from "./SingleOrder";

const { Option } = Select;

const Orders = () => {
  const [orderTitle, setOrderTitle] = useState("");
  const [orderStatus, setOrderStatus] = useState("Pending");
  const [usersData, setUsersData] = useState({});

  const parseQuery = new Parse.Query("Order");
  parseQuery.descending("updateAt");

  const { isLoading, results, error } = useParseQuery(parseQuery, {
    enableLocalDatastore: true,
    enableLiveQuery: true,
  });

  const addOrder = async () => {
    try {
      const Order = Parse.Object.extend("Order");
      const order = new Order();
      order.set("title", orderTitle);
      order.set("status", orderStatus);
      order.set("user", Parse.User.current());
      await order.save();

      setOrderTitle("");
      setOrderStatus("Pending");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchUsersData = async () => {
      const newUsersData = {};
      for (const order of results) {
        const user = order.get("user");
        if (user && !newUsersData[user.id]) {
          const name = await getUserData(user.id);
          newUsersData[user.id] = name;
        }
      }
      setUsersData(newUsersData);
    };
    if (results) {
      fetchUsersData();
    }
  }, [results]);

  const getUserData = async (id) => {
    const User = Parse.Object.extend("User");
    try {
      const query = new Parse.Query(User);
      const user = await query.get(id);
      return user.get("username");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Manage Orders</h2>
      <div className="new-order">
        <Input
          placeholder="Order Title"
          value={orderTitle}
          onChange={(e) => setOrderTitle(e.target.value)}
        />
        <Select value={orderStatus} onChange={(value) => setOrderStatus(value)}>
          <Option value="Pending">Pending</Option>
          <Option value="Processing">Processing</Option>
          <Option value="Completed">Completed</Option>
        </Select>
        <Button type="primary" onClick={addOrder}>
          Add Order
        </Button>
      </div>
      <div className="orders">
        {results &&
          results.map((order) => (
            <SingleOrder order={order} usersData={usersData} />
          ))}
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default Orders;
