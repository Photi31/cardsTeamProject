import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { useCreateCardMutation } from 'services/decksApi'
import { Button } from 'ui/button'
import { ControlledTextField } from 'ui/controlled'
import { Modal } from 'ui/modal'

import s from './create-card.module.scss'

const schema = z.object({
  question: z
    .string()
    .trim()
    .nonempty('Enter question')
    .min(3, 'Question must be at least 3 characters')
    .max(500, 'Question must be maximum 500 characters'),
  answer: z
    .string()
    .trim()
    .nonempty('Enter answer')
    .min(3, 'Answer must be at least 3 characters')
    .max(500, 'Answer must be maximum 500 characters'),
})

type FormType = z.infer<typeof schema>

type Props = {
  deckId: string
}

export const CreateCard = ({ deckId }: Props) => {
  const [modalMode, setModalMode] = useState<boolean>(false)
  const [createCard] = useCreateCardMutation()

  const { control, handleSubmit, reset } = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      question: '',
      answer: '',
    },
  })

  const onCreateCard = ({ question, answer }: FormType) => {
    setModalMode(false)
    reset()

    createCard({ deckId, question, answer })
      .unwrap()
      .then(() => {
        toast.success('Добавлено')
      })
      .catch(err => {
        toast.error(err.data.errorMessages[0].message)
      })
  }

  const toggleModal = () => {
    setModalMode(!modalMode)
    reset()
  }

  const handleFormSubmitted = handleSubmit(onCreateCard)

  return (
    <>
      <Button onClick={toggleModal}>Add New Card</Button>
      <Modal showCloseButton={true} title={'Add new card'} open={modalMode} onClose={toggleModal}>
        <form onSubmit={handleFormSubmitted}>
          <ControlledTextField
            placeholder={'Question'}
            label={'Question'}
            name={'question'}
            control={control}
            type="text"
          />

          <ControlledTextField
            placeholder={'Answer'}
            label={'Answer'}
            name={'answer'}
            control={control}
            type="text"
          />

          <div className={s.buttonContainer}>
            <Button variant={'secondary'} onClick={toggleModal}>
              Cancel
            </Button>
            <Button variant={'primary'} type="submit">
              Create card
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
