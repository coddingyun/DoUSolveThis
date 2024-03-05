import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SimpleButton from './SimpleButton';

const FormMain = ({ children, onSubmit, schema }) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

const FormNextButton = ({ title, dirtyFieldsCnt, onClick }) => {
  const {
    formState: { errors, dirtyFields },
  } = useFormContext(); // TODO. useFormState로 변경해보기

  console.log(dirtyFieldsCnt)
  
  const isDirty = Object.keys(dirtyFields).length === dirtyFieldsCnt ? true : false;
  const isValid = Object.keys(errors).length ? false : true;

  return (
    <SimpleButton
      title={title}
      onClick={onClick}
      isDisabled={!isDirty || !isValid}
    />
  );
};

const FormSumbitButton = ({ title, dirtyFieldsCnt, onClick }) => {
  const {
    formState: { errors, dirtyFields },
  } = useFormContext(); // TODO. useFormState로 변경해보기

  const isDirty = Object.keys(dirtyFields).length === dirtyFieldsCnt ? true : false;
  const isValid = Object.keys(errors).length ? false : true;

  return (
    <SimpleButton
      type="submit"
      title={title}
      onClick={onClick}
      isDisabled={!isDirty || !isValid}
    />
  );
};

const FormInput = ({
  type = 'text',
  placeholder,
  value,
  handleChangeValue,
  handleKeyDown,
  errorName,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errMsg = errors[errorName]?.message;

  const borderStyle = errors[errorName]
    ? 'border-error-300'
    : 'border-gray-300';

  return (
    <>
      <input
        type={type}
        className={`w-full h-10 p-4 text-sm text-gray-900 border ${borderStyle} focus:outline-none rounded-lg`}
        placeholder={placeholder}
        value={value}
        onKeyDown={handleKeyDown}
        {...register(errorName, {required: true, onChange: handleChangeValue})}
      />
      {errMsg && (
        <span className="text-sm text-error-500">{errMsg}</span>
      )}
    </>
  );
};

export const Form = Object.assign(FormMain, {
  Input: FormInput,
  NextButton: FormNextButton,
  SubmitButton: FormSumbitButton,
});
