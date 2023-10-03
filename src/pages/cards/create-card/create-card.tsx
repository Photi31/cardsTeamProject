import { ChangeEvent, useState } from 'react'

import { toast } from 'react-toastify'

import { useCreateCardMutation } from 'services/decksApi'
import { Button } from 'ui/button'
import { Modal } from 'ui/modal'
import { TextField } from 'ui/textField'

import s from './create-card.module.scss'

type Props = {
  deckId: string
}

export const CreateCard = ({ deckId }: Props) => {
  const [modalMode, setModalMode] = useState<boolean>(false)
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [createCard] = useCreateCardMutation()

  const onCreateCard = () => {
    setModalMode(false)

    createCard({ deckId, question, answer })
      .unwrap()
      .then(() => {
        setQuestion('')
        setAnswer('')
        toast.success('Добавлено')
      })
      .catch(err => {
        toast.error(err.data.errorMessages[0].message)
      })
  }

  const toggleModal = () => {
    setModalMode(!modalMode)
  }

  const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value)
  }

  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value)
  }

  return (
    <>
      <Button onClick={toggleModal}>Add New Card</Button>
      <Modal showCloseButton={true} title={'Add new card'} open={modalMode} onClose={toggleModal}>
        <TextField
          onChange={onChangeQuestion}
          value={question}
          type={'text'}
          label={'Question'}
          placeholder={'Question'}
        />

        <TextField
          onChange={onChangeAnswer}
          value={answer}
          type={'text'}
          label={'Answer'}
          placeholder={'Answer'}
        />

        <div className={s.buttonContainer}>
          <Button variant={'secondary'} onClick={toggleModal}>
            Cancel
          </Button>
          <Button variant={'primary'} onClick={onCreateCard}>
            Create card
          </Button>
        </div>
      </Modal>
    </>
  )
}
