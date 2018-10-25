import React,{Component}  from 'react';
import './signup.css';
import Button from '@material-ui/core/Button';
import { Formik, Field, Form } from 'formik';
import { LinearProgress,Checkbox } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

import classnames from 'classnames';
import firebase from 'firebase/app';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            step: 1,
            // email: '',
            // password: '',
            // phone_number: '',
            // terms: true
        };
        
        // this.handleInput = this.handleInput.bind(this);
        this.handleAuth = this.handleAuth.bind(this);
    }

    nextStep(e) {
        e.preventDefault();
        console.log(e.target.value)
        this.setState({ 
            step: 2,
             
         });
    }

    // handleInput(e){
    //     // const { value, name } = e.target;
    //     const target = e.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;
    //     this.setState({
    //         [name]: value
    //     })
    //     console.log(value)
    // }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged( user => {
           if (user) {
             this.user = user;
             this.userId = user.uid; 
           }
           console.log("userId: ", this.userId);
         });
       }
    
    handleAuth(e) {
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
    // handleSubmit(e){
    //     e.preventDefault();
    //     // const db = firebase.firestore();
    //     const db = firebase.firestore();
    //     let data = this.state;
    //     delete data.step;
    //     // Add a new document with a generated id.
    //     var newMedic = db.collection("medics").doc();
    //     // later...
    //     newMedic.set(data)
    //     console.log(data)
    // }
    
    
    render() {
        // interface Values {
        //     email: string;
        //   }
          const App = () => (
            
            <Formik
              initialValues={{ email: '', password: ''}}
              validate={values => {
                // const errors: Partial<Values> = {};
                console.log(values)
                const errors = {};
                if (!values.email) {
                  errors.email = 'Por favor llena todos los campos antes de continuar';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                }
                if (!values.first_name) {
                  errors.first_name = 'Por favor llena todos los campos antes de continuar';
                } else if (values.first_name.length <= 8){
                  errors.first_name = 'Formato Invalido. Por favor ingresa 8 digitos';
                }
                return errors;
              }}
              onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                  setSubmitting(false);
                  alert(JSON.stringify(values, null, 2));
                }, 500);
                console.log(this.state)
              }}
              render={({submitForm, isSubmitting, values}) => (
                <Form>
                  {this.state.step === 1 ? (
                    <div className="nz-signup-form-details">
                        <Field
                            type="text"
                            name="first_name"
                            variant="outlined"
                            className="nz-input"
                            placeholder="Nombre(s)"
                            label="Nombre(s)"
                            // onChange={this.handleInput}
                            component={TextField}
                        />
                        <Field
                            type="text"
                            name="last_name1"
                            variant="outlined"
                            className="nz-input"
                            placeholder="Primer apellido"
                            label="Primer apellido"
                            // onChange={this.handleInput}
                            component={TextField}
                        />
                        <Field
                            type="text"
                            name="last_name2"
                            variant="outlined"
                            className="nz-input"
                            placeholder="Segundo apellido"
                            label="Segundo apellido"
                            // onChange={this.handleInput}
                            component={TextField}
                        />
                        <Field
                            type="text"
                            name="birthdate"
                            variant="outlined"
                            className="nz-input"
                            placeholder="Fecha de nacimiento"
                            label="Fecha de nacimiento"
                            // onChange={this.handleInput}
                            component={TextField}
                        />
                        <Field
                            type="text"
                            name="professional_license"
                            variant="outlined"
                            className="nz-input"
                            placeholder="Cédula profesional"
                            label="Cédula profesional"
                            // onChange={this.handleInput}
                            component={TextField}
                        />
                        <button onClick={this.nextStep.bind(this)} className="nz-button primary">Continuar</button>
                    </div>) :
                    <div className="nz-signup-form-user"  >
                        <Field
                            type="text"
                            name="email"
                            variant="outlined"
                            className="nz-input"
                            placeholder="Correo electrónico"
                            label="Correo electrónico"
                            // onChange={this.handleInput}
                            // value={this.state.email}
                            component={TextField}
                        />
                        <Field
                            type="text"
                            name="password"
                            variant="outlined"
                            className="nz-input"
                            placeholder="Contraseña"
                            label="Contraseña"
                            // onChange={this.handleInput}
                            // value={this.state.password}
                            component={TextField}
                        />
                        <Field
                            type="text"
                            name="phone_number"
                            variant="outlined"
                            className="nz-input"
                            placeholder="Número telefónico"
                            label="Número telefónico"
                            // onChange={this.handleInput}
                            // value={this.state.phone_number}
                            component={TextField}
                        />
                        
                        <label>
                            <Checkbox
                                name="terms"
                                type="checkbox"
                                // checked={this.state.terms}
                                // onChange={this.handleInput} 
                                />                                    
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
                        <button type="submit" onClick={submitForm} className="nz-button primary">Ingresar</button>
                        {/* onClick={this.nextStep.bind(this)} */}
                    </div>
                    }
                <p>¿Ya tienes cuenta?<a>Inicia sesión</a></p>
                </Form>
              )}
            />
          );

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
                <App />
            </div>
        </div>
        );
    }
}

export default Signup;