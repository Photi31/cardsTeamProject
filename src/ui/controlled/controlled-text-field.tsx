import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { TextField, TextFieldType } from 'ui/textField'

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'rules' | 'defaultValue'> &
  Omit<TextFieldType, 'onChange' | 'value'>
export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  ...rest
}: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control })

  return <TextField {...field} placeholder={''} {...rest} errorMessage={error?.message} />
}
