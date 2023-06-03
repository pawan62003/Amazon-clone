import React, { useContext, useState } from "react";
import { Box, Text, Input, Button, Img } from "@chakra-ui/react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import REACTLOGO from "./amaze.png";
import { useToast } from '@chakra-ui/react'
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const toast = useToast()
  const navigate = useNavigate()
  

  const handleSubmit = () => {
    const payload = { email, password };
    if(email===""||password===""){
      alert("please fill all cradiantial")
    }
    else{

    fetch("https://grumpy-goat-singlet.cyclic.app/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDY0NzhkZmU2OTlkODgxODE5NWZkZjUiLCJhZG1pbklEIjoiNjQ2NDc4ZGZlNjk5ZDg4MTgxOTVmZGY1IiwiaWF0IjoxNjg1NzI3Njg2fQ.I8CZxLN4FH9dkuOL-HyIpN1d0_Qd8hJwg4zfpoxMVb4');
        console.log(data)
        setStatus(data.message);
        login(data.token);
        setEmail("");
        setPassword("");
        toast({
          title: 'You are loged in.',
          description: "We've login your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        navigate("/")
      })
      .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {/* <DarkModeButton /> */}
      <Box mb={"20px"}>
        {/* <Img margin={"auto"} borderRadius={"50%"} mt={"10px"} width={"70px"} src={REACTLOGO} /> */}
        <Box
          textAlign={"center"}
          margin={"auto"}
          mt={"100px"}
          pb={"25px"}
          width={"340px"}
          borderRadius="10px"
          // height={"390px"}
          boxShadow={
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;"
          }
          border={"1px solid rgb(255,255,255)"}
        >
          <Text
            textAlign={"start"}
            fontSize="30px"
            m={"10px 25px "}
            paddingTop="5px"
          >
            Sign in
          </Text>

          <Input
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            mt="5px"
            borderRadius="10px"
            pl={"8px"}
            placeholder="Email"
            border={"1px solid grey"}
            height={"32px"}
            width={"85%"}
          ></Input>
          <Input
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            borderRadius="10px"
            mt={"10px"}
            pl={"8px"}
            placeholder="Password"
            border={"1px solid grey"}
            height={"32px"}
            width={"85%"}
          ></Input>
          <Button
            _hover={{ bg: "yellow.400" }}
            onClick={handleSubmit}
            mt="10px"
            color="black"
            border={"0px"}
            borderRadius="10px"
            height={"32px"}
            background={"rgb(255,216,20)"}
            width="85%"
          >
            Continue
          </Button>
          <Box>
            <Text
              margin={"auto"}
              color="gray"
              fontSize="13px"
              width={"83.5%"}
              mt={"15px"}
              mb="10px"
              textAlign={"left"}
              // paddingTop="20px"
            >
              By continuing, you agree to Amaze's Conditions of Use and Privacy
              Notice.
            </Text>
            <Text
              margin={"auto"}
              fontWeight={500}
              fontSize="13px"
              width={"83.5%"}
              mt={"15px"}
              mb="10px"
              textAlign={"left"}
              // paddingTop="20px"
            >
              Create your Amaze account?
              <Link to={"/signup"}>
                <Button color={"blue"} fontSize={"13px"} variant={"link"}>
                  Sign up
                </Button>
              </Link>
            </Text>
            {status && <h3>{status}</h3>}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
