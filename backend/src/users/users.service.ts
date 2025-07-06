import { Injectable } from '@nestjs/common';
import { CrudService } from '../database/crud.service';
import { Entity } from '../database/entities.enum';

export interface CreateUserDto {
  email: string;
  name?: string;
}

export interface CreatePostDto {
  title: string;
  content?: string;
  published?: boolean;
}

@Injectable()
export class UsersService {
  constructor(private readonly crudService: CrudService) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.crudService.create(Entity.USER, createUserDto);
  }

  async findAllUsers() {
    return this.crudService.findMany(Entity.USER, {
      include: {
        posts: true,
      },
    });
  }

  async findUserById(id: string) {
    return this.crudService.findUnique(Entity.USER, { id }, {
      include: {
        posts: true,
      },
    });
  }

  async findUserByEmail(email: string) {
    return this.crudService.findOne(Entity.USER, {
      where: { email },
      include: {
        posts: true,
      },
    });
  }

  async updateUser(id: string, updateData: Partial<CreateUserDto>) {
    return this.crudService.update(Entity.USER, {
      where: { id },
      data: updateData,
    });
  }

  async deleteUser(id: string) {
    return this.crudService.delete(Entity.USER, { where: { id } });
  }

  async createPost(authorId: string, createPostDto: CreatePostDto) {
    return this.crudService.create(Entity.POST, {
      ...createPostDto,
      authorId,
    });
  }

  async findPostsByAuthor(authorId: string) {
    return this.crudService.findMany(Entity.POST, {
      where: { authorId },
      include: {
        author: true,
      },
    });
  }

  async updatePost(id: string, updateData: Partial<CreatePostDto>) {
    return this.crudService.update(Entity.POST, {
      where: { id },
      data: updateData,
    });
  }

  async deletePost(id: string) {
    return this.crudService.delete(Entity.POST, { where: { id } });
  }

  /**
   * Example: Create a user with a post in a single transaction
   */
  async createUserWithPost(
    createUserDto: CreateUserDto,
    createPostDto: CreatePostDto,
  ) {
    return this.crudService.transaction(async (crud) => {
      // Create user first
      const user = await crud.create<any>(Entity.USER, createUserDto);

      // Create post for the user
      const post = await crud.create<any>(Entity.POST, {
        ...createPostDto,
        authorId: user.id,
      });

      return { user, post };
    });
  }

  /**
   * Example: Transfer posts from one user to another in a transaction
   */
  async transferPosts(fromUserId: string, toUserId: string) {
    return this.crudService.transaction(async (crud) => {
      // Verify both users exist
      const fromUser = await crud.findUnique(Entity.USER, { id: fromUserId });
      const toUser = await crud.findUnique(Entity.USER, { id: toUserId });

      if (!fromUser || !toUser) {
        throw new Error('One or both users not found');
      }

      // Transfer all posts
      const result = await crud.updateMany(Entity.POST, 
        { authorId: fromUserId }, 
        { authorId: toUserId }
      );

      return result.count;
    });
  }

  /**
   * Example: Batch create users with error handling
   */
  async batchCreateUsers(users: CreateUserDto[]) {
    return this.crudService.batchCreate(Entity.USER, users);
  }

  /**
   * Example: Get user statistics
   */
  async getUserStats() {
    const totalUsers = await this.crudService.count(Entity.USER);
    const totalPosts = await this.crudService.count(Entity.POST);
    const publishedPosts = await this.crudService.count(Entity.POST, { published: true });

    return {
      totalUsers,
      totalPosts,
      publishedPosts,
      unpublishedPosts: totalPosts - publishedPosts,
    };
  }

  /**
   * Example: Check if user exists
   */
  async userExists(email: string) {
    return this.crudService.exists(Entity.USER, { email });
  }
} 