import { NextFunction, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { validateGroup } from '../validators/groupValidator';

export class GroupController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = validateGroup(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const group = await prisma.group.create({
        data: value
      });
      
      return res.status(201).json(group);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { error, value } = validateGroup(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const group = await prisma.group.update({
        where: { id: Number(id) },
        data: value
      });

      return res.json(group);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      await prisma.group.delete({
        where: { id: Number(id) }
      });

      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  async listContacts(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const contacts = await prisma.contact.findMany({
        where: {
          groups: {
          some: {
            group_id: Number(id)
          }
          }
        }
      });

      return res.json(contacts);
    } catch (err) {
      next(err);
    }
  }

  async getReport(req: Request, res: Response, next: NextFunction) {
    try {
      const report = await prisma.group.findMany({
        select: {
          name: true,
          _count: {
          select: {
            contacts: true
          }
          }
        },
        orderBy: {
          contacts: {
          _count: 'desc'
          }
        }
      });

      const formattedReport = report.map(group => ({
        group: group.name,
        contact_count: group._count.contacts
      }));

      return res.json(formattedReport);
    } catch (err) {
      next(err);
    }
  }
}
