import Parse from "parse";
import { Select } from "antd";

const { Option } = Select;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const SingleOrder = ({ order, usersData }) => {
  const lastUpdateUser = usersData[order.get("user").id];

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const Order = Parse.Object.extend("Order");
      const query = new Parse.Query(Order);
      const updatedOrder = await query.get(id);
      updatedOrder.set("status", newStatus);
      updatedOrder.set("user", Parse.User.current());

      await updatedOrder.save();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div key={order.id} className="order">
      <h3>{order.get("title")}</h3>
      <p>Last update by: {lastUpdateUser}</p>
      <p>Time: {formatDate(order.get("createdAt"))}</p>
      <Select
        value={order.get("status")}
        onChange={(value) => updateOrderStatus(order.id, value)}
      >
        <Option value="Pending">Pending</Option>
        <Option value="Processing">Processing</Option>
        <Option value="Completed">Completed</Option>
      </Select>
    </div>
  );
};

export default SingleOrder;
