import { useParams } from 'react-router-dom';
import { useBlog } from '../../services/hooks/blog';
import Layout from '../shared/Layout';
import { formatToReadableDate } from '../../services/utilities';
import { Avathar } from '../shared/Avathar';
import { DefaultAvathar } from '../shared/DefaultAvathar';

export default function Blog() {
  const { blogId } = useParams();
  const { loading, blog } = useBlog(blogId || '');
  return (
    <Layout loading={loading}>
      {!loading && !blog ? (
        <p>Invalid Blog</p>
      ) : (
        blog && (
          <div className="px-5 pt-15 md:flex xl:px-30">
            <div className="mb-10 md:mb-0 lg:px-10 md:w-[70%]">
              <div className="text-4xl/normal font-semibold pb-3">
                {blog.title}
              </div>
              <div className="text-gray-600 pb-2">
                {formatToReadableDate(blog.createdAt)}
              </div>
              <div className="text-gray-900 text-lg/relaxed tracking-wide">
                {blog.content}
              </div>
            </div>
            <div className="py-5 px-20 md:w-[30%]">
              <div className="pb-3 text-lg">Author</div>
              <div className="flex gap-3 items-center">
                <div>
                  {blog?.author?.avathar.length > 0 ? (
                    <Avathar avathar={blog.author.avathar} />
                  ) : (
                    <DefaultAvathar name={blog.author.name} />
                  )}
                </div>
                <div className="text-lg">{blog.author.name}</div>
              </div>

              <div>contact : {blog.author.email}</div>
            </div>
          </div>
        )
      )}
    </Layout>
  );
}
