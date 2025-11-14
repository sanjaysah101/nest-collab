import { getNestHeaders, nestApiUrl } from '@/lib/nest-client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const pageSize = searchParams.get('page_size') || '20'
    const chapter = searchParams.get('chapter') || ''
    const ordering = searchParams.get('ordering') || '-created_at'

    const url = new URL(nestApiUrl('/members/'))
    url.searchParams.append('page', page)
    url.searchParams.append('page_size', pageSize)
    if (chapter) url.searchParams.append('chapter', chapter)
    url.searchParams.append('ordering', ordering)

    const response = await fetch(url.toString(), {
      headers: getNestHeaders(),
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching members:', error)
    return Response.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    )
  }
}
