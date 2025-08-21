import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(title: string, content: string, ownerId: string) {
    const note = new this.noteModel({ title, content, owner: ownerId });
    return note.save();
  }

  async findAllByUser(userId: string) {
    return this.noteModel.find({ owner: userId });
  }

  async findOne(id: string, userId: string) {
    const note = await this.noteModel.findById(id);
    if (!note) throw new NotFoundException();
    if (note.owner.toString() !== userId) throw new ForbiddenException();
    return note;
  }

  async update(id: string, userId: string, updateData: Partial<Note>) {
    const note = await this.findOne(id, userId);
    Object.assign(note, updateData);
    return note.save();
  }

  async remove(id: string, userId: string) {
  const note = await this.findOne(id, userId);
  return note.deleteOne();
  }
}
