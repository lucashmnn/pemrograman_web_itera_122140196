
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { BookContext } from '../context/BookContext';
import { Button } from './ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ui/use-toast';

const BookCard = ({ book }) => {
  const { deleteBook } = useContext(BookContext);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEdit = () => {
    navigate(`/edit/${book.id}`);
  };

  const handleDelete = () => {
    deleteBook(book.id);
    toast({
      title: "Book removed",
      description: `"${book.title}" has been deleted from your collection`,
    });
  };

  const getStatusBadge = () => {
    switch (book.status) {
      case 'owned':
        return <Badge className="book-status-owned">Owned</Badge>;
      case 'reading':
        return <Badge className="book-status-reading">Reading</Badge>;
      case 'wishlist':
        return <Badge className="book-status-wishlist">Wishlist</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="book-card animate-fade-in">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-serif font-bold text-lg mb-1 line-clamp-1">{book.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
            {getStatusBadge()}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={handleEdit}>
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button variant="ghost" size="sm" onClick={handleDelete}>
          <Trash2 className="h-4 w-4 mr-1 text-destructive" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['owned', 'reading', 'wishlist']).isRequired,
    coverUrl: PropTypes.string,
    notes: PropTypes.string,
    addedAt: PropTypes.string,
  }).isRequired,
};

export default BookCard;
