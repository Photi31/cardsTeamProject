import { ChangeEvent, useState } from 'react'

import { toast } from 'react-toastify'

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
    createDecks(arg)
      .unwrap()
      .then(() => {
        setModalMode(false)
        setNewName('')
        toast.success('Успешно добавлено')
      })
      .catch(err => {
        toast.error(err.data.message)
      })
  }

  const createPackModal = () => {
    setModalMode(!modalMod)
  }

  const onClickCheked = () => {
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
          placeholder={'Create new name'}
        ></TextField>
        <Checkbox label={'Private pack'} checked={checked} onChange={onClickCheked} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
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
