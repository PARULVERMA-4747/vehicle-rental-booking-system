import React, { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const useForm = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({});
    const updateForm = (field, value) => {
        setFormData((prev) => ({...prev, [field]: value }));
    };
    return ( <
        FormContext.Provider value = {
            { formData, updateForm } } > { children } <
        /FormContext.Provider>
    );
};