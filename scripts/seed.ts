const { PrismaClient } = require('@prisma/client')

const db = new PrismaClient()

async function main() {
  try {
    await db.category.createMany({
      data: [
        {
          name: 'Famous people',
        },
        {
          name: 'Movies & TV',
        },
        {
          name: 'Musicians',
        },
        {
          name: 'Animals',
        },
        {
          name: 'Philosophy',
        },
        {
          name: 'Scientists',
        },
      ],
    })

    // const { companion } = db
    // const deleteResult = await companion.deleteMany()
    // console.log(`Deleted ${deleteResult.count} companions.`)

    // const { companion, category } = db
    // const result = await companion.deleteMany()
    // const result1 = await category.deleteMany()
    // console.log('result1: ', result1)
    // console.log('result: ', result)
  } catch (error) {
    console.error('Error seeding default categories', error)
  } finally {
    await db.$disconnect
  }
}

main()
