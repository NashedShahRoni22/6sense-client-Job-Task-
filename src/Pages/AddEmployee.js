import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddEmployee = () => {
  //Add an employee
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.fName.value;
    const lastName = form.lName.value;
    const email = form.email.value;
    const phoneNumber = form.pNumber.value;
    axios({
      method: "post",
      url: "http://localhost:5000/employee",
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
      },
    }).then(res => {
      if(res.data.acknowledged){
        toast.success("Employee Added!");
        form.reset();
      };
    }).catch(e =>{
      console.log(e);
    })
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <h1 className="text-xl text-center mt-5 font-bold text-blue-600">
          Add Employe Information
        </h1>
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              name="fName"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              name="lName"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="number"
              placeholder="Phone Number"
              name="pNumber"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
