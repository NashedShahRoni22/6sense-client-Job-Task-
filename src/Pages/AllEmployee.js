import React from "react";
import { useLoaderData } from "react-router-dom";
import { AiFillInfoCircle, AiOutlineCloseCircle, AiFillDelete } from "react-icons/ai";

const AllEmployee = () => {
  const employees = useLoaderData();
  return (
    <div className="container mx-auto">
      <h1 className="text-xl text-center mt-5 font-bold text-blue-600">
        Total Employee {employees?.length}
      </h1>
      <div className="overflow-x-auto mt-5">
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
            {employees?.map((e, i) => (
              <tr key={e._id}>
                <th className="text-blue-500">{i+1}</th>
                <td>{e.firstName}</td>
                <td>{e.email}</td>
                <td className="flex gap-4">
                    <button>
                        <AiFillInfoCircle className="text-3xl text-green-500"/>
                    </button>
                    <button>
                        <AiOutlineCloseCircle className="text-3xl text-blue-500"/>
                    </button>
                    <button>
                        <AiFillDelete className="text-3xl text-red-500"/>
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
