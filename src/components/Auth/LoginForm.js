import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-root-toast';
import useAuth from '../../hooks/useAuth';
import { loginApi } from '../../api/user';
import { formStyle } from '../../styles';

export default function LoginForm(props) {

    const { changeForm } = props;

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {

            setLoading(true);

            try {

                const response = await loginApi(formData);

                if (response.statusCode) throw "Error en el usuario o contraseña";

                setLoading(false);
                login(response);

            } catch (error) {
                setLoading(false);
                Toast.show(error, {
                    position: Toast.positions.CENTER,
                });
            }            
        }
    });

    return (
        <>
            <TextInput
                label='Email o Username'
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue('identifier', text)}
                value={formik.values.identifier}
                error={formik.errors.identifier}
            />
            <TextInput
                label='Contraseña'
                secureTextEntry
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue('password', text)}
                value={formik.values.password}
                error={formik.errors.password}
            />
            <Button
                mode='contained'
                style={formStyle.btnSucess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Entrar
            </Button>
            <Button
                style={formStyle.btnText}
                labelStyle={formStyle.btnTextLabel}
                mode='text'
                onPress={changeForm}
            >
                Registrarse
            </Button>
        </>
    )
}

function initialValues() {
    return {
        identifier: '',
        password: ''
    }
}

function validationSchema() {
    return {
        identifier: Yup.string().required(true),
        password: Yup.string().required(true)
    }
}