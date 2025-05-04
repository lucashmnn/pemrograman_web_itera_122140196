from abc import ABC, abstractmethod

class LibraryItem(ABC):
    def __init__(self, title, item_id):
        self._title = title      # Protected attribute
        self.__id = item_id      # Private attribute
        self.status = "Available"  # Public attribute
    
    @property
    def title(self):
        return self._title
    
    @title.setter
    def title(self, new_title):
        self._title = new_title
    
    @property
    def item_id(self):
        return self.__id
    
    @abstractmethod
    def check_out(self):
        pass
    
    @abstractmethod
    def return_item(self):
        pass
    
    def get_details(self):
        return f"Title: {self._title}, ID: {self.__id}, Status: {self.status}"

class Book(LibraryItem):
    def __init__(self, title, item_id, author, isbn):
        super().__init__(title, item_id)
        self.author = author      # Public attribute
        self.isbn = isbn          # Public attribute
    
    def check_out(self):
        if self.status == "Available":
            self.status = "Checked Out"
            return f"Buku '{self.title}' berhasil dipinjam"
        return f"Buku '{self.title}' sedang dipinjam"
    
    def return_item(self):
        self.status = "Available"
        return f"Buku '{self.title}' telah dikembalikan"
    
    def get_details(self):
        base_details = super().get_details()
        return f"{base_details}, Author: {self.author}, ISBN: {self.isbn}"

class Magazine(LibraryItem):
    def __init__(self, title, item_id, issue_number, publication_date):
        super().__init__(title, item_id)
        self.issue_number = issue_number  # Public attribute
        self.publication_date = publication_date  # Public attribute
    
    def check_out(self):
        if self.status == "Available":
            self.status = "Checked Out"
            return f"Majalah '{self.title}' berhasil dipinjam"
        return f"Majalah '{self.title}' sedang dipinjam"
    
    def return_item(self):
        self.status = "Available"
        return f"Majalah '{self.title}' telah dikembalikan"
    
    def get_details(self):
        base_details = super().get_details()
        return f"{base_details}, Issue: {self.issue_number}, Date: {self.publication_date}"

class Library:
    def __init__(self):
        self.__items = []  # Private collection of items
    
    def add_item(self, item):
        if isinstance(item, LibraryItem):
            self.__items.append(item)
            return f"{item.title} ditambahkan ke perpustakaan"
        return "Hanya bisa menambahkan item turunan LibraryItem"
    
    def display_all_items(self):
        if not self.__items:
            print("Tidak ada item di perpustakaan")
        for item in self.__items:
            print(item.get_details())
    
    def search_by_title(self, title):
        results = [item for item in self.__items if title.lower() in item.title.lower()]
        return results
    
    def search_by_id(self, item_id):
        for item in self.__items:
            if item.item_id == item_id:
                return item
        return None

# Contoh penggunaan
if __name__ == "__main__":
    # Membuat perpustakaan
    lib = Library()
    
    # Membuat beberapa item
    book1 = Book("Python Programming", "B001", "John Smith", "978-3-16-148410-0")
    book2 = Book("Data Science Handbook", "B002", "Jane Doe", "978-1-78-778000-8")
    mag1 = Magazine("Tech Today", "M001", 45, "July 2023")
    mag2 = Magazine("Science Weekly", "M002", 12, "June 2023")
    
    # Menambahkan item ke perpustakaan
    print(lib.add_item(book1))
    print(lib.add_item(book2))
    print(lib.add_item(mag1))
    print(lib.add_item(mag2))
    
    # Menampilkan semua item
    print("\nDaftar Semua Item:")
    lib.display_all_items()
    
    # Mencari item berdasarkan judul
    print("\nHasil pencarian untuk 'python':")
    for item in lib.search_by_title("python"):
        print(item.get_details())
    
    # Mencari item berdasarkan ID
    print("\nMencari item dengan ID B002:")
    result = lib.search_by_id("B002")
    if result:
        print(result.get_details())
    
    # Meminjam dan mengembalikan item
    print("\nMeminjam buku Python Programming:")
    print(book1.check_out())
    print(book1.get_details())
    
    print("\nMengembalikan buku Python Programming:")
    print(book1.return_item())
    print(book1.get_details())