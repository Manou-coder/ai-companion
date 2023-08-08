const { PrismaClient } = require('@prisma/client')

const db = new PrismaClient()

async function main() {
  try {
    // await db.category.createMany({
    //   data: [
    //     {
    //       name: 'Famous people',
    //     },
    //     {
    //       name: 'Movies & TV',
    //     },
    //     {
    //       name: 'Musicians',
    //     },
    //     {
    //       name: 'Animals',
    //     },
    //     {
    //       name: 'Philosophy',
    //     },
    //     {
    //       name: 'Scientists',
    //     },
    //   ],
    // })

    // const { companion } = db
    // const deleteResult = await companion.deleteMany()
    // console.log(`Deleted ${deleteResult.count} companions.`)

    const { companion } = db
    const result = await companion.findMany()
    console.log('result: ', result)
  } catch (error) {
    console.error('Error seeding default categories', error)
  } finally {
    await db.$disconnect
  }
}

main()
