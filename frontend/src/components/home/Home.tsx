import { BlogCard } from '../shared/BlogCard';
import { Layout } from '../shared/Layout';
import { useBlogs } from '../../services/hooks/blogs';
import { useAtomValue } from 'jotai';
import { blogsAtom } from '../../services/atoms/blogs';
import { useRef, useState } from 'react';

export default function Home() {
  // const observer = useRef(null);
  const [next, setNext] = useState(1);
  const { loading } = useBlogs(next);
  const blogs = useAtomValue(blogsAtom);

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
                // ref={index === blogs.count ? : }
                key={blog.id}
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
