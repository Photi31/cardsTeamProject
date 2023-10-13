import { useState } from 'react'

import { toast } from 'react-toastify'

import { Redactor } from 'assets/icons'
import { FormDeck, FormDeckType } from 'pages/decks/form-deck/form-deck.tsx'
import { useUpdateDecksMutation } from 'services/decksApi'
import { Button } from 'ui/button'
import { Modal } from 'ui/modal'

type Props = {
  id: string
  packName: string
  isPrivate: boolean
  cover?: string
}

export const UpdatePack = ({ id, cover, packName, isPrivate }: Props) => {
  const [updatePack] = useUpdateDecksMutation()
  const [modalMod, setModalMode] = useState<boolean>(false)

  const onUpdatePack = ({ isPrivate, packName, deckImg }: FormDeckType) => {
    setModalMode(false)

    const form = new FormData()

    form.append('name', packName)
    form.append('isPrivate', String(isPrivate))
    deckImg[0] && form.append('cover', deckImg[0])

    updatePack({ id, body: form })
      .unwrap()
      .then(() => {
        toast.success('Сохранено')
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
      <Button variant="link" onClick={createPackModal}>
        <Redactor />
      </Button>
      <Modal showCloseButton={true} title={'Edit pack'} open={modalMod} onClose={createPackModal}>
        <FormDeck
          buttonName={'Save Changes'}
          packName={packName}
          deckImg={cover}
          isPrivate={isPrivate}
          onSaveDeck={onUpdatePack}
          onCancel={createPackModal}
        />
      </Modal>
    </>
  )
}
