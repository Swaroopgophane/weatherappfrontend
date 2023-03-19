import * as Yup from 'yup';

const phoneRegExp = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

const signupSchema = Yup.object({
    name: Yup.string().min(3).max(30).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Please enter your phone"),
    password: Yup.string().min(8).required("Please enter your password"),
    cpassword: Yup.string().required("Please enter the confirm password").oneOf([Yup.ref("password"), null], "Password and confirm password should be same"),
});

export default signupSchema;

