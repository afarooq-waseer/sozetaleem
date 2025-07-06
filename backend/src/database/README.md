# Database Service with Prisma

This setup provides a robust database service with transaction support using Prisma ORM with PostgreSQL.

## Setup

### 1. Environment Variables

Create a `.env` file in the backend root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
```

Example for local development:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/sozetaleem_dev"
```

### 2. Generate Prisma Client

Run the following command to generate the Prisma client:

```bash
npx prisma generate
```

### 3. Create and Migrate Database

To create the database and apply migrations:

```bash
# Create migration
npx prisma migrate dev --name init

# Or push schema to database without migrations
npx prisma db push
```

## Database Schema

The current schema includes:

- **User**: Basic user information with email and name
- **Post**: Blog posts linked to users
- **Category**: Categories for organizing content

## Generic CRUD Service

The `CrudService` provides generic CRUD operations for all entities defined in the `Entity` enum.

### Available Entities

```typescript
enum Entity {
  USER = 'user',
  POST = 'post',
  CATEGORY = 'category',
}
```

### Basic CRUD Operations

```typescript
// Create
const user = await crudService.create(Entity.USER, { email: 'test@example.com', name: 'Test User' });

// Find One
const user = await crudService.findOne(Entity.USER, { where: { email: 'test@example.com' } });

// Find Unique
const user = await crudService.findUnique(Entity.USER, { id: 'user-id' });

// Find Many
const users = await crudService.findMany(Entity.USER, { 
  include: { posts: true },
  orderBy: { createdAt: 'desc' }
});

// Update
const updatedUser = await crudService.update(Entity.USER, {
  where: { id: 'user-id' },
  data: { name: 'Updated Name' }
});

// Delete
const deletedUser = await crudService.delete(Entity.USER, { where: { id: 'user-id' } });

// Count
const userCount = await crudService.count(Entity.USER);

// Exists
const exists = await crudService.exists(Entity.USER, { email: 'test@example.com' });
```

### Transaction Support

```typescript
// Single transaction
const result = await crudService.transaction(async (crud) => {
  const user = await crud.create(Entity.USER, { email: 'test@example.com' });
  const post = await crud.create(Entity.POST, { 
    title: 'My Post', 
    authorId: user.id 
  });
  return { user, post };
});

// Batch operations
const users = await crudService.batchCreate(Entity.USER, [
  { email: 'user1@example.com', name: 'User 1' },
  { email: 'user2@example.com', name: 'User 2' },
]);
```

### Advanced Operations

```typescript
// Update many
await crudService.updateMany(Entity.POST, 
  { published: false }, 
  { published: true }
);

// Delete many
await crudService.deleteMany(Entity.POST, { authorId: 'user-id' });

// Batch update
await crudService.batchUpdate(Entity.USER, [
  { where: { id: 'user1' }, data: { name: 'Updated 1' } },
  { where: { id: 'user2' }, data: { name: 'Updated 2' } },
]);

// Batch delete
await crudService.batchDelete(Entity.USER, [
  { id: 'user1' },
  { id: 'user2' },
]);
```

## Database Service Features

### Basic Operations

The `DatabaseService` extends `PrismaClient` and provides:

- Automatic connection management
- Health checks
- Transaction support

### Transaction Methods

1. **Basic Transaction**
   ```typescript
   await databaseService.transaction(async (prisma) => {
     // Your operations here
     const user = await prisma.user.create({ data: userData });
     const post = await prisma.post.create({ data: { ...postData, authorId: user.id } });
     return { user, post };
   });
   ```

2. **Batch Transaction**
   ```typescript
   await databaseService.batchTransaction([
     (prisma) => prisma.user.create({ data: userData1 }),
     (prisma) => prisma.user.create({ data: userData2 }),
   ]);
   ```

3. **Transaction with Rollback Handling**
   ```typescript
   await databaseService.transactionWithRollback({
     execute: async (prisma) => {
       // Your operations
       return result;
     },
     onError: async (error) => {
       // Handle error
     },
     onSuccess: async (result) => {
       // Handle success
     },
   });
   ```

## Usage Examples

Check the `UsersService` for examples of:

- Creating users with posts in a single transaction
- Transferring posts between users
- Batch operations with error handling
- Using the generic CRUD service for all operations

## Database Commands

- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma db push` - Push schema changes to database
- `npx prisma generate` - Generate Prisma client
- `npx prisma db seed` - Run database seeding script

## PostgreSQL Setup

### Local Development

1. **Install PostgreSQL** (if not already installed):
   ```bash
   # macOS with Homebrew
   brew install postgresql
   brew services start postgresql
   
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   sudo systemctl start postgresql
   ```

2. **Create Database**:
   ```bash
   createdb sozetaleem_dev
   ```

3. **Set up .env**:
   ```env
   DATABASE_URL="postgresql://your_username:your_password@localhost:5432/sozetaleem_dev"
   ```

### Production

For production, use a managed PostgreSQL service like:
- AWS RDS
- Google Cloud SQL
- DigitalOcean Managed Databases
- Supabase
- Railway

## Best Practices

1. Always use transactions for operations that modify multiple tables
2. Use the `transactionWithRollback` method for complex operations
3. Handle errors appropriately in transaction callbacks
4. Use the `isHealthy()` method for health checks
5. Include proper TypeScript types for better development experience
6. Use connection pooling in production environments
7. Set up proper database indexes for performance
8. Use the generic CRUD service for consistent database operations
9. Add new entities to the `Entity` enum when creating new models 