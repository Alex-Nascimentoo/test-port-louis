import { NextFunction, Request, Response } from "express";
import { prisma } from '../lib/prisma';

export class ContactGroupController {
  async linkContactGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { contactId, groupId } = req.body;

      const contact = await prisma.contact.findUnique({
        where: { id: contactId },
      });

      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }

      const group = await prisma.group.findUnique({
        where: { id: groupId },
      });

      if (!group) {
        return res.status(404).json({ error: "Group not found" });
      }
      
      const newContactGroup = await prisma.contactGroup.create({
        data: {
          contact_id: contactId,
          group_id: groupId,
        },
      });

      return res.status(201).json(newContactGroup);
    } catch (error) {
      next(error);
    }
  }
}
