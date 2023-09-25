import { ChangeEvent, useState } from 'react'

import { toast } from 'react-toastify'

import { Redactor } from 'assets/icons'
import s from 'pages/decks/create-new-pack/create-new-pack.module.scss'
import { useUpdateDecksMutation } from 'services/decksApi'
import { UpdateDecksArgType } from 'services/decksApi/type.ts'
import { Button } from 'ui/button'
import { Checkbox } from 'ui/checkBox'
import { Modal } from 'ui/modal'
import { TextField } from 'ui/textField'

type Props = {
  id: string
  name: string
  isPrivate: boolean
}

export const UpdatePack = ({ id, name, isPrivate }: Props) => {
  const [updatePack] = useUpdateDecksMutation()
  const [modalMod, setModalMode] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(isPrivate)
  const [newName, setNewName] = useState<string>(name)

  const onUpdatePack = (arg: UpdateDecksArgType) => {
    const form = new FormData()

    form.append('name', arg.name!)
    form.append('isPrivate', String(arg.isPrivate))

    updatePack({ id: arg.id, body: arg.body })
      .unwrap()
      .then(() => {
        setModalMode(false)
        setNewName('')
        toast.success('Успешно добавлено')
      })
      .catch(err => {
        toast.error(err.data.errorMessages[0].message)
      })
  }

  const createPackModal = () => {
    setModalMode(!modalMod)
  }

  const onClickChecked = () => {
    setChecked(!checked)
  }

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value)
  }

  return (
    <>
      <Button variant="link" onClick={createPackModal}>
        <Redactor />
      </Button>
      <Modal showCloseButton={true} title={'Edit pack'} open={modalMod} onClose={createPackModal}>
        <TextField
          onChange={onChangeName}
          value={newName}
          type={'text'}
          label={'Name Pack'}
          placeholder={'Create new name'}
        />
        <Checkbox label={'Private pack'} checked={checked} onChange={onClickChecked} />
        <div className={s.buttonContainer}>
          <Button variant={'secondary'} onClick={createPackModal}>
            Cancel
          </Button>
          <Button
            variant={'primary'}
            onClick={() => onUpdatePack({ id, name: newName, isPrivate: isPrivate, cover: '' })}
          >
            Save
          </Button>
        </div>
      </Modal>
    </>
  )
}
