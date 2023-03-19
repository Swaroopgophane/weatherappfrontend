import * as Yup from 'yup';


const signinSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(8).required("Please enter your password"),
   
});

export default signinSchema;

