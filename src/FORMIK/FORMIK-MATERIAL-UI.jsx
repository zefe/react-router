import React, { Component } from 'react';
import './signup.css';
import {TextField, FormControlLabel, Checkbox} from '@material-ui/core';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import firebase from 'firebase/app';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            step: 1,
        };
        
        this.handleInput = this.handleInput.bind(this);
        // this.signUp = this.signUp.bind(this);
    }

    nextStep(e) {
        e.preventDefault();
        this.setState({ 
            step: 2 
         });
    }

    handleInput(e){
        // const { value, name } = e.target;
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
        console.log(value)
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged( user => {
           if (user) {
             this.user = user;
             this.userId = user.uid; 
           }
           console.log("userId: ", this.userId);
         });
       }
    
       signUp(e) {
        e.preventDefault();
        let data = this.state;
        delete data.step;

        firebase
        .auth()
        .createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
        .then(function(result){
            console.log(`${result.user.uid} ha iniciado sesión`)            
            const db = firebase.firestore();
            // Add a new document with a generated id.
            db.collection("medics").doc(result.user.uid).set(data);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
    }
    
    render() {
        return (
            <div className="nz-signup-container">
                <div className="nz-signup-container-column">
                    <h1>Nubuz</h1>
                    <ul>
                        <li>Obtén un <b>expediente</b> clínico electrónico</li>
                        <li>Facilita la <b>comunicación</b> con tus pacientes</li>
                        <li>Lleva tu <b>agenda de citas</b> y recibe notificaciones</li>
                    </ul>
                </div>
                <div className="nz-signup-container-column nz-signup-form-container">
                    {this.state.step === 1 ? (
                        <form className="nz-signup-form-details">
                            <TextField
                                type="text"
                                name="first_name"
                                variant="outlined"
                                className="nz-input"
                                placeholder="Nombre(s)"
                                label="Nombre(s)"
                                onChange={this.handleInput}
                            />
                            <TextField
                                type="text"
                                name="last_name1"
                                variant="outlined"
                                className="nz-input"
                                placeholder="Primer apellido"
                                label="Primer apellido"
                                onChange={this.handleInput}
                            />
                            <TextField
                                type="text"
                                name="last_name2"
                                variant="outlined"
                                className="nz-input"
                                placeholder="Segundo apellido"
                                label="Segundo apellido"
                                onChange={this.handleInput}
                            />
                            <TextField
                                type="text"
                                name="birthdate"
                                variant="outlined"
                                className="nz-input"
                                placeholder="Fecha de nacimiento"
                                label="Fecha de nacimiento"
                                onChange={this.handleInput}
                            />
                            <TextField
                                type="text"
                                name="professional_license"
                                variant="outlined"
                                className="nz-input"
                                placeholder="Cédula profesional"
                                label="Cédula profesional"
                                onChange={this.handleInput}
                            />
                            <button onClick={this.nextStep.bind(this)} className="nz-button primary">Continuar</button>
                        </form>) :
                        <form className="nz-signup-form-user"  >
                            <TextField
                                type="text"
                                name="email"
                                variant="outlined"
                                className="nz-input"
                                placeholder="Correo electrónico"
                                label="Correo electrónico"
                                onChange={this.handleInput}
                            />
                            <TextField
                                type="text"
                                name="password"
                                variant="outlined"
                                className="nz-input"
                                placeholder="Contraseña"
                                label="Contraseña"
                                onChange={this.handleInput}
                            />
                            <TextField
                                type="text"
                                name="phone_number"
                                variant="outlined"
                                className="nz-input"
                                placeholder="Número telefónico"
                                label="Número telefónico"
                                onChange={this.handleInput}
                            />
                            
                            <label>
                                <Checkbox
                                    name="terms"
                                    type="checkbox"
                                    checked={this.state.terms}
                                    onChange={this.handleInput} />                                    
                                Aceptar términos y condiciones:
                            </label>
                            
                            {/* <FormControlLabel
                                control={
                                    <Checkbox
                                        // checked={this.state.checkedG}
                                        // onChange={this.handleChange('checkedG')}
                                        // value="checkedG"
                                        // classes={{
                                        //     root: classes.root,
                                        //     checked: classes.checked,
                                        // }}
                                    />
                                }
                                label="Aceptar términos y condiciones"
                            /> */}
                            <button type="submit" onClick={this.signUp.bind(this)} className="nz-button primary">Ingresar</button>
                            {/* onClick={this.nextStep.bind(this)} */}
                        </form>
                        }
                    <p>¿Ya tienes cuenta?<a>Inicia sesión</a></p>
                </div>
            </div>
        );
    }
}

export default Signup;