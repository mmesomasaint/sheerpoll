export default function Message({
  text,
  error,
}: {
  text: string
  error?: boolean
}) {
  return <div>{text}</div>
}
