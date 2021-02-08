import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

export default function Form() {

    //declare initial state
    const initialFormState = {
        name: "",
        email: "",
        password: "",
        terms: ""
    };

    //declare users state

    const [users, setUsers] = useState([{}]);

    //temporary state used to set state
    const [post, setPost] = useState([]);

    //server error
    const [serverError, setServerError] = useState("");

    //managing state for form inputs
    const [formState, setFormState] = useState(initialFormState);

    //control whether or not the form can be submitted if if there are errors in form validation
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    //managing state for errors, empty unless inline validation (validateInput) updates key/value pair to have error
    const [errors, setErrors] = useState(initialFormState);

    //schema used for all validation to determine whether the input is valid or not
    const formSchema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup
        .string()
        .email("Must be a vailid email")
        .required(),
        password: yup.string().required("Please enter a valid password"),
        terms: yup.boolean().oneOf([true], "Please check")
    })

    // inline validation, validating one key/value pair

    const validateChange = e => {
        yup
        //get the value of schema at key "e.value.name" -> "name="
        .reach(formSchema, e.target.name)
        //value in input
        .validate(e.target.value)
        .then(valid => {
            //if passing validation, clear errors
            setErrors({...errors, [e.target.name]: ""})
        })
        .catch(error => {
            //if failing validation, set error in state
            console.log("error", error);
            setErrors({...errors, [e.target.name]: error.errors[0]})
        })
    };

    //whenever state updates, validate the entire form. if valid, then change the button to be enabled

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            console.log("valid?", valid)
            setIsButtonDisabled(!valid)
        });
    },[formState]);
    

    //onSubmit function

    const formSubmit = e => {
        e.preventDefault();

        //send out POST request with object as second param (formState)

        axios
        .post('https://reqres.in/api/users', formState)
        .then(response => {
            //update temp state with value to display
            setPost(response.data);
            setUsers([response.data, ...users])

            //clear state
            setFormState({
                name: "",
                email: "",
                password: "",
                terms: ""
              });

            //clear any server error
            setServerError(null);
        })
        .catch(error => {
            setServerError("Some error happened")
        });
    };

    //onChange function

    const inputChange = e => {
        e.persist();
        const newformData = {
            ...formState,
            [e.target.name]:
                e.target.type === "checkbox" ?e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newformData);  
    };
console.log(users)
    return(
        <form onSubmit={formSubmit}>
            {serverError ? <p className="error">{serverError}
            </p> : null}
            <label htmlFor="name">
                Name
                <input
                    id="name"
                    type="text"
                    name="name"
                    onChange={inputChange}
                    value={formState.name}
                />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>
            <br/>
            <label htmlFor="email">
                Email
                <input
                    id="email"
                    type="text"
                    name="email"
                    onChange={inputChange}
                    value={formState.email}
                />
                {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
            </label>
            <label htmlFor="password">
                Password
                <input
                    id="password"
                    type="text"
                    name="password"
                    onChange={inputChange}
                    value={formState.password}
                />
                {errors.password.length > 0 ? (
          <p className="error">{errors.password}</p>) : null}
            </label>
            <label htmlFor="terms" className="terms">
                <input 
                type="checkbox"
                name="terms"
                checked={formState.terms}
                onChange={inputChange}
                />
                Terms & Conditions
            </label>
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button  id="submit" disabled={isButtonDisabled} type="submit">
                Submit
            </button>
            
        </form>
    )
}