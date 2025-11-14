import { getNestHeaders, nestApiUrl } from '@/lib/nest-client'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const response = await fetch(nestApiUrl(`/chapters/${id}/`), {
      headers: getNestHeaders(),
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching chapter:', error)
    return Response.json(
      { error: 'Failed to fetch chapter' },
      { status: 500 }
    )
  }
}
