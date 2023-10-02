import { useState } from 'react'

import { toast } from 'react-toastify'

import { Delete } from 'assets/icons'
import { useDeleteCardMutation } from 'services/cardsApi'
import { Button } from 'ui/button'
import { Modal } from 'ui/modal'
import { Typography } from 'ui/typography'

import s from './delete-card.module.scss'

type Props = {
  cardId: string
  question: string
}

export const DeleteCard = ({ cardId, question }: Props) => {
  const [deleteCard] = useDeleteCardMutation()
  const [modalMode, setModalMode] = useState<boolean>(false)

  const onDeleteCard = () => {
    deleteCard(cardId)
      .unwrap()
      .then(() => {
        setModalMode(false)
        toast.success('Успешно удалено')
      })
      .catch(err => {
        toast.error(err.data.message)
      })
  }
  const toggleModal = () => {
    setModalMode(!modalMode)
  }

  return (
    <>
      <div onClick={toggleModal}>
        <Delete />
      </div>
      <Modal title={'Delete Card'} open={modalMode} onClose={toggleModal}>
        <div className={s.descriptionContainer}>
          <Typography variant="body1">Do you really want to remove card</Typography>
          <Typography variant={'subtitle1'}> {question} </Typography>?
        </div>
        <div className={s.buttonContainer}>
          <Button variant={'secondary'} onClick={toggleModal}>
            Cancel
          </Button>
          <Button onClick={onDeleteCard} variant={'primary'}>
            Delete Card
          </Button>
        </div>
      </Modal>
    </>
  )
}
