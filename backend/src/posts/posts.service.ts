import { Injectable, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Post } from './posts.interface';
import { UsersService } from '../users/users.service';
import { OnEvent } from '@nestjs/event-emitter';

const DATA_DIR = path.resolve(__dirname, '../../../data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

const DATA_FILE = path.join(DATA_DIR, 'posts.json');

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  constructor(private readonly usersService: UsersService) {
    try {
      if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf-8');

      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed: unknown = data ? JSON.parse(data) : [];

      if (Array.isArray(parsed)) {
        this.posts = parsed.map((item) => {
          if (
            item &&
            typeof item === 'object' &&
            'id' in item &&
            'userId' in item &&
            'title' in item
          ) {
            const obj = item as Record<string, unknown>;
            return {
              id: Number(obj.id),
              userId: Number(obj.userId),
              title: String(obj.title),
              body: typeof obj.body === 'string' ? obj.body : undefined,
            } as Post;
          }
          throw new Error('Invalid post data in JSON file');
        });
      } else {
        this.posts = [];
      }
    } catch (err) {
      console.error('Error reading posts data:', err);
      this.posts = [];
    }
  }

  private save() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(this.posts, null, 2), 'utf-8');
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post | undefined {
    return this.posts.find((p) => p.id === id);
  }

  create(post: Omit<Post, 'id'>): Post {
    const user = this.usersService.findOne(post.userId);
    if (!user) throw new BadRequestException('User not found');

    const newPost: Post = { id: Date.now(), ...post };
    this.posts.push(newPost);
    this.save();
    return newPost;
  }

  update(id: number, data: Partial<Omit<Post, 'id'>>): Post {
    const post = this.findOne(id);
    if (!post) throw new BadRequestException('Post not found');

    if (data.userId && !this.usersService.findOne(data.userId)) {
      throw new BadRequestException('User not found');
    }

    Object.assign(post, data);
    this.save();
    return post;
  }

  remove(id: number) {
    const initialLength = this.posts.length;
    this.posts = this.posts.filter((p) => p.id !== id);
    this.save();
    return { deleted: this.posts.length < initialLength };
  }

  // 🔹 Kullanıcı silindiğinde ilgili postları sil
  @OnEvent('user.deleted')
  handleUserDeleted(userId: number) {
    const initialLength = this.posts.length;
    this.posts = this.posts.filter((p) => p.userId !== userId);
    this.save();
    console.log(`Deleted ${initialLength - this.posts.length} posts of user ${userId}`);
  }
}
