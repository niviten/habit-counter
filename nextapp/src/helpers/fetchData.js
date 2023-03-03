export default async function fetchData(url, data={}, method='POST') {
  if (!url) {
    return null
  }
  url = `http://localhost:3333${url}`
  const response = await fetch(url, {
    method, body: data
  })
  const responseText = await response.text()
  return JSON.parse(responseText)
}
