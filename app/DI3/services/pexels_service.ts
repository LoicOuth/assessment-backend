import env from '#start/env'

interface PexelsPhoto {
  id: number
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  photographer_id: number
  avg_color: string
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
  }
  liked: boolean
  alt: string
}

interface PexelsResponse {
  total_results: number
  page: number
  per_page: number
  photos: PexelsPhoto[]
  next_page?: string
}

export default class PexelsService {
  private readonly apiKey: string
  private readonly baseUrl = 'https://api.pexels.com/v1'

  constructor() {
    this.apiKey = env.get('PEXELS_API_KEY')
  }

  async searchImage(query: string): Promise<string | null> {
    try {
      const searchParams = new URLSearchParams({
        query: query,
        per_page: '1',
        orientation: 'square',
        size: 'medium',
      })

      const response = await fetch(`${this.baseUrl}/search?${searchParams}`, {
        headers: {
          Authorization: this.apiKey,
        },
      })

      if (!response.ok) {
        console.error(`Pexels API error: ${response.status}`)
        return null
      }

      const data = (await response.json()) as PexelsResponse

      if (data.photos && data.photos.length > 0) {
        return data.photos[0].src.medium
      }

      return null
    } catch (error) {
      console.error('Error fetching image from Pexels:', error)
      return null
    }
  }
}
