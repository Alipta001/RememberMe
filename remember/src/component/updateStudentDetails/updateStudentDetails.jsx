import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from '../../css/updateStudentDetailsCss/updateStudentDetails.module.css'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AxiosInstance from "../../api/axios/axios";
import { endPoints } from "../../api/endPoints/endPoints";
import { useParams } from "react-router-dom";


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


export default function UpdateStudentDetails({ onClose}) {
  const[data,setData] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({resolver:yupResolver(schema)});
  useEffect(() => {
  if (data && data.admissionDate) {
    const formattedDate = data.admissionDate.split("T")[0];
    reset({
      name: data.name,
      class: data.class,
      phone: data.phone,
      school: data.schoolName,
      admissionDate: formattedDate,
      address: data.address
    });
  }
}, [data, reset]);
  const {id}= useParams()
  const getData = async() =>{
    try{
      const response = await AxiosInstance.get(`${endPoints.student.details}/${id}`)
      console.log(response.data.data);
      setData(response.data.data)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getData();
  },[])

  const updateStudent =  async(data) => {
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
    const response = await AxiosInstance.put(
  `${endPoints.student.update}/${id}`,
  studentData,
  {
    headers: {
      "x-auth-token": sessionStorage.getItem("token"),
    },
  }
);

    console.log(response)
    if(response.status===200)
    alert("✅ Student updated successfully!");
    /* window.location.reload(); */

    window.dispatchEvent(new Event("student-updated"));

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







<div className={styles.editOverlay}>
  <div className={styles.editModal}>
    
    {/* Header */}
    <div className={styles.editHeader}>
      <h3 className={styles.editTitle}>Update Student Details</h3>
      <button className={styles.editClose} onClick={onClose}>✕</button>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit(updateStudent)} className={styles.editForm}>
      
      <div className={styles.editGroup}>
        <label className={styles.editLabel}>Name</label>
        <input className={styles.editInput} {...register("name")}/>
        {errors.name && <p className={styles.editError}>{errors.name.message}</p>}
      </div>

      <div className={styles.editGroup}>
        <label className={styles.editLabel}>Class</label>
        <input className={styles.editInput} {...register("class")} />
        {errors.class && <p className={styles.editError}>{errors.class.message}</p>}
      </div>

      <div className={styles.editGroup}>
        <label className={styles.editLabel}>Phone Number</label>
        <input className={styles.editInput} {...register("phone")} />
        {errors.phone && <p className={styles.editError}>{errors.phone.message}</p>}
      </div>

      <div className={styles.editGroup}>
        <label className={styles.editLabel}>School</label>
        <input className={styles.editInput} {...register("school")} />
        {errors.school && <p className={styles.editError}>{errors.school.message}</p>}
      </div>

      <div className={styles.editGroup}>
        <label className={styles.editLabel}>Admission Date</label>
        <input type="date" className={styles.editInput} {...register("admissionDate")} />
        {errors.admissionDate && (
          <p className={styles.editError}>{errors.admissionDate.message}</p>
        )}
      </div>

      <div className={styles.editGroup}>
        <label className={styles.editLabel}>Address</label>
        <input className={styles.editInput} {...register("address")} />
        {errors.address && <p className={styles.editError}>{errors.address.message}</p>}
      </div>

      {/* Actions */}
      <div className={styles.editActions}>
        <button className={styles.updateBtn} type="submit">Update</button>
        <button className={styles.cancelBtn} type="button" onClick={onClose}>
          Cancel
        </button>
      </div>

    </form>
  </div>
</div>


  );
}
