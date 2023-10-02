import { ChangeEvent, useState } from 'react'

import { toast } from 'react-toastify'

import { Redactor } from 'assets/icons'
import s from 'pages/decks/create-new-pack/create-new-pack.module.scss'
import { useUpdateCardMutation } from 'services/cardsApi'
import { Button } from 'ui/button'
import { Modal } from 'ui/modal'
import { TextField } from 'ui/textField'

type Props = {
  cardId: string
  question: string
  answer: string
}

export const UpdateCard = ({ cardId, question, answer }: Props) => {
  const [updateCard] = useUpdateCardMutation()
  const [modalMode, setModalMode] = useState<boolean>(false)
  const [newQuestion, setNewQuestion] = useState<string>(question)
  const [newAnswer, setNewAnswer] = useState<string>(answer)

  const onUpdateCard = () => {
    updateCard({ cardId, question: newQuestion, answer: newAnswer })
      .unwrap()
      .then(() => {
        setModalMode(false)
        toast.success('Сохранено')
      })
      .catch(err => {
        toast.error(err.data.errorMessages[0].message)
      })
  }

  const toggleModal = () => {
    setModalMode(!modalMode)
  }

  const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setNewQuestion(e.currentTarget.value)
  }

  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setNewAnswer(e.currentTarget.value)
  }

  return (
    <>
      <div onClick={toggleModal}>
        <Redactor />
      </div>
      <Modal showCloseButton={true} title={'Edit card'} open={modalMode} onClose={toggleModal}>
        <TextField
          onChange={onChangeQuestion}
          value={newQuestion}
          type={'text'}
          label={'Question'}
          placeholder={'Question'}
        />

        <TextField
          onChange={onChangeAnswer}
          value={newAnswer}
          type={'text'}
          label={'Answer'}
          placeholder={'Answer'}
        />

        <div className={s.buttonContainer}>
          <Button variant={'secondary'} onClick={toggleModal}>
            Cancel
          </Button>
          <Button variant={'primary'} onClick={onUpdateCard}>
            Save
          </Button>
        </div>
      </Modal>
    </>
  )
}
