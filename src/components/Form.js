import React, { useEffect, useState } from "react";
import { states } from "../assets/States_and_districts";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import "./Form.css";

function Form() {
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    state: "",
    district: "",
    captcha: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [num1, setNum1] = React.useState(2);
  const [num2, setNum2] = React.useState(5);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleStateChange = (event, newValue) => {
    formValues.state = newValue;
    if (newValue) {
      setDistricts(states.find((ct) => ct.state === newValue).districts);
    } else {
      setDistricts([]);
    }
  };

  const handleDistrictChange = (event, newValue) => {
    formValues.district = newValue;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log(formValues);
  };

  const validate = (values) => {
    const errors = {};

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const mbregex = /^\d+$/;
    const nmregex = /^[a-zA-Z]+$/;

    if (!values.firstname) {
      errors.firstname = "*First Name is required!";
    } else if (!nmregex.test(values.firstname)) {
      errors.firstname = "*Please enter a valid First Name!";
    }

    if (!values.lastname) {
      errors.lastname = "*Last name is required!";
    } else if (!nmregex.test(values.lastname)) {
      errors.lastname = "*Please enter a valid Last Name!";
    }

    if (!values.email) {
      errors.email = "*Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "*Please enter a valid Email ID!";
    }

    if (!values.mobile) {
      errors.mobile = "*Mobile is required!";
    } else if (values.mobile.length !== 10 || !mbregex.test(values.mobile)) {
      errors.mobile = "*Please enter a valid Mobile number!";
    }

    if (!values.state) {
      errors.state = "*State is required!";
    }

    if (!values.district) {
      errors.district = "*District is required!";
    }

    if (!values.captcha) {
      errors.captcha = "*Captcha is required!";
    } else if (Number(values.captcha) !== Number(num1 + num2)) {
      errors.captcha = "*Please enter a valid Captcha!";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    const cap1 = Math.floor(Math.random() * 100);
    setNum1(cap1);
    const cap2 = Math.floor(Math.random() * 100);
    setNum2(cap2);
  }, [formErrors, isSubmit]);

  return (
    <div className="form">
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              X
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Your Data Submitted Successfully!
        </Alert>
      </Collapse>
      <div className="hd">
        <h1>Enquiry form</h1>
      </div>
      <div className="row">
        <div className="field">
          <TextField
            id="outlined-basic"
            label="First Name*"
            variant="outlined"
            name="firstname"
            value={formValues.firstname}
            onChange={handleChange}
          />
          <FormHelperText id="component-error-text" sx={{ color: "red" }}>
            {formErrors.firstname}
          </FormHelperText>
        </div>
        <div className="field">
          <TextField
            id="outlined-basic"
            label="Last Name*"
            variant="outlined"
            name="lastname"
            value={formValues.lastname}
            onChange={handleChange}
          />
          <FormHelperText id="component-error-text" sx={{ color: "red" }}>
            {formErrors.lastname}
          </FormHelperText>
        </div>
      </div>
      <div className="row">
        <div className="field">
          <TextField
            id="outlined-basic"
            label="Mobile*"
            variant="outlined"
            name="mobile"
            value={formValues.mobile}
            onChange={handleChange}
          />
          <FormHelperText id="component-error-text" sx={{ color: "red" }}>
            {formErrors.mobile}
          </FormHelperText>
        </div>
        <div className="field">
          <TextField
            id="outlined-basic"
            label="Email*"
            variant="outlined"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          <FormHelperText id="component-error-text" sx={{ color: "red" }}>
            {formErrors.email}
          </FormHelperText>
        </div>
      </div>
      <div className="row">
        <div className="field">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            name="state"
            value={formValues.state}
            options={states.map((option) => option.state)}
            onChange={handleStateChange}
            sx={{ width: 225 }}
            renderInput={(params) => (
              <TextField {...params} label="Select State" />
            )}
          />
          <FormHelperText id="component-error-text" sx={{ color: "red" }}>
            {formErrors.state}
          </FormHelperText>
        </div>
        <div className="field">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            name="state"
            value={formValues.district}
            disabled={districts.length === 0}
            options={districts.map((option) => option)}
            onChange={handleDistrictChange}
            sx={{ width: 225 }}
            renderInput={(params) => (
              <TextField {...params} label="Select District" />
            )}
          />
          <FormHelperText id="component-error-text" sx={{ color: "red" }}>
            {formErrors.district}
          </FormHelperText>
        </div>
      </div>
      <div className="captcha">
        <div className="field" style={{ color: "blue" }}>
          <div>Captcha*</div>
          <div className="capval">
            {num1} + {num2}{" "}
          </div>
        </div>
        <div className="capfield">
          <TextField
            id="outlined-basic"
            placeholder="Enter Addition"
            variant="outlined"
            value={formValues.captcha}
            name="captcha"
            onChange={handleChange}
          />
          <FormHelperText id="component-error-text" sx={{ color: "red" }}>
            {formErrors.captcha}
          </FormHelperText>
        </div>
      </div>
      <div className="btn">
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Form;
