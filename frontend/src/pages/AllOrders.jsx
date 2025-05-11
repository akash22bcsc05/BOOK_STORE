import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { FaUser, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState([]);
  const [options, setOptions] = useState(-1);
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-orders",
          { headers }
        );
        setAllOrders(response.data.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []); 

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v1/update-order-status/${orderId}`,
        { status: newStatus },
        { headers }
      );
      setAllOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <>
      {!AllOrders.length ? (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[33%] text-center">Sr.</div>
            <div className="w-[40%] md:w-[22%] text-center">Books</div>
            <div className="w-0 md:w-[45%] hidden md:block text-center">Description</div>
            <div className="w-[17%] md:w-[9%] text-center">Price</div>
            <div className="w-[30%] md:w-[16%]">Status</div>
            <div className="w-[10%] md:w-[5%]">
              <FaUser />
            </div>
          </div>

          {AllOrders.map((item, index) => (
            <div
              key={item._id || index}
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300"
            >
              <div className="w-[3%] text-center">{index + 1}</div>
              <div className="w-[40%] md:w-[22%]">
                <Link
                  to={`/view-book-details/${item.book_id}`}
                  className="hover:text-blue-300"
                >
                  {item.book.title}
                </Link>
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                <h1>{item.book.desc.slice(0, 50)} ...</h1>
              </div>
              <div className="w-[17%] md:w-[9%]">{item.book.price}/-</div>
              <div className="w-[30%] md:w-[16%]">
                <button
                  className="hover:scale-105 transition-all duration-300"
                  onClick={() => setOptions(index)}
                >
                  {item.status === "Order placed" ? (
                    <div className="text-yellow-500">{item.status}</div>
                  ) : item.status === "Cancelled" ? (
                    <div className="text-red-500">{item.status}</div>
                  ) : (
                    <div className="text-green-500">{item.status}</div>
                  )}
                </button>
                <div className={`${options === index ? "flex" : "hidden"}`}>
                  <select
                    name="status"
                    className="bg-gray-800"
                    value={item.status}
                    onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  >
                    {["Order Placed", "Out for Delivery", "Delivered", "Cancelled"].map(
                      (status, i) => (
                        <option value={status} key={i}>
                          {status}
                        </option>
                      )
                    )}
                  </select>
                  <button className="text-green-500 hover:text-pink-600 mx-2">
                    <FaCheck />
                  </button>
                </div>
              </div>
              <div className="w-[10%] md:w-[5%]">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setUserDiv("fixed");
                    setUserDivData(item.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      
      {userDiv === "fixed" && userDivData && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50">
          <div className="relative w-96 bg-white p-4 m-auto rounded">
            <h2>User Details</h2>
            <p>Name: {userDivData.name}</p>
            <p>Email: {userDivData.email}</p>
            <button onClick={() => setUserDiv("hidden")}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AllOrders;
