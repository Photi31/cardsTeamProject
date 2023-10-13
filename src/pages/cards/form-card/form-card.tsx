import { ChangeEvent, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ChangePhoto, Delete } from 'assets/icons'
import { Button } from 'ui/button'
import { ControlledTextField } from 'ui/controlled'
import { toBase64 } from 'utils/toBase64'

import s from './form-card.module.scss'

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

export type FormType = z.infer<typeof schema>

type Props = {
  onCancel: () => void
  onSaveCard: (formData: FormType) => void
  question?: string
  answer?: string
  questionImg?: string
  answerImg?: string
}

export const FormCard = (props: Props) => {
  const { question, answer, questionImg, answerImg, onCancel, onSaveCard } = props

  const questionInputRef = useRef<HTMLInputElement | null>(null)
  const answerInputRef = useRef<HTMLInputElement | null>(null)
  const [questionImgPreview, setQuestionImgPreview] = useState<string>(questionImg || '')
  const [answerImgPreview, setAnswerImgPreview] = useState<string>(answerImg || '')

  const { control, handleSubmit, register, setValue } = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      question: question || '',
      answer: answer || '',
    },
  })

  const onImgButtonClick = (ref: React.MutableRefObject<HTMLInputElement | null>) => {
    ref?.current?.click()
  }

  const onDeleteQestionImg = () => {
    setQuestionImgPreview('')
    setValue('questionImg', '')
  }

  const onDeleteAnswerImg = () => {
    setAnswerImgPreview('')
    setValue('answerImg', '')
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
    <form onSubmit={handleSubmit(onSaveCard)}>
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

      {questionImgPreview && (
        <Button
          variant="secondary"
          className={s.editImgButton}
          type="button"
          onClick={onDeleteQestionImg}
        >
          <Delete />
        </Button>
      )}

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

      {answerImgPreview && (
        <Button
          variant="secondary"
          className={s.editImgButton}
          type="button"
          onClick={onDeleteAnswerImg}
        >
          <Delete />
        </Button>
      )}

      {answerImgPreview && <img src={answerImgPreview} className={s.preview} />}

      <div className={s.buttonContainer}>
        <Button variant={'secondary'} onClick={onCancel} type={'reset'}>
          Cancel
        </Button>
        <Button variant={'primary'} type="submit">
          Create card
        </Button>
      </div>
    </form>
  )
}
