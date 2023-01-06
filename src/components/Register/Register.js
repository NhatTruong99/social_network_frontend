import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Link } from "react-router-dom";
import LocationService from "../../services/location.serivce";
import AuthService from "../../services/auth.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const Register = ({setIsRegistered}) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [address, setAddress] = useState("");

    const [provinceSelected,setProvinceSelected] = useState("");
    const [districtSelected,setDistrictSelected] = useState("");
    const [wardSelected,setWardSelected] = useState("");

    const [provincesList,setProvincesList] = useState([])
    const [districtsList,setDistrictsList] = useState([])
    const [wardsList,setWardLists] = useState([])

    const [provinceLabel,setProvinceLabel] = useState(true)
    const [districtLabel,setDistrictLabel] = useState(true)
    const [wardLabel,setWardLabel] = useState(true)

 

    
    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeAddress = (e) => {
        const address = e.target.value;
        setAddress(address);
    };
    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
        AuthService.register(username, email, password).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
        );}
    };

    useEffect(() => {
        getAllProvinces()
    }, []);


    const handleSelectProvinces = (e) => {
        setProvinceSelected(e.target.value)
        getDistricts(e.target.value)
    }

    const handleSelectDistrict = (e) => {
        setDistrictSelected(e.target.value)
        getWards(e.target.value)
    }

    const handleSelectWards = (e) => {
        setWardSelected(e.target.value)
       
    }

    const getAllProvinces = async () => {
        LocationService.getAllProvinces().then((res) => {
            setProvincesList(res.data)
        })
    }
     
    const getDistricts = async (province_code) => {
        LocationService.getDistricts(province_code).then((res) => {
            setDistrictsList(res.data)
        })
    }
     
    const getWards = async (district_code) => {
        LocationService.getWards(district_code).then((res) => {
            setWardLists(res.data)
        })
    }

 
    return (
        <>
            <h2 className="log-title">Register</h2>
            <Form onSubmit={handleRegister} ref={form}>
                <div className="form-group">	
                    <label className="control-label" htmlFor="username">Username</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required, vusername]}
                    />
                </div>

                <div className="form-group">	
                    <label className="control-label" htmlFor="email">Email</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        validations={[required, validEmail]}
                    />
                </div>
                <div className="form-group">	
                    <label className="control-label" htmlFor="password">Password</label>
                    <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required, vpassword]}
                    />
                </div>

                <div className="form-group">	
                <select name="province" 
                value={provinceSelected} 
                onChange={(e) => handleSelectProvinces(e)}
                placeholder="Select your province"
                
                >

                        {
                            provincesList && provincesList.map( 
                                (item) =>
                                
                                <option value={item.code} key={item.code}> {item.fullName}</option>
                            )
                           
                        }
                        
                </select>


             
                </div>

                {
                    provinceSelected?
                    <div className="form-group">
                    <select name="district" 
                    value={districtSelected} 
                    onChange={(e) => handleSelectDistrict(e)}
                    placeholder="Select your district"
                    
                    >
                    {
                     
                        districtsList && districtsList.map( 
                        (item) =>
                        <option value={item.code} key={item.code}> {item.fullName}</option>
                        )
                       
                    }
                    
                     </select>
                    </div>
                    :<div className="form-group">
                    <select name="district" disabled={true}
                    placeholder="Select your district">
                        
                    </select>
                   </div>
                   
                }
               
               {
                    districtSelected?
                    <div className="form-group">
                    <select name="ward" 
                    value={wardSelected} 
                    onChange={(e) => handleSelectWards(e)}
                    placeholder="Select your ward"
                    

                    >
                    {
                        
                        wardsList && wardsList.map( 
                        (item) =>
                        
                        <option value={item.code} key={item.code}> {item.fullName}</option>
                        ) 
                    }
                    
                     </select>
                    </div>
                    :<div className="form-group">
                    <select name="ward" disabled={true}
                    placeholder="Select your ward">
                        
                    </select>
                   </div>
                   
                }
                {
                    wardSelected? <div className="form-group">	
                    <label className="control-label" htmlFor="address">Address</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="address"
                        value={address}
                        onChange={onChangeAddress}
                        validations={[required, validEmail]}
                    />
                </div>
                :<div></div>
                }
                
                <Link onClick={()=> setIsRegistered(prev =>!prev) }>Already have an account</Link>
                <div className="submit-btns">
                    <button className="mtr-btn signup" type="button"><span>Register</span></button>
                </div>
                {
                    message && (
                            <div className="form-group">
                                <div
                                    className={
                                    successful ? "alert alert-success" : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {message}
                                </div>
                            </div>
                        )
                    }
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>    
        </>
    );
};

export default Register;
