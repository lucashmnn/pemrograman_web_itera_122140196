
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';

const BookForm = ({ book, isEditing }) => {
  const { addBook, updateBook } = useContext(BookContext);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    status: book?.status || 'owned',
    notes: book?.notes || '',
    coverUrl: book?.coverUrl || '',
  });

  const [errors, setErrors] = useState({
    title: '',
    author: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleStatusChange = (status) => {
    setFormData((prev) => ({ ...prev, status }));
  };

  const validateForm = () => {
    const newErrors = {
      title: formData.title.trim() === '' ? 'Title is required' : '',
      author: formData.author.trim() === '' ? 'Author is required' : '',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (isEditing && book) {
      updateBook(book.id, formData);
      toast({
        title: "Book updated",
        description: `"${formData.title}" has been updated`,
      });
    } else {
      addBook(formData);
      toast({
        title: "Book added",
        description: `"${formData.title}" has been added to your collection`,
      });
    }
    navigate('/');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Book' : 'Add New Book'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Book Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={errors.author ? 'border-destructive' : ''}
            />
            {errors.author && <p className="text-sm text-destructive">{errors.author}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <RadioGroup 
              defaultValue={formData.status} 
              onValueChange={handleStatusChange}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="owned" id="owned" />
                <Label htmlFor="owned">Owned</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reading" id="reading" />
                <Label htmlFor="reading">Currently Reading</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="wishlist" id="wishlist" />
                <Label htmlFor="wishlist">Wishlist</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="coverUrl">Cover Image URL (optional)</Label>
            <Input
              id="coverUrl"
              name="coverUrl"
              value={formData.coverUrl}
              onChange={handleChange}
              placeholder="https://example.com/book-cover.jpg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add your thoughts about the book..."
              rows={4}
            />
          </div>
          <div className="flex space-x-2 justify-end">
            <Button type="button" variant="outline" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Update Book' : 'Add Book'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

BookForm.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.oneOf(['owned', 'reading', 'wishlist']),
    coverUrl: PropTypes.string,
    notes: PropTypes.string,
    addedAt: PropTypes.string,
  }),
  isEditing: PropTypes.bool,
};

BookForm.defaultProps = {
  book: undefined,
  isEditing: false,
};

export default BookForm;
