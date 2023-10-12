import { useState } from 'react'

import { toast } from 'react-toastify'

import { useCreateCardMutation } from 'services/decksApi'
import { Button } from 'ui/button'
import { Modal } from 'ui/modal'

import { FormCard, FormType } from '../form-card'

type Props = {
  deckId: string
}

export const CreateCard = ({ deckId }: Props) => {
  const [modalMode, setModalMode] = useState<boolean>(false)
  const [createCard] = useCreateCardMutation()

  const onCreateCard = ({ question, answer, questionImg, answerImg }: FormType) => {
    setModalMode(false)

    const form = new FormData()

    form.append('question', question)
    form.append('answer', answer)
    questionImg[0] && form.append('questionImg', questionImg[0])
    answerImg[0] && form.append('answerImg', answerImg[0])

    createCard({ deckId, body: form })
      .unwrap()
      .then(() => {
        toast.success('Добавлено')
      })
      .catch(err => {
        toast.error(err.data.message || err.data.errorMessages[0].message)
      })
  }

  const toggleModal = () => {
    setModalMode(!modalMode)
  }

  return (
    <>
      <Button onClick={toggleModal}>Add New Card</Button>
      <Modal showCloseButton={true} title={'Add new card'} open={modalMode} onClose={toggleModal}>
        <FormCard onCancel={toggleModal} onSaveCard={onCreateCard} />
      </Modal>
    </>
  )
}
