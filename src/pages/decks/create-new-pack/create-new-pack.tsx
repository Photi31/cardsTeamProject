import { useState } from 'react'

import { toast } from 'react-toastify'

import { FormDeck, FormDeckType } from 'pages/decks/form-deck/form-deck.tsx'
import { useCreateDecksMutation } from 'services/decksApi'
import { Button } from 'ui/button'
import { Modal } from 'ui/modal'

export const CreateNewPack = () => {
  const [createDecks] = useCreateDecksMutation()
  const [modalMod, setModalMode] = useState<boolean>(false)
  // const [checked, setChecked] = useState<boolean>(false)

  const onCreateDecks = ({ isPrivate, packName, deckImg }: FormDeckType) => {
    setModalMode(false)

    const form = new FormData()

    form.append('name', packName)
    form.append('isPrivate', String(isPrivate))
    deckImg[0] && form.append('cover', deckImg[0])

    createDecks(form)
      .unwrap()
      .then(() => {
        toast.success('Успешно добавлено')
      })
      .catch(err => {
        toast.error(err.data.message || err.data.errorMessages[0].message)
      })
  }

  const createPackModal = () => {
    setModalMode(!modalMod)
  }

  return (
    <>
      <Button onClick={createPackModal}>Add New Pack</Button>
      <Modal
        showCloseButton={true}
        title={'Add new pack'}
        open={modalMod}
        onClose={createPackModal}
      >
        <FormDeck
          buttonName={'Add new pack'}
          isPrivate={false}
          onSaveDeck={onCreateDecks}
          onCancel={createPackModal}
        />
      </Modal>
    </>
  )
}
