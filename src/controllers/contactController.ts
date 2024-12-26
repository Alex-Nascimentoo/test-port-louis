import express, { NextFunction, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { validateContact } from '../validators/contactValidator';

export class ContactController {
  async create(req: express.Request, res: express.Response, next: NextFunction) {
    try {
      const { error, value } = validateContact(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });
  
      const contact = await prisma.contact.create({
        data: value
      });
      
      return res.status(201).json(contact);
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const skip = (page - 1) * limit;

      const contacts = await prisma.contact.findMany({
      skip,
      take: limit,
      orderBy: { name: 'asc' }
      });

      return res.json(contacts);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { error, value } = validateContact(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });

      const contact = await prisma.contact.update({
      where: { id: Number(id) },
      data: value
      });

      return res.json(contact);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      
      await prisma.contact.delete({
      where: { id: Number(id) }
      });

      return res.status(204).json({
      message: 'Contact deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}
