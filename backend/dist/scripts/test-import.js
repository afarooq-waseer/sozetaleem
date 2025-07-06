"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function testDatabaseConnection() {
    try {
        console.log('🔍 Testing database connection...');
        await prisma.$connect();
        console.log('✅ Database connection successful!');
        const userCount = await prisma.user.count();
        const postCount = await prisma.post.count();
        const categoryCount = await prisma.category.count();
        const tagCount = await prisma.tag.count();
        console.log('📊 Current database state:');
        console.log(`   Users: ${userCount}`);
        console.log(`   Posts: ${postCount}`);
        console.log(`   Categories: ${categoryCount}`);
        console.log(`   Tags: ${tagCount}`);
        if (userCount === 0 && postCount === 0) {
            console.log('💡 Database is empty and ready for import!');
        }
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        console.log('\n🔧 Common solutions:');
        console.log('   1. Check your DATABASE_URL in .env file');
        console.log('   2. Make sure your database server is running');
        console.log('   3. Run: npx prisma migrate dev (or npx prisma db push)');
        console.log('   4. Verify database exists and credentials are correct');
    }
    finally {
        await prisma.$disconnect();
    }
}
testDatabaseConnection().catch(console.error);
//# sourceMappingURL=test-import.js.map