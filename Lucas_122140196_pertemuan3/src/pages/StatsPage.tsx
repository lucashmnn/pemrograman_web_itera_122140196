
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Layout from '../components/Layout';
import useBookStats from '../hooks/useBookStats';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Link } from 'react-router-dom';

// Komentar: Halaman statistik koleksi buku
const StatsPage = () => {
  const stats = useBookStats();

  const chartData = [
    { name: 'Dimiliki', value: stats.owned, color: '#3B82F6' },
    { name: 'Sedang Dibaca', value: stats.reading, color: '#8B5CF6' },
    { name: 'Ingin Dimiliki', value: stats.wishlist, color: '#F59E0B' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-6">Statistik Perpustakaan</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Koleksi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {stats.total > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} buku`, '']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-center text-muted-foreground">
                      Belum ada buku dalam koleksi Anda
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Dimiliki</p>
                  <p className="text-2xl font-bold text-book-blue">{stats.owned}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Sedang Dibaca</p>
                  <p className="text-2xl font-bold text-book-purple">{stats.reading}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Ingin Dimiliki</p>
                  <p className="text-2xl font-bold text-book-amber">{stats.wishlist}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Baru Ditambahkan</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.recentlyAdded.length > 0 ? (
                <ul className="space-y-2">
                  {stats.recentlyAdded.map((book) => (
                    <li key={book.id} className="p-2 rounded hover:bg-muted">
                      <Link to={`/edit/${book.id}`} className="block">
                        {book.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Belum ada buku dalam koleksi Anda
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StatsPage;

