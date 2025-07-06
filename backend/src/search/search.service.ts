import { Injectable } from '@nestjs/common';
import { CrudService } from '../database/crud.service';
import { Entity } from '../database/entities.enum';

@Injectable()
export class SearchService {
  constructor(private readonly crudService: CrudService) {}

  async globalSearch(query: string, limit: number = 10) {
    if (!query || query.trim().length < 2) {
      return {
        posts: [],
        categories: [],
        tags: [],
        total: 0
      };
    }

    const searchQuery = query.trim();

    // Search posts
    const posts = await this.crudService.findMany(Entity.POST, {
      where: {
        AND: [
          { published: true },
          {
            OR: [
              { title: { contains: searchQuery, mode: 'insensitive' } },
              { content: { contains: searchQuery, mode: 'insensitive' } },
              { content_text: { contains: searchQuery, mode: 'insensitive' } },
              { meta_description: { contains: searchQuery, mode: 'insensitive' } },
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
      take: limit,
    });

    // Search categories
    const categories = await this.crudService.findMany(Entity.CATEGORY, {
      where: {
        OR: [
          { name: { contains: searchQuery, mode: 'insensitive' } },
          { description: { contains: searchQuery, mode: 'insensitive' } },
        ]
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
      },
      orderBy: { name: 'asc' },
      take: Math.min(limit, 5), // Limit categories in global search
    });

    // Search tags
    const tags = await this.crudService.findMany(Entity.TAG, {
      where: {
        name: { contains: searchQuery, mode: 'insensitive' }
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
      },
      orderBy: { name: 'asc' },
      take: Math.min(limit, 5), // Limit tags in global search
    });

    const total = (posts as any[]).length + (categories as any[]).length + (tags as any[]).length;

    return {
      posts,
      categories,
      tags,
      total,
      query: searchQuery
    };
  }

  async getSearchSuggestions(query: string, limit: number = 5) {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const searchQuery = query.trim();

    // Get post titles that match
    const postTitles = await this.crudService.findMany(Entity.POST, {
      where: {
        AND: [
          { published: true },
          { title: { contains: searchQuery, mode: 'insensitive' } }
        ]
      },
      select: {
        title: true,
        slug: true,
      },
      orderBy: { view_count: 'desc' },
      take: limit,
    }) as any[];

    // Get category names that match
    const categoryNames = await this.crudService.findMany(Entity.CATEGORY, {
      where: {
        name: { contains: searchQuery, mode: 'insensitive' }
      },
      select: {
        name: true,
        slug: true,
      },
      orderBy: { name: 'asc' },
      take: Math.min(limit, 3),
    }) as any[];

    // Get tag names that match
    const tagNames = await this.crudService.findMany(Entity.TAG, {
      where: {
        name: { contains: searchQuery, mode: 'insensitive' }
      },
      select: {
        name: true,
        slug: true,
      },
      orderBy: { name: 'asc' },
      take: Math.min(limit, 3),
    }) as any[];

    // Combine and format suggestions
    const suggestions = [
      ...postTitles.map((post: any) => ({
        type: 'post',
        title: post.title,
        slug: post.slug,
        url: `/posts/${post.slug}`
      })),
      ...categoryNames.map((category: any) => ({
        type: 'category',
        title: category.name,
        slug: category.slug,
        url: `/categories/${category.slug}`
      })),
      ...tagNames.map((tag: any) => ({
        type: 'tag',
        title: tag.name,
        slug: tag.slug,
        url: `/tags/${tag.slug}`
      }))
    ];

    return suggestions.slice(0, limit);
  }
}