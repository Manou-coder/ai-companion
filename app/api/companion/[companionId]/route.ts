import prismadb from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      companionId: string
    }
  }
) {
  try {
    const body = await req.json()
    const user = await currentUser()

    const { name, description, instructions, seed, src, categoryId } = body

    if (!params.companionId) {
      return new NextResponse('Companion Id is required', { status: 400 })
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !src ||
      !categoryId
    ) {
      return new NextResponse('Missing required files', { status: 401 })
    }

    //   Todo check for subscriptions

    const companion = await prismadb.companion.update({
      where: {
        id: params.companionId,
      },
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        description,
        instructions,
        name,
        seed,
      },
    })

    return NextResponse.json(companion)
  } catch (error) {
    console.log('[COMPANION PATCH]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
