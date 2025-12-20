export const endPoints = {
    auth:{
        login:`/api/auth/login`,
        register:`/api/auth/request-otp`,
        otp:`/api/auth/verify-otp`,
        resetemail: `/api/auth/reset-password-link`
    },
    student: {
        create: `/api/students`,
        details: `/api/students`,
        list:`/api/students/list`,
        update:`/api/students`,
        delete:`/api/students`
    }
}

export const points = [
    endPoints.auth.login,
  endPoints.auth.register,
  endPoints.auth.profile_details,
  endPoints.auth.otp,
  endPoints.student.details,
  endPoints.student.list,
  endPoints.student.delete
   /*  endPoints.auth.resetemail,
    endPoints.product.create,
  endPoints.product.list,
    endPoints.product.update_product */
]