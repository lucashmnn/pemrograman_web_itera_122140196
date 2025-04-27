
import { useState, useEffect } from "react";
import { Note, noteManager } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateId } from "@/lib/utils";

const NoteManager = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteContent, setNewNoteContent] = useState("");
  
  // Load notes from localStorage on component mount
  useEffect(() => {
    const loadedNotes = noteManager.getAll();
    setNotes(loadedNotes);
  }, []);
  
  // Add new note
  const addNote = () => {
    if (!newNoteContent.trim()) return;
    
    const note: Note = {
      id: generateId(),
      content: newNoteContent,
      createdAt: new Date().toISOString()
    };
    
    // Update state and localStorage
    const updatedNotes = [note, ...notes];
    setNotes(updatedNotes);
    noteManager.add(note);
    
    // Reset form
    setNewNoteContent("");
  };
  
  // Delete note
  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    noteManager.delete(id);
  };
  
  return (
    <div>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Add New Note</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea 
            className="w-full p-2 border rounded resize-none"
            rows={4}
            placeholder="Write your note here..."
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
          />
          
          <Button onClick={addNote} className="w-full mt-2">
            Add Note
          </Button>
        </CardContent>
      </Card>
      
      <h2 className="font-bold mb-4">My Notes</h2>
      
      {notes.length === 0 ? (
        <div className="text-center py-6 border rounded bg-white">
          <p>No notes yet. Add your first note!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {notes.map(note => (
            <div 
              key={note.id} 
              className="p-4 border rounded bg-white"
            >
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
              
              <p className="whitespace-pre-wrap break-words">
                {note.content}
              </p>
              
              <div className="text-xs text-gray-500 mt-3">
                {new Date(note.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteManager;
