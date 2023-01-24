import React from "react";
import { toast } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateEmployee = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  //handle update details
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const phoneNumber = form.phoneNumber.value;
    const ud = { firstName, lastName, phoneNumber };
    fetch(`http://localhost:5000/updateEmployee/${data._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ud),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`${data.firstName} Updated successfully!`);
          navigate("/allEmployee");
        }
      });
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-xl text-center mt-5 font-bold text-blue-600">
        Update Employee
      </h1>
      <form
        onSubmit={handleUpdate}
        className="my-10 mx-5 shadow-xl rounded-xl p-8"
      >
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 w-full">
            <span>Employee Email</span>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              defaultValue={data.email}
              disabled
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span>First Name</span>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              defaultValue={data.firstName}
              name="firstName"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span>Last Name</span>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              defaultValue={data.lastName}
              name="lastName"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <span>Phone Number</span>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              defaultValue={data.phoneNumber}
              name="phoneNumber"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-5">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
