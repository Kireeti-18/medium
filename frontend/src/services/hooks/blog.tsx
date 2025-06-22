import { useEffect, useState } from 'react';
import { getBlog } from '../blogs';

interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    email: string;
    name: string;
    avathar: string;
  };
  createdAt: string;
}

export function useBlog(blogId: string) {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (!blogId || blogId.length === 0) return;

    async function getBlogInfo() {
      setLoading(true);
      try {
        const response = await getBlog(blogId);
        setBlog(response.data.blog);
      } catch (e) {
        console.error('Error in fetching Blog', e);
      } finally {
        setLoading(false);
      }
    }

    getBlogInfo();
  }, [blogId]);

  return { loading, blog };
}
