import { useState, useEffect } from 'react';

const useValidation = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (validate[name]) {
      setErrors({ ...errors, [name]: validate[name](value) });
    }
  };

  const handleSubmit = async (e, callback) => {
    e.preventDefault();
    const validationErrors = {};
    Object.keys(values).forEach((key) => {
      const error = validate[key](values[key]);
      if (error) validationErrors[key] = error;
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await callback();
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return { values, errors, handleChange, handleSubmit, isSubmitting };
};

export default useValidation;
