import { RequestHandler } from "express";
import NoteModel from '../models/note';
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIdDefind } from "../utils/assertIsDefined";

 export const getNotes: RequestHandler = async(req, res, next)=>{

    const authenticateUserId = req.session.userId;

    try {
        assertIdDefind(authenticateUserId);
        // throw createHttpError(401);
        const notes = await NoteModel.find({userId: authenticateUserId}).exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;
    const authenticateUserId = req.session.userId;

    try {
        assertIdDefind(authenticateUserId);

        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, 'Invalid NoteID');
        }

        const note = await NoteModel.findById(noteId).exec();

        if(!note){
            throw createHttpError(404, 'note not found')
        }

        if(!note.userId.equals(authenticateUserId)){
            throw createHttpError(401, "You cannot access this note.");
        }

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
}

interface CreateNoteBody {
    title?: string,
    text? : string,
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async(req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    const authenticateUserId = req.session.userId;


    try {
        assertIdDefind(authenticateUserId);
        if(!title){
            throw createHttpError(400, 'Note must have a title');
        }

        const newNote = await NoteModel.create({
            userId: authenticateUserId,
            title: title,
            text: text,
        });

        res.status(200).json(newNote);
    } catch (error) {
        next(error)
    }
 };

 interface updateNoteParam{
    noteId: string,
 }

 interface updateNoteBody {
    title?: string,
    text?: string,
 }

 export const updateNote: RequestHandler<updateNoteParam, unknown, updateNoteBody, unknown> = async(req, res, next)=> {

    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const authenticateUserId = req.session.userId;


    try {
        assertIdDefind(authenticateUserId);
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, 'Invalid NoteID');
        }

        if(!newTitle){
            throw createHttpError(400, 'Note must have a title');
        }

        const note = await NoteModel.findById(noteId).exec();

        if(!note){
            throw createHttpError(404, 'note not found')
        }

        if(!note.userId.equals(authenticateUserId)){
            throw createHttpError(401, "You cannot access this note.");
        }

        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);

    } catch (error) {
        next(error);
    }
 };

 export const deleteNote: RequestHandler = async(req, res, next)=>{
    const noteId = req.params.noteId;
    const authenticateUserId = req.session.userId;

    try {
        assertIdDefind(authenticateUserId);
        if(!mongoose.isValidObjectId(noteId)){
            throw createHttpError(400, 'Invalid NoteID');
        }

        const note = await NoteModel.findById(noteId).exec();

        if(!note){
            throw createHttpError(404, 'note not found')
        }
        
        if(!note.userId.equals(authenticateUserId)){
            throw createHttpError(401, "You cannot access this note.");
        }

        await note.deleteOne({_id: noteId});

        res.sendStatus(204);
        
    } catch (error) {
        next(error);
    }
 }