export default (value) => {
  let date = new Date(value)
  return date.toLocaleString(['en-US'], {month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'})
}
