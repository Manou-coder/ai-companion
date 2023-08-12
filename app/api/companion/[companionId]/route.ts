import prismadb from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription'
import { auth, currentUser } from '@clerk/nextjs'
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

    const isPro = await checkSubscription()

    if (!isPro) {
      return new NextResponse('Pro subscription required', { status: 403 })
    }

    const companion = await prismadb.companion.update({
      where: {
        userId: user.id,
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

export async function DELETE(
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
    const { userId } = auth()
    const user = await currentUser()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const deletedCompanion = await prismadb.companion.delete({
      where: {
        userId,
        id: params.companionId,
      },
    })

    return NextResponse.json(deletedCompanion)
  } catch (error) {
    console.log('[COMPANION DELETE]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
