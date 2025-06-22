import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { blogsAtom } from '../atoms/blogs';
import { listBlogs } from '../blogs';
import { handleApiError } from '../utilities';
import { useNavigate } from 'react-router-dom';

export function useBlogs(loadMore: boolean, callback: () => void) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useAtom(blogsAtom);

  useEffect(() => {
    if (!loadMore || !blogs.paginationAvailable) return;
    async function getBlogs() {
      setLoading(true);
      try {
        const response = await listBlogs({ page: blogs.page + 1 });
        if (response.status) {
          const data = response.data;
          setBlogs((prev) => {
            const merged = [...prev.blogs, ...data.blogs];
            const unique = Array.from(
              new Map(merged.map((b) => [b.id, b])).values(),
            );

            return {
              ...prev,
              blogs: unique,
              totalCount: data.total_count,
              page: data.page,
              count: unique.length,
              paginationAvailable: data.paginated,
            };
          });
        }
      } catch (e) {
        const { message, type } = handleApiError(e);
        console.error('Error:', message);
        if (type === 'invalid_token') navigate('/signin');
      } finally {
        setLoading(false);
      }
    }

    getBlogs();
    callback();
  }, [loadMore]);

  return { loading };
}
