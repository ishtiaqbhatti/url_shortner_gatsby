const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export const createResponse = (status, body) => {
  let bodyRes
  if (typeof body === 'string') {
    bodyRes = body
  } else {
    bodyRes = JSON.stringify(body || {})
  }

  return {
    statusCode: status,
    headers,
    body: bodyRes,
  }
}
