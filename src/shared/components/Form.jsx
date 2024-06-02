import React, { useEffect } from 'react';
import {
  FormProvider,
  useForm,
  useFormContext,
  useController,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SimpleButton from './SimpleButton';

const FormMain = ({ children, onSubmit, schema }) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
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

  const isDirty =
    Object.keys(dirtyFields).length >= dirtyFieldsCnt ? true : false;
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

  const isDirty =
    Object.keys(dirtyFields).length >= dirtyFieldsCnt ? true : false;
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
  isValidBaekjoonId = true,
}) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  const { field } = useController({
    name: errorName,
    control,
    defaultValue: value, // 초기 값 설정
  });

  useEffect(() => {
    setValue(errorName, value); // value 변경 시 업데이트
  }, [value, setValue, errorName]);

  const errMsg = errors[errorName]?.message;

  const borderStyle =
    errors[errorName] || !isValidBaekjoonId
      ? 'border-error-300'
      : 'border-gray-300';

  return (
    <>
      <input
        type={type}
        className={`w-full h-10 p-4 text-sm text-gray-900 border ${borderStyle} focus:outline-none rounded-lg`}
        placeholder={placeholder}
        value={field.value} // React Hook Form의 값 사용
        onKeyDown={handleKeyDown}
        onChange={e => {
          field.onChange(e);
          handleChangeValue(e);
        }} // 필드와 handleChangeValue 둘 다 호출
        onBlur={field.onBlur}
        ref={field.ref}
      />
      {errMsg && <span className="text-sm text-error-500">{errMsg}</span>}
      {!isValidBaekjoonId && (
        <span className="text-sm text-error-500">일치하는 ID가 없습니다</span>
      )}
    </>
  );
};

export const Form = Object.assign(FormMain, {
  Input: FormInput,
  NextButton: FormNextButton,
  SubmitButton: FormSumbitButton,
});
