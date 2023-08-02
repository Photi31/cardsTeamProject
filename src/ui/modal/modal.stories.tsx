import { useEffect, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Button } from 'ui/button'
import { Checkbox } from 'ui/checkBox'
import { Modal } from 'ui/modal/modal.tsx'
import { RadioGroup } from 'ui/radio-group'
import { TextField } from 'ui/textField'
import { Typography } from 'ui/typography'

import s from './modalS.module.scss'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Defualt: Story = {
  render: args => {
    const [open, setOpen] = useState<boolean>(args.open)
    const [checked, setChecked] = useState<boolean>(false)

    useEffect(() => {
      setOpen(args.open)
    }, [args.open])
    const createPack = () => {
      setOpen(!open)
    }

    const onClickCheked = () => {
      setChecked(!checked)
    }

    return (
      <>
        <Button variant={'primary'} onClick={() => createPack()}>
          Create new pack
        </Button>
        <Modal {...args} open={open} onClose={() => createPack()}>
          <TextField type={'text'} label={'Name pack'} placeholder={'Create new name'}></TextField>
          <Checkbox label={'Private pack'} checked={checked} onChange={() => onClickCheked()} />
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button variant={'primary'} onClick={() => createPack()}>
              Create pack
            </Button>
          </div>
        </Modal>
      </>
    )
  },

  args: { title: 'Add New Pack', open: false, showCloseButton: true },
}

export const QuestionCrads: Story = {
  render: args => {
    const [open, setOpen] = useState<boolean>(args.open)

    useEffect(() => {
      setOpen(args.open)
    }, [args.open])
    const createPack = () => {
      setOpen(!open)
    }

    return (
      <>
        <Button variant={'primary'} onClick={() => createPack()}>
          Learn pack
        </Button>
        <Modal
          {...args}
          open={open}
          onClose={() => createPack()}
          className={s.questionCardContainer}
        >
          <div className={s.questionCK}>
            <Typography variant={'subtitle1'} className={s.storiesQuestion}>
              Question: <Typography variant={'body1'}>{`How 'This' works in JS?`}</Typography>
            </Typography>
            <Typography color={'inherit'} variant={'subtitle2'}>
              Количество попыток ответов на вопрос 10
            </Typography>
          </div>
          <Typography variant={'subtitle1'} className={s.storiesQuestionBar}>
            Answer: <Typography variant={'body1'}>{`This is how 'This' works in JS?`}</Typography>
          </Typography>
          <Typography color={'primary'} variant={'subtitle1'}>
            Rate yourself:
            <RadioGroup groupName={'cardQuestion'} options={['Hello', 'Yes', 'No']}></RadioGroup>
          </Typography>
          <Button
            fullWidth={true}
            variant={'primary'}
            onClick={() => createPack()}
            className={s.buttonS}
          >
            Next Question
          </Button>
        </Modal>
      </>
    )
  },

  args: { title: "Learn 'Pack Name'", open: true, showCloseButton: false, size: 'sm' },
}
