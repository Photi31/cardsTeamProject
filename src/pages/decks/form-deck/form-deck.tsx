import { ChangeEvent, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ChangePhoto } from 'assets/icons'
import { Button } from 'ui/button'
import { ControlledTextField } from 'ui/controlled'
import { ControlledCheckbox } from 'ui/controlled/controlled-checkbox.tsx'
import { toBase64 } from 'utils/toBase64'

import s from './form-deck.module.scss'

const schema = z.object({
  packName: z
    .string()
    .trim()
    .nonempty('Create name')
    .min(3, 'Pack must be at least 3 characters')
    .max(30, 'Pack must be maximum 30 characters'),
  isPrivate: z.boolean(),
  deckImg: z.any(),
})

export type FormDeckType = z.infer<typeof schema>

type Props = {
  onCancel: () => void
  onSaveDeck: (formData: FormDeckType) => void
  packName?: string
  isPrivate?: boolean
  deckImg?: string
}

export const FormDeck = (props: Props) => {
  const { onSaveDeck, packName, isPrivate, deckImg, onCancel } = props

  const packNameInputRef = useRef<HTMLInputElement | null>(null)
  const [decksImgPreview, setDecksImgPreview] = useState<string>(deckImg || '')
  const [isImageDeleted, setIsImageDeleted] = useState(false)

  const { control, handleSubmit, register } = useForm<FormDeckType>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      packName: packName || '',
      isPrivate: isPrivate,
    },
  })

  const onImgButtonClick = (ref: React.MutableRefObject<HTMLInputElement | null>) => {
    ref?.current?.click()
  }

  const onImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      setIsImageDeleted(true) // Устанавливаем флаг удаления фотографии

      return
    }

    toBase64(e.target.files[0])
      .then(img => {
        if (typeof img === 'string') {
          if (e.target.name === 'deckImg') {
            setDecksImgPreview(img)
          }
        }
      })
      .catch(() => {})
  }

  return (
    <form onSubmit={handleSubmit(onSaveDeck)}>
      <ControlledTextField
        placeholder={'Create name'}
        label={'Name pack'}
        name={'packName'}
        control={control}
        type="text"
      />

      <Button
        variant="secondary"
        className={s.editImgButton}
        type="button"
        onClick={() => onImgButtonClick(packNameInputRef)}
      >
        <ChangePhoto />
        <input
          type="file"
          className={s.inputFile}
          {...register('deckImg', { onChange: onImgChange })}
          ref={instance => {
            register('deckImg').ref(instance)
            packNameInputRef.current = instance
          }}
        />
      </Button>
      <Button onClick={() => setIsImageDeleted(true)}>Delete</Button>

      {decksImgPreview && !isImageDeleted && <img src={decksImgPreview} className={s.preview} />}

      <ControlledCheckbox
        checked={isPrivate}
        label={'Private pack'}
        name={'isPrivate'}
        control={control}
      />

      <div className={s.buttonContainer}>
        <Button variant={'secondary'} onClick={onCancel} type={'reset'}>
          Cancel
        </Button>
        <Button variant={'primary'} type="submit">
          Create pack
        </Button>
      </div>
    </form>
  )
}
