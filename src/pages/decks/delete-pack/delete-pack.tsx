import { useState } from 'react'

import { toast } from 'react-toastify'

import { Delete } from 'assets/icons'
import { useDeleteDecksMutation } from 'services/decksApi'
import { DeleteDecksArgType } from 'services/decksApi/type.ts'
import { Button } from 'ui/button'
import { Modal } from 'ui/modal'
import { Typography } from 'ui/typography'

import s from './delete-pack.module.scss'

type Props = {
  id: string
  name: string
}
export const DeletePack = ({ id, name }: Props) => {
  const [deletePack] = useDeleteDecksMutation()
  const [modalMod, setModalMode] = useState<boolean>(false)

  const onDeletePack = (arg: DeleteDecksArgType) => {
    deletePack(arg)
      .unwrap()
      .then(() => {
        setModalMode(false)
        toast.success('Успешно удалено')
      })
      .catch(err => {
        toast.error(err.data.message)
      })
  }
  const deletePackModal = () => {
    setModalMode(!modalMod)
  }

  return (
    <>
      <Button onClick={deletePackModal} variant="link">
        <Delete />
      </Button>
      <Modal title={'Delete Pack'} open={modalMod} onClose={deletePackModal}>
        <div className={s.descriptionContainer}>
          <Typography variant="body1">Do you really want to remove pack</Typography>
          <Typography variant={'subtitle1'}> {name} </Typography>?
        </div>
        All cards will be deleted.
        <div className={s.buttonContainer}>
          <Button variant={'secondary'} onClick={deletePackModal}>
            Cancel
          </Button>
          <Button onClick={() => onDeletePack({ id })} variant={'primary'}>
            Delete Pack
          </Button>
        </div>
      </Modal>
    </>
  )
}
