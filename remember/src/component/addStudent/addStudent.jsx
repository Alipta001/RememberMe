import React from "react";
import { useForm } from "react-hook-form";
import "../../css/addStudentCss/addStudent.css"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AxiosInstance from "../../api/axios/axios";
import { endPoints } from "../../api/endPoints/endPoints";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string()
  .required("Name is required")
  .min(3, "Minimum 3 letters required"),

  class: yup.string()
  .required("class is required"),

  phone: yup.string()
  .required("Phone Number is required")
  .min(10, "OOPS!! Less than 10 digits"),

  school: yup.string()
  .required("School is required")
  .min(3, "Minimum 3 letters required"),

  /* admissionDate: yup.date()
  .required("Admission date is required"), */
  admissionDate: yup
  .date()
  .nullable()
  .transform((curr, orig) => (orig === "" ? null : curr))
  .required("Admission date is required"),

  address: yup.string()
  .required("Address is required")
  
})


export default function AddStudent({ onClose}) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver:yupResolver(schema)});

  const addStudent =  async(data) => {
    /* addStudent(data) */
    const studentData = {
  name: data.name,
  class: data.class,
  schoolName: data.school,
  phone: data.phone,
  address: data.address,
  admissionDate: data.admissionDate
}
  try{
    const response = await AxiosInstance.post(
  endPoints.student.create,
  studentData,
  {
    headers: {
      "x-auth-token": sessionStorage.getItem("token"),
    },
  }
);

    console.log(response)
    if(response.status===201)
    alert("✅ Student added successfully!");
    /* window.location.reload(); */

    window.dispatchEvent(new Event("student-added"));

} catch (error) {
  if (error.response && error.response.status === 409) {
    alert(error.response.data.msg);
  } else {
    alert("Something went wrong");
  }

  }
  // 5️⃣ Optional: Close the modal or reset form
  if (onClose) onClose();
  }


  return (
   /*  <div>
      <h5>Add Student Form</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" placeholder="Enter name" {...register("name", {required: true, minLength: 3})} />
          {errors.name && (<span style={{ color: "red" }}>{errors.name.message}</span>)}
        </div>
        <div className="mb-3">
          <label>Class</label>
          <input type="text" className="form-control" placeholder="Enter Class" {...register("class", {required: true})}/>
          {errors.class && (<span style={{ color: "red" }}>{errors.class.message}</span>)}
        </div>
        <div className="mb-3">
          <label>Phone Number</label>
          <input type="text" className="form-control" placeholder="Enter name" {...register("phone", {required: true, minLength: 10})} />
          {errors.phone && (<span style={{ color: "red" }}>{errors.phone.message}</span>)}
        </div>
        <div className="mb-3">
          <label>School</label>
          <input type="text" className="form-control" placeholder="Enter School" {...register("school", {required: true})} />
          {errors.school && (<span style={{ color: "red" }}>{errors.school.message}</span>)}
        </div>
        <div className="mb-3">
          <input type="date" className="form-control"  {...register("admissionDate", {required: true})}/>
          {errors.admissionDate && (<span style={{ color: "red" }}>{errors.admissionDate.message}</span>)}
        </div>
        <div className="mb-3">
          <label>Address</label>
          <input type="text" className="form-control" placeholder="Enter Address"  {...register("address", {required: true})}/>
          {errors.address && (<span style={{ color: "red" }}>{errors.address.message}</span>)}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={onClose}
        >
          Close
        </button>
      </form>
    </div> */








     <div className="luxury-modal-overlay">
      <div className="luxury-modal">
        <div className="modal-header">
          <h3 className="modal-title">Add New Student</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(addStudent)} className="modal-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Enter name" {...register("name")} />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label>Class</label>
            <input type="text" placeholder="Enter class" {...register("class")} />
            {errors.class && <p className="error">{errors.class.message}</p>}
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="number" placeholder="Enter phone number" {...register("phone")} />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </div>

          <div className="form-group">
            <label>School</label>
            <input type="text" placeholder="Enter school" {...register("school")} />
            {errors.school && <p className="error">{errors.school.message}</p>}
          </div>

          <div className="form-group">
            <label>Admission Date</label>
            <input type="date" {...register("admissionDate")} />
            {errors.admissionDate && (
              <p className="error">{errors.admissionDate.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" placeholder="Enter address" {...register("address")} />
            {errors.address && <p className="error">{errors.address.message}</p>}
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn-save">
              Save Student
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
