import React from "react";
// import { useLoaderData } from "react-router-dom";
import { AiFillInfoCircle, AiOutlineCloseCircle, AiFillDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const AllEmployee = () => {
//   const employees = useLoaderData();
const { data:employees, refetch } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('http://localhost:5000/employee').then(
        (res) => res.json(),
      ),
  })
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
                <th className="text-blue-500">{i+1}</th>
                <td>{ed.firstName}</td>
                <td>{ed.email}</td>
                <td className="flex gap-4">
                    <button className="shadow-xl flex items-center gap-2 border rounded-lg p-2">
                        <AiFillInfoCircle className="text-3xl text-green-500"/>
                        <span className="font-semibold">Info</span>
                    </button>
                    <button className="shadow-xl flex items-center gap-2 border rounded-lg p-2">
                        <AiOutlineCloseCircle className="text-3xl text-blue-500"/>
                        <span className="font-semibold">Block</span>
                    </button>
                    <button className="shadow-xl flex items-center gap-2 border rounded-lg p-2" onClick={()=> handleDelete(ed)}>
                        <AiFillDelete className="text-3xl text-red-500"/>
                        <span className="font-semibold">Delete</span>
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployee;
