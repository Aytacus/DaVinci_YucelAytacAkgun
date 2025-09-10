import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as fs from 'fs';
import * as path from 'path';
import { User } from './users.interface';

const DATA_DIR = path.resolve(__dirname, '../../../data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

const DATA_FILE = path.join(DATA_DIR, 'users.json');

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(private eventEmitter: EventEmitter2) {
    try {
      if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
      }
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed: unknown = data ? JSON.parse(data) : [];

      if (Array.isArray(parsed)) {
        this.users = parsed.map((item) => {
          if (
            item &&
            typeof item === 'object' &&
            'id' in item &&
            'name' in item &&
            'username' in item &&
            'email' in item
          ) {
            const obj = item as Record<string, unknown>;
            return {
              id: Number(obj.id),
              name: String(obj.name),
              username: String(obj.username),
              email: String(obj.email),
            } as User;
          }
          throw new Error('Invalid user data in JSON file');
        });
      } else {
        this.users = [];
      }
    } catch (err) {
      console.error('Error reading users data:', err);
      this.users = [];
    }
  }

  private save() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(this.users, null, 2), 'utf-8');
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  create(user: Omit<User, 'id'>): User {
    const newUser: User = { id: Date.now(), ...user };
    this.users.push(newUser);
    this.save();
    return newUser;
  }

  update(id: number, data: Partial<Omit<User, 'id'>>): User | undefined {
    const user = this.findOne(id);
    if (!user) return undefined;
    Object.assign(user, data);
    this.save();
    return user;
  }

  remove(id: number) {
    const initialLength = this.users.length;
    this.users = this.users.filter((u) => u.id !== id);
    this.save();

    // Kullanıcı silindiğinde postların silinmesi için event yayınla
    this.eventEmitter.emit('user.deleted', id);

    return { deleted: this.users.length < initialLength };
  }
}
