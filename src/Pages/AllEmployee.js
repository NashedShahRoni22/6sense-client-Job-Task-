import React, { useState } from "react";
import {
  AiFillInfoCircle,
  AiOutlineCloseCircle,
  AiFillDelete,
} from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const AllEmployee = () => {
  //employee details
  const [details, setDetails] = useState("");
  //react query to fetch data
  const { data: employees, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("http://localhost:5000/employee").then((res) => res.json()),
  });
  //delete an employee
  const handleDelete = (ed) => {
    const sure = window.confirm(`Do want to delete ${ed.firstName}?`);
    if (sure) {
      fetch(`http://localhost:5000/employee/${ed._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.error(`${ed.firstName} deleted successfully!`);
            refetch();
          }
        });
    }
  };
  //block an employee
  const handleBlock = (ed) => {
    fetch(`http://localhost:5000/blockEmployee/${ed._id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success(`${ed.firstName} blocked!`);
          refetch();
        }
      });
  };
  //unblock an employee
  const handleUnBlock = (ed) => {
    fetch(`http://localhost:5000/unblockEmployee/${ed._id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success(`${ed.firstName} unblocked!`);
          refetch();
        }
      });
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-xl text-center mt-5 font-bold text-blue-600">
        Total Employee {employees?.length}
      </h1>
      <div className="overflow-x-auto mt-5 shadow-xl">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((ed, i) => (
              <tr key={ed._id}>
                <th className="text-blue-500">{i + 1}</th>
                <td>{ed.firstName}</td>
                <td>{ed.email}</td>
                <td className="flex gap-4">
                  <label
                    onClick={() => setDetails(ed)}
                    htmlFor="my-modal"
                    className="cursor-pointer shadow-xl flex items-center gap-2 border rounded-lg p-2"
                  >
                    <AiFillInfoCircle className="text-3xl text-green-500" />
                    <span className="font-semibold">Details</span>
                  </label>
                  {ed.isBlock ? (
                    <button
                      onClick={() => handleUnBlock(ed)}
                      className="shadow-xl flex items-center gap-2 border rounded-lg p-2"
                    >
                      <AiOutlineCloseCircle className="text-3xl text-blue-500" />
                      <span className="font-semibold">Unblock</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlock(ed)}
                      className="shadow-xl flex items-center gap-2 border rounded-lg p-2"
                    >
                      <AiOutlineCloseCircle className="text-3xl text-red-500" />
                      <span className="font-semibold">Block</span>
                    </button>
                  )}

                  <button
                    className="shadow-xl flex items-center gap-2 border rounded-lg p-2"
                    onClick={() => handleDelete(ed)}
                  >
                    <AiFillDelete className="text-3xl text-red-500" />
                    <span className="font-semibold">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Employee Detailsb */}
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h1 className="text-xl font-bold text-blue-500">
              Employee Details
            </h1>
            <p className="py-4 font-semibold">
              Name: {details.firstName} {details.lastName} <br />
              Email: {details.email} <br />
              Phone Number: {details.phoneNumber}
            </p>
            <div className="modal-action">
              <Link to={`/allEmployee/${details._id}`} className="btn btn-sm btn-primary">Update</Link>
              <label htmlFor="my-modal" className="btn btn-sm btn-error">
                x
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEmployee;
