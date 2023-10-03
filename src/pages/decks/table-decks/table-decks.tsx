// import { useState } from 'react'
//
// import { Link } from 'react-router-dom'
//
// import { Play } from 'assets/icons'
// import { DeletePack } from 'pages/decks/delete-pack'
// import s from 'pages/decks/table-decks/table-decks.module.scss'
// import { UpdatePack } from 'pages/decks/update-pack'
// import { useMeQuery } from 'services/authApi'
// import { UserType } from 'services/authApi/type.ts'
// import { useGetDecksQuery } from 'services/decksApi'
// import { Button } from 'ui/button'
// import { Sort, Table } from 'ui/tables'
//
// type ConfigType = {
//   title: string
//   key: string
//   sortable?: boolean
// }
//
// const config: ConfigType[] = [
//   { title: 'Name', key: 'name', sortable: true },
//   { title: 'Cards', key: 'cardsCount', sortable: true },
//   { title: 'Last Update', key: 'updated', sortable: true },
//   { title: 'Created by', key: 'grade', sortable: true },
//   { title: '', key: '', sortable: false },
// ]
//
// export const TableDecks = () => {
//   const { data: meData } = useMeQuery<{ data: UserType }>()
//   const [sort, setSort] = useState<Sort>(null)
//
//   const orderBy: string | undefined = sort ? `${sort?.key}-${sort?.direction}` : undefined
//
//   const decksQuery = { orderBy }
//
//   const { data: decks } = useGetDecksQuery(decksQuery)
//
//   const dataTable = decks?.items.map(el => (
//     <Table.Row key={el.id}>
//       <Table.Cell>
//         <div className={s.packNameContainer}>
//           <Link to={`/cards/${el.id}`}>
//             {el.cover ? <img src={el.cover} alt="pack avatar" className={s.coverImage} /> : null}
//             {el.name}
//           </Link>
//         </div>
//       </Table.Cell>
//       <Table.Cell>{el.cardsCount}</Table.Cell>
//       <Table.Cell>{new Date(el.updated).toLocaleString()}</Table.Cell>
//       <Table.Cell>{el.author.name}</Table.Cell>
//       <Table.Cell>
//         <div className={s.buttonContainer}>
//           <Button variant="link">
//             <Play />
//           </Button>
//           {el.author.id === meData?.id && (
//             <UpdatePack id={el.id} isPrivate={el.isPrivate} name={el.name} />
//           )}
//           {el.author.id === meData?.id && <DeletePack id={el.id} name={el.name} />}
//         </div>
//       </Table.Cell>
//     </Table.Row>
//   ))
//
//   return (
//     <Table.Root>
//       <Table.Header columns={config} sort={sort} onSort={setSort} />
//       <Table.Body>{dataTable}</Table.Body>
//     </Table.Root>
//   )
// }
