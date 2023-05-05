const resortItems = (items: any[]) => {
  // order: normal, important, urgent, important and urgent
  const normalItems = items.filter(
    (item) => !item.isImportant && !item.isUrgent
  )
  const importantItems = items.filter(
    (item) => item.isImportant && !item.isUrgent
  )
  const urgentItems = items.filter((item) => item.isUrgent && !item.isImportant)
  const importantAndUrgentItems = items.filter(
    (item) => item.isImportant && item.isUrgent
  )
  return [
    ...normalItems,
    ...importantItems,
    ...urgentItems,
    ...importantAndUrgentItems,
  ]
}

export default {
  resortItems,
}