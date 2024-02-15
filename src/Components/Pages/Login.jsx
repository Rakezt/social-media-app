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
import { ClipLoader } from "react-spinners";
import { useAppContext } from "../Context/AppContext";
import { auth, onAuthStateChanged } from "../Firebase/Firebase";

const Login = () => {
  const { signInWithGoogle, loginWithEmailAndPassword } = useAppContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

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
    email: Yup.string().email("Invalid Email Address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Must be atleast 6 character long")
      .matches(/^[a-zA-Z]+$/, "Password can contain only letters"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formik.values;
    if (formik.isValid === true) {
      loginWithEmailAndPassword(email, password);
      setLoading(true);
    } else {
      setLoading(false);
      alert("Check your input fields");
    }
  };

  const formik = useFormik({ initialValues, validationSchema, handleSubmit });

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 h-screen justify-items-center items-center">
          <ClipLoader color="#3096ed" size={115} speedMultiplier={0.5} />
        </div>
      ) : (
        <div className="grid grid-cols-1 h-screen justify-items-center items-center">
          <Card className="w-96 ">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center "
            >
              <Typography variant="h3" color="white">
                Login
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
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
                    label="Password"
                    type="password"
                    name="password"
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
                <Button
                  variant="gradient"
                  color="blue"
                  fullWidth
                  className="mb-4 bg-blue-500"
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                variant="gradient"
                fullWidth
                color="blue"
                className="mb-4 bg-blue-500"
                onClick={signInWithGoogle}
              >
                Sign In With Google
              </Button>
              <Link to="/reset">
                <p
                  variant="small"
                  className="ml-1 font-bold font-roboto text-sm text-blue-500 text-center"
                >
                  Reset password
                </p>
              </Link>
              <div className="mt-6 flex items-center font-roboto text-base justify-center">
                Don't have an account?
                <Link to="/register">
                  <p
                    variant="small"
                    className="ml-1 font-bold font-roboto text-sm text-blue-500 text-center"
                  >
                    Register
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

export default Login;
