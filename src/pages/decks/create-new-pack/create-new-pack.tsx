import { ChangeEvent, useState } from 'react'

import { toast } from 'react-toastify'

import s from 'pages/decks/create-new-pack/create-new-pack.module.scss'
import { useCreateDecksMutation } from 'services/decksApi'
import { CreateDecksArgType } from 'services/decksApi/type.ts'
import { Button } from 'ui/button'
import { Checkbox } from 'ui/checkBox'
import { Modal } from 'ui/modal'
import { TextField } from 'ui/textField'

export const CreateNewPack = () => {
  const [createDecks] = useCreateDecksMutation()
  const [modalMod, setModalMode] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  const [newName, setNewName] = useState<string>('')
  const onCreateDecks = (arg: CreateDecksArgType) => {
    const form = new FormData()

    form.append('name', arg.name)
    form.append('isPrivate', String(arg.isPrivate))
    // form.append('cover', arg.cover[0]!)

    createDecks(form)
      .unwrap()
      .then(() => {
        setModalMode(false)
        setChecked(false)
        setNewName('')
        toast.success('Успешно добавлено')
      })
      .catch(err => {
        toast.error(err.data.field)
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
      <Button onClick={createPackModal}>Add New Pack</Button>
      <Modal
        showCloseButton={true}
        title={'Add new pack'}
        open={modalMod}
        onClose={createPackModal}
      >
        <TextField
          onChange={onChangeName}
          value={newName}
          type={'text'}
          label={'Name pack'}
          placeholder={'Create name'}
        />
        <Checkbox label={'Private pack'} checked={checked} onChange={onClickChecked} />
        <div className={s.buttonContainer}>
          <Button variant={'secondary'} onClick={createPackModal}>
            Cancel
          </Button>
          <Button
            variant={'primary'}
            onClick={() => onCreateDecks({ name: newName, isPrivate: checked, cover: '' })}
          >
            Create pack
          </Button>
        </div>
      </Modal>
    </>
  )
}
