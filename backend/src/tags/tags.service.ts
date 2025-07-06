import { Injectable } from '@nestjs/common';
import { CrudService } from '../database/crud.service';
import { Entity } from '../database/entities.enum';

@Injectable()
export class TagsService {
  constructor(private readonly crudService: CrudService) {}

  async getAllTags() {
    return this.crudService.findMany(Entity.TAG, {
      include: {
        _count: {
          select: {
            posts: {
              where: {
                post: {
                  published: true
                }
              }
            }
          }
        }
      },
      orderBy: { name: 'asc' }
    });
  }

  async getTagBySlug(slug: string) {
    return this.crudService.findOne(Entity.TAG, {
      where: { 
        slug
      },
      include: {
        _count: {
          select: {
            posts: {
              where: {
                post: {
                  published: true
                }
              }
            }
          }
        }
      }
    });
  }

  async getPostsByTag(tagSlug: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    // First get the tag to ensure it exists
    const tag = await this.getTagBySlug(tagSlug);
    if (!tag) {
      throw new Error('Tag not found');
    }

    // Get all posts with this tag
    const posts = await this.crudService.findMany(Entity.POST, {
      where: {
        published: true,
        post_tags: {
          some: {
            tag: {
              slug: tagSlug
            }
          }
        }
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        post_categories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              }
            }
          }
        },
        post_tags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
                slug: true,
              }
            }
          }
        }
      },
      orderBy: { published_at: 'desc' },
      skip,
      take: limit,
    });

    // Get total count for pagination
    const total = await this.crudService.count(Entity.POST, {
      published: true,
      post_tags: {
        some: {
          tag: {
            slug: tagSlug
          }
        }
      }
    });

    return {
      tag,
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      }
    };
  }

  async getPopularTags(limit: number = 20) {
    const tags = await this.crudService.findMany(Entity.TAG, {
      include: {
        _count: {
          select: {
            posts: {
              where: {
                post: {
                  published: true
                }
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      },
      take: limit * 2, // Get more to filter
    }) as any[];

    // Filter out tags with no posts and sort by post count
    const tagsWithPosts = tags.filter((tag: any) => tag._count.posts > 0);
    tagsWithPosts.sort((a: any, b: any) => b._count.posts - a._count.posts);
    
    return tagsWithPosts.slice(0, limit);
  }
} 