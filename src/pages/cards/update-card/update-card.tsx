import { useState } from 'react'

import { toast } from 'react-toastify'

import { Redactor } from 'assets/icons'
import { useUpdateCardMutation } from 'services/cardsApi'
import { Modal } from 'ui/modal'

import { FormCard, FormType } from '../form-card'

type Props = {
  cardId: string
  question: string
  answer: string
  questionImg: string
  answerImg: string
}

export const UpdateCard = ({ cardId, question, answer, questionImg, answerImg }: Props) => {
  const [updateCard] = useUpdateCardMutation()
  const [modalMode, setModalMode] = useState<boolean>(false)

  const onUpdateCard = ({ question, answer, questionImg, answerImg }: FormType) => {
    setModalMode(false)

    const form = new FormData()

    form.append('question', question)
    form.append('answer', answer)

    if (typeof questionImg === 'string') {
      form.append('questionImg', '')
    } else {
      questionImg[0] && form.append('questionImg', questionImg[0])
    }

    if (typeof answerImg === 'string') {
      form.append('answerImg', '')
    } else {
      answerImg[0] && form.append('answerImg', answerImg[0])
    }

    updateCard({ cardId, body: form })
      .unwrap()
      .then(() => {
        setModalMode(false)
        toast.success('Сохранено')
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
      <div onClick={toggleModal}>
        <Redactor />
      </div>
      <Modal showCloseButton={true} title={'Edit card'} open={modalMode} onClose={toggleModal}>
        <FormCard
          onCancel={toggleModal}
          onSaveCard={onUpdateCard}
          question={question}
          answer={answer}
          questionImg={questionImg}
          answerImg={answerImg}
        />
      </Modal>
    </>
  )
}
