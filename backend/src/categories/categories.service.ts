import { Injectable } from '@nestjs/common';
import { CrudService } from '../database/crud.service';
import { Entity } from '../database/entities.enum';

@Injectable()
export class CategoriesService {
  constructor(private readonly crudService: CrudService) {}

  async getAllCategories() {
    // Get all categories in hierarchical structure
    const categories = await this.crudService.findMany(Entity.CATEGORY, {
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true,
          }
        },
        children: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            children: {
              select: {
                id: true,
                name: true,
                slug: true,
                description: true,
              }
            }
          }
        },
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
    }) as any[];

    // Return only root categories (no parent) with their children
    return categories.filter((category: any) => !category.parent_id);
  }

  async getCategoryBySlug(slug: string) {
    return this.crudService.findOne(Entity.CATEGORY, {
      where: { 
        slug
      },
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            slug: true,
          }
        },
        children: {
          select: {
            id: true,
            name: true,
            slug: true,
            description: true,
          }
        },
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

  async getPostsByCategory(categorySlug: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    // First get the category to ensure it exists
    const category = await this.getCategoryBySlug(categorySlug);
    if (!category) {
      throw new Error('Category not found');
    }

    // Get all posts in this category
    const posts = await this.crudService.findMany(Entity.POST, {
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
      post_categories: {
        some: {
          category: {
            slug: categorySlug
          }
        }
      }
    });

    return {
      category,
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

  async getCategoryTree() {
    // Get all categories and build a complete tree structure
    const categories = await this.crudService.findMany(Entity.CATEGORY, {
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
    }) as any[];

    // Build tree structure
    const categoryMap = new Map();
    const roots: any[] = [];

    // First pass: create map of all categories
    categories.forEach((category: any) => {
      categoryMap.set(category.id, {
        ...category,
        children: []
      });
    });

    // Second pass: build tree structure
    categories.forEach((category: any) => {
      const categoryWithChildren = categoryMap.get(category.id);
      
      if (category.parent_id) {
        const parent = categoryMap.get(category.parent_id);
        if (parent) {
          parent.children.push(categoryWithChildren);
        }
      } else {
        roots.push(categoryWithChildren);
      }
    });

    return roots;
  }
} 