import React from 'react';
import { FieldRenderProps } from "react-final-form";
import { DateTimePicker } from 'react-widgets';
import { Form, FormFieldProps, Label } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<Date, HTMLElement>,
    FormFieldProps {}

const DateInput: React.FC<IProps> = ({
  date = false,
  input,
  messages,
  width,
  placeholder,
  time = false,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <DateTimePicker
        date={date}
        messages={messages}
        onChange={input.onChange}
        placeholder={placeholder}
        time={time}
        value={input.value || null}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  )
}

export default DateInput;