import React,{Component}  from 'react';
import './signup.css';
import Button from '@material-ui/core/Button';
import { Formik, Field, Form } from 'formik';
import { LinearProgress,Checkbox } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import  moment from 'moment';

import classnames from 'classnames';
import firebase from 'firebase/app';

import Step1 from '../steps/step1';
import Step2 from '../steps/step2';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
        step: 0,
    };
  }
  

  nextStep = () => this.setState(state => ({step: state.step+1}))

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged( user => {
       if (user) { 
         this.user = user;
         this.userId = user.uid; 
       }
       console.log("userId: ", this.userId);
     });
   }

  // handleInput(e){
  //   // const { value, name } = e.target;
  //   const target = e.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;
  //   this.setState({
  //       [name]: value
  //   })
  //   console.log(value)
  // }

  render() {
    const steps = [<Step1/>, <Step2/>];
    // const firestore = firebase.firestore();
    // const settings = {/* your settings... */ timestampsInSnapshots: true};
    // firestore.settings(settings);

    const dateTime = new Date().getTime();
    const timestamp = Math.floor(dateTime / 1000);

    return (
      <Formik 
        
        initialValues={{
          first_name: 'zeferinot',
          last_name1: 'torres',
          last_name2: 'hernandez',
          birthdate: '14/15/85',
          professional_license: '8989898989898',
          email: '',
          password: '123464879545',
          phone_number: '336655889956',
          create_at: timestamp
        }}
        validate={values => {
          // const errors: Partial<Values> = {};
          const errors = {};
          const emptyError = 'Por favor llena todos los campos antes de continuar';              
          if (!values.first_name) {
            errors.first_name = emptyError;
          }
          if (!values.last_name1) {
            errors.last_name1 = emptyError;
          }
          if (!values.last_name2) {
            errors.last_name2 = emptyError;
          }
          if (!values.birthdate) {
            errors.birthdate = emptyError;
          }
          if (!values.professional_license) {
            errors.professional_license = emptyError;
          }
          if (!values.professional_license) {
            errors.professional_license = emptyError;
          } else if (values.professional_license.length <= 8){
            errors.professional_license = 'Formato Inválido. Por favor ingresa 8 dígitos';
          }
          if (!values.email) {
            errors.email = emptyError;
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = 'Por favor utiliza un formato de correo válido, por ejemplo: correo@ejemplo.com';
          }
          if (!values.password) {
            errors.password = emptyError;
          } else if (values.password.length <= 7  || values.password.length >= 15 ){
            errors.password = 'Por seguridad la contraseña debe tener entre 8 y 16 caracteres alfanuméricos';
          }
          if (!values.phone_number) {
            errors.phone_number = emptyError;
          } else if (values.phone_number.length <= 9 ){
            errors.phone_number = 'Formato Inválido. Por favor ingresa 10 dígitos';
          }
          return errors;
        }} 
        onSubmit={(values, { setSubmitting, setErrors }) => {          
          console.log(values);
          firebase
          .auth()
          .createUserAndRetrieveDataWithEmailAndPassword(values.email, values.password)
          .then(function(result){
            console.log(`${result.user.uid} ha iniciado sesión`)
            const db = firebase.firestore();
            // Add a new document with a generated id.
            db.collection("medics").doc(result.user.uid).set(values);
          })
          .catch(function(error) {
            //Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/email-already-in-use') {
                setErrors({ email: 'Este correo ya se encuentra registrado en Nubuz' });
            } else {
                console.log(errorMessage);
            }
          });

          console.log(values)
          console.log(this.state)
          // this.setState({step: 0})
          
        }}
      >
        {() => (
          <Form>
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
                  {steps[this.state.step]}
                  {
                    this.state.step === 0 ? (
                      <button type="submit"  onClick={ this.nextStep } className="nz-button primary">
                      Continuar
                      </button>
                    ) : (
                      <button type="submit" className="nz-button primary">
                      Ingresar
                      </button>
                    )
                    }
              </div>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}

export default Signup;