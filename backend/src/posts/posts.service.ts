import { Injectable } from '@nestjs/common';
import { CrudService } from '../database/crud.service';
import { Entity } from '../database/entities.enum';

@Injectable()
export class PostsService {
  constructor(private readonly crudService: CrudService) {}

  async getAllPosts(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    return this.crudService.findMany(Entity.POST, {
      where: { 
        published: true
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
  }

  async getPostBySlug(slug: string) {
    return this.crudService.findOne(Entity.POST, {
      where: { 
        slug,
        published: true
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
                description: true,
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
        },
        post_images: {
          select: {
            id: true,
            url: true,
            alt_text: true,
          }
        }
      }
    });
  }

  async getFeaturedPosts(limit: number = 5) {
    return this.crudService.findMany(Entity.POST, {
      where: { 
        published: true,
        featured: true
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
        }
      },
      orderBy: { published_at: 'desc' },
      take: limit,
    });
  }

  async getRecentPosts(limit: number = 10) {
    return this.crudService.findMany(Entity.POST, {
      where: { 
        published: true
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
        }
      },
      orderBy: { published_at: 'desc' },
      take: limit,
    });
  }

  async getPopularPosts(limit: number = 10) {
    return this.crudService.findMany(Entity.POST, {
      where: { 
        published: true
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
        }
      },
      orderBy: { view_count: 'desc' },
      take: limit,
    });
  }

  async searchPosts(query: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    return this.crudService.findMany(Entity.POST, {
      where: {
        AND: [
          { published: true },
          {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { content: { contains: query, mode: 'insensitive' } },
              { content_text: { contains: query, mode: 'insensitive' } },
              { meta_description: { contains: query, mode: 'insensitive' } },
            ]
          }
        ]
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
        }
      },
      orderBy: { published_at: 'desc' },
      skip,
      take: limit,
    });
  }

  async getPostsByCategory(categorySlug: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    return this.crudService.findMany(Entity.POST, {
      where: {
        published: true,
        post_categories: {
          some: {
            category: {
              slug: categorySlug
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
        }
      },
      orderBy: { published_at: 'desc' },
      skip,
      take: limit,
    });
  }

  async getPostsByTag(tagSlug: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    return this.crudService.findMany(Entity.POST, {
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
  }

  async getPostsByAuthor(authorId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    return this.crudService.findMany(Entity.POST, {
      where: {
        published: true,
        author_id: authorId
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
        }
      },
      orderBy: { published_at: 'desc' },
      skip,
      take: limit,
    });
  }

  async incrementViewCount(slug: string) {
    const post = await this.crudService.findOne(Entity.POST, {
      where: { slug }
    });
    
    if (!post) {
      throw new Error('Post not found');
    }

    return this.crudService.update(Entity.POST, {
      where: { slug },
      data: { view_count: { increment: 1 } }
    });
  }
} 