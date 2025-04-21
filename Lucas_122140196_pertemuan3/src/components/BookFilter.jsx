
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { BookContext } from '../context/BookContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

const BookFilter = () => {
  const { setStatusFilter, statusFilter, searchTerm, setSearchTerm } = useContext(BookContext);

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between animate-fade-in">
      <div className="flex gap-2">
        <Button 
          variant={statusFilter === 'all' ? 'default' : 'outline'}
          onClick={() => handleStatusChange('all')}
          className="text-sm"
        >
          All
        </Button>
        <Button 
          variant={statusFilter === 'owned' ? 'default' : 'outline'}
          onClick={() => handleStatusChange('owned')}
          className="text-sm"
        >
          Owned
        </Button>
        <Button 
          variant={statusFilter === 'reading' ? 'default' : 'outline'}
          onClick={() => handleStatusChange('reading')}
          className="text-sm"
        >
          Reading
        </Button>
        <Button 
          variant={statusFilter === 'wishlist' ? 'default' : 'outline'}
          onClick={() => handleStatusChange('wishlist')}
          className="text-sm"
        >
          Wishlist
        </Button>
      </div>
      <div className="relative w-full md:w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search books..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-8"
        />
      </div>
    </div>
  );
};

export default BookFilter;
