
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, Plus } from 'lucide-react';
import { Button } from './ui/button';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4 px-6 bg-card shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="font-serif text-2xl font-bold text-primary">BookShelf</Link>
          <nav className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/stats">
              <Button variant="ghost" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Stats
              </Button>
            </Link>
            <Link to="/add">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Book
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container py-8 px-4 mx-auto">
        {children}
      </main>

      <footer className="border-t py-6 bg-muted">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 BookShelf App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
