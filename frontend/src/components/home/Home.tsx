import { BlogCard } from '../shared/BlogCard';
import { Layout } from '../shared/Layout';
import { useBlogs } from '../../services/hooks/blogs';
import { useAtomValue } from 'jotai';
import { blogsAtom } from '../../services/atoms/blogs';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

export default function Home() {
  const { ref, inView } = useInView();
  const [loadMore, setLoadMore] = useState(true);
  const { loading } = useBlogs(loadMore, () => setLoadMore(false));
  const blogs = useAtomValue(blogsAtom);

  useEffect(() => {
    setLoadMore(inView);
  }, [inView]);
  return (
    <>
      <Layout loading={loading}>
        <div
          className={`flex justify-center ${loading ? 'items-center' : ''}`}
          style={loading ? { minHeight: 'calc(100vh - 80px)' } : {}}
        >
          <div className="w-sm md:w-lg lg:w-2xl xl:w-4xl 2xl:w-7xl">
            {blogs.blogs.map((blog, index) => (
              <BlogCard
                ref={index === blogs.count - 1 ? ref : undefined}
                key={blog.id}
                blogId={blog.id}
                authorName={blog.author.name}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.createdAt}
                avathar={blog.author.avathar}
              />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
