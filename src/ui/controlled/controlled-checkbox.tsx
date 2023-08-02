import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Checkbox, CheckboxProps } from 'ui/checkBox'

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'rules' | 'defaultValue'> &
  Omit<CheckboxProps, 'onChange' | 'value'>

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  name,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    shouldUnregister,
  })

  const handelChange = onChange as (value: boolean) => void

  return (
    <div>
      <Checkbox {...rest} onChange={handelChange} checked={value} />
    </div>
  )
}
