import { ChangeEvent, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { ChangePhoto } from 'assets/icons'
import { useCreateCardMutation } from 'services/decksApi'
import { Button } from 'ui/button'
import { ControlledTextField } from 'ui/controlled'
import { Modal } from 'ui/modal'
import { toBase64 } from 'utils/toBase64'

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
  questionImg: z.any(),
  answerImg: z.any(),
})

type FormType = z.infer<typeof schema>

type Props = {
  deckId: string
}

export const CreateCard = ({ deckId }: Props) => {
  const questionInputRef = useRef<HTMLInputElement | null>(null)
  const answerInputRef = useRef<HTMLInputElement | null>(null)
  const [modalMode, setModalMode] = useState<boolean>(false)
  const [questionImgPreview, setQuestionImgPreview] = useState<string>('')
  const [answerImgPreview, setAnswerImgPreview] = useState<string>('')
  const [createCard] = useCreateCardMutation()

  const { control, handleSubmit, reset, register } = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      question: '',
      answer: '',
    },
  })

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
      .finally(() => {
        reset()
      })
  }

  const toggleModal = () => {
    setModalMode(!modalMode)
    reset()
    setQuestionImgPreview('')
    setAnswerImgPreview('')
  }

  const onImgButtonClick = (ref: React.MutableRefObject<HTMLInputElement | null>) => {
    ref?.current?.click()
  }

  const onImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    toBase64(e.target.files[0])
      .then(img => {
        if (typeof img === 'string') {
          if (e.target.name === 'questionImg') {
            setQuestionImgPreview(img)
          } else {
            setAnswerImgPreview(img)
          }
        }
      })
      .catch(() => {})
  }

  return (
    <>
      <Button onClick={toggleModal}>Add New Card</Button>
      <Modal showCloseButton={true} title={'Add new card'} open={modalMode} onClose={toggleModal}>
        <form onSubmit={handleSubmit(onCreateCard)}>
          <ControlledTextField
            placeholder={'Question'}
            label={'Question'}
            name={'question'}
            control={control}
            type="text"
          />

          <Button
            variant="secondary"
            className={s.editImgButton}
            type="button"
            onClick={() => onImgButtonClick(questionInputRef)}
          >
            <ChangePhoto />
            <input
              type="file"
              className={s.inputFile}
              {...register('questionImg', { onChange: onImgChange })}
              ref={instance => {
                register('questionImg').ref(instance)
                questionInputRef.current = instance
              }}
            />
          </Button>

          {questionImgPreview && <img src={questionImgPreview} className={s.preview} />}

          <ControlledTextField
            placeholder={'Answer'}
            label={'Answer'}
            name={'answer'}
            control={control}
            type="text"
          />

          <Button
            variant="secondary"
            className={s.editImgButton}
            type="button"
            onClick={() => onImgButtonClick(answerInputRef)}
          >
            <ChangePhoto />
            <input
              type="file"
              className={s.inputFile}
              {...register('answerImg', { onChange: onImgChange })}
              ref={instance => {
                register('answerImg').ref(instance)
                answerInputRef.current = instance
              }}
            />
          </Button>

          {answerImgPreview && <img src={answerImgPreview} className={s.preview} />}

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
