import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import { auth, onAuthStateChanged } from "../Firebase/Firebase";
import { useAppContext } from "../Context/AppContext";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const initialValues = { name: "", email: "", password: "" };
  const navigate = useNavigate();
  const { registerWithEmailAndPassword } = useAppContext();

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Required")
      .min(4, "Must be atleast 4 characters long")
      .matches(/^[a-zA-Z]+$/, "Name can contain only letters"),
    email: Yup.string().email("Invalid Email Address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Must be atleast 6 character long")
      .matches(/^[a-zA-Z]+$/, "Password can contain only letters"),
  });
  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, password } = formik.values;
    if (formik.isValid === true) {
      registerWithEmailAndPassword(name, email, password);
      setLoading(true);
    } else {
      setLoading(false);
      alert("Check input fields");
    }
    console.log(formik, "formik");
  };

  const formik = useFormik({ initialValues, validationSchema, handleRegister });

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 justify-items-center items-center h-screen">
          <ClipLoader color="#3096ed" size={115} speedMultiplier={0.5} />
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-items-center items-center h-screen">
          <Card className="w-96">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                REGISTER
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <form onSubmit={handleRegister}>
                <div className="mb-2">
                  <Input
                    name="name"
                    type="text"
                    label="Name"
                    size="lg"
                    {...formik.getFieldProps("name")}
                  />
                </div>
                <div>
                  {formik.touched.name && formik.errors.name && (
                    <Typography variant="small" color="red">
                      {formik.errors.name}
                    </Typography>
                  )}
                </div>
                <div className="mt-4 mb-2">
                  <Input
                    name="email"
                    type="email"
                    label="Email"
                    size="lg"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                <div>
                  {formik.touched.email && formik.errors.email && (
                    <Typography variant="small" color="red">
                      {formik.errors.email}
                    </Typography>
                  )}
                </div>
                <div className="mt-4 mb-2">
                  <Input
                    name="password"
                    type="password"
                    label="Password"
                    size="lg"
                    {...formik.getFieldProps("password")}
                  />
                </div>
                <div>
                  {formik.touched.password && formik.errors.password && (
                    <Typography variant="small" color="red">
                      {formik.errors.password}
                    </Typography>
                  )}
                </div>
                <Button variant="gradient" color="blue" fullWidth type="submit">
                  Sign Up
                </Button>
              </form>
            </CardBody>
            <CardFooter className="pt-0">
              <div className="mt-6 flex font-roboto text-base justify-center">
                Already have an account
                <Link to="/login">
                  <p className="ml-1 font-bold font-roboto text-base text-blue-500 text-center">
                    Login
                  </p>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Register;
