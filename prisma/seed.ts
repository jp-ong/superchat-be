import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const user1 = await prisma.user.create({
    data: { username: 'brian', chatIds: [] },
  });

  const user2 = await prisma.user.create({
    data: { username: 'stewie', chatIds: [] },
  });

  console.log(`Created Users: ${user1.username}, ${user2.username}`);

  // Create a chat
  const chat = await prisma.chat.create({
    data: {
      participantIds: [user1.id, user2.id],
    },
  });

  console.log(`Created Chat with ID: ${chat.id}`);

  // Update users to include chat ID

  await prisma.user.updateMany({
    where: { id: { in: [user1.id, user2.id] } },
    data: { chatIds: { push: chat.id } },
  });

  console.log('Updated Users with Chat ID');

  // Create messages in the chat
  await prisma.message.createMany({
    data: [
      {
        chatId: chat.id,
        senderId: user1.id,
        content: "I'm Brian",
      },
      {
        chatId: chat.id,
        senderId: user2.id,
        content: "I'm Stewie",
      },
    ],
  });

  console.log('Created Messages');

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
