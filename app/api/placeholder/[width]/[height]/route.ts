import { NextRequest } from 'next/server'

type Params = {
  width: string
  height: string
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  const params = await context.params
  
  // Rediriger vers une image de placeholder appropriée
  // Pour l'instant, on utilise une image externe, mais idéalement ce devrait être une vraie image du site
  const width = params.width || '400'
  const height = params.height || '300'

  // Redirection temporaire vers une image de placeholder
  // TODO: remplacer par une vraie image du site
  return Response.redirect(`https://via.placeholder.com/${width}x${height}/e5e7eb/6b7280?text=Image+non+disponible`, 302)
}