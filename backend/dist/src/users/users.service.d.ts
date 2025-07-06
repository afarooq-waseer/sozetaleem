import { CrudService } from '../database/crud.service';
export interface CreateUserDto {
    email: string;
    name?: string;
}
export interface CreatePostDto {
    title: string;
    content?: string;
    published?: boolean;
}
export declare class UsersService {
    private readonly crudService;
    constructor(crudService: CrudService);
    createUser(createUserDto: CreateUserDto): Promise<unknown>;
    findAllUsers(): Promise<unknown[]>;
    findUserById(id: string): Promise<unknown>;
    findUserByEmail(email: string): Promise<unknown>;
    updateUser(id: string, updateData: Partial<CreateUserDto>): Promise<unknown>;
    deleteUser(id: string): Promise<unknown>;
    createPost(authorId: string, createPostDto: CreatePostDto): Promise<unknown>;
    findPostsByAuthor(authorId: string): Promise<unknown[]>;
    updatePost(id: string, updateData: Partial<CreatePostDto>): Promise<unknown>;
    deletePost(id: string): Promise<unknown>;
    createUserWithPost(createUserDto: CreateUserDto, createPostDto: CreatePostDto): Promise<{
        user: any;
        post: any;
    }>;
    transferPosts(fromUserId: string, toUserId: string): Promise<number>;
    batchCreateUsers(users: CreateUserDto[]): Promise<unknown[]>;
    getUserStats(): Promise<{
        totalUsers: number;
        totalPosts: number;
        publishedPosts: number;
        unpublishedPosts: number;
    }>;
    userExists(email: string): Promise<boolean>;
}
