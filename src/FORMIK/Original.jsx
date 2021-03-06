import React, { Component } from 'react';
import './signup.css';
import {TextField, FormControlLabel, Checkbox} from '@material-ui/core';
import { withFormik } from 'formik';
class Signup extends Component {
    constructor() {
        super();
        this.state = {
            step: 1
        }
    }

    nextStep(e) {
        e.preventDefault();
        this.setState({ step: 2 });
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
                                name="name"
                                variant="outlined"
                                className="nz-input"
                                placeholder="Nombre(s)"
                                label="Nombre(s)"
                            />
                            <TextField
                                type="text"
                                name="name"
                                variant="outlined"
                                className="nz-input"
                                placeholder="Primer apellido"
                                label="Primer apellido"
                            />
                            <TextField
                                type="text"
                                name="name"
                                variant="outlined"
                                className="nz-input"
                                placeholder="Segundo apellido"
                                label="Segundo apellido"
                            />
                            <TextField
                                type="text"
                                name="name"
                                variant="outlined"
                                className="nz-input"
                                placeholder="Fecha de nacimiento"
                                label="Fecha de nacimiento"
                            />
                            <TextField
                                type="text"
                                name="name"
                                variant="outlined"
                                className="nz-input"
                                placeholder="Cédula profesional"
                                label="Cédula profesional"
                            />
                            <button onClick={this.nextStep.bind(this)} className="nz-button primary">Continuar</button>
                        </form>) :
                        <form className="nz-signup-form-user">
                            <TextField
                                type="text"
                                name="name"
                                variant="outlined"
                                className="nz-input"
                                placeholder="Correo electrónico"
                                label="Correo electrónico"
                            />
                            <TextField
                                type="text"
                                name="name"
                                variant="outlined"
                                className="nz-input"
                                placeholder="Contraseña"
                                label="Contraseña"
                            />
                            <TextField
                                type="text"
                                name="name"
                                variant="outlined"
                                className="nz-input"
                                placeholder="Número telefónico"
                                label="Número telefónico"
                            />
                            <FormControlLabel
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
                            />
                            <button onClick={this.nextStep.bind(this)} className="nz-button primary">Ingresar</button>
                        </form>
                        }
                    <p>¿Ya tienes cuenta?<a>Inicia sesión</a></p>
                </div>
            </div>
        );
    }
}

export default Signup;