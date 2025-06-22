import { useNavigate } from 'react-router-dom';
import { getReqTimeToRead, timeAgoToReadable } from '../../services/utilities';
import { Avathar } from './Avathar';
import { DefaultAvathar } from './DefaultAvathar';
import { forwardRef } from 'react';

interface BlogCardParams {
  blogId: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  avathar: string;
}

export const BlogCard = forwardRef<HTMLDivElement, BlogCardParams>(
  ({ blogId, authorName, title, content, publishedDate, avathar }, ref) => {
    const navigate = useNavigate();
    function navigateToBlog(id: string) {
      navigate(`/blog/${id}`);
    }
    return (
      <div
        ref={ref}
        className="pt-5 pb-3 px-4 border-b border-gray-300 cursor-pointer"
        onClick={() => navigateToBlog(blogId)}
      >
        <div className="flex items-center gap-2">
          <div>
            {avathar?.length > 0 ? (
              <Avathar avathar={avathar} />
            ) : (
              <DefaultAvathar name={authorName} />
            )}
          </div>
          <div className="text-sm text-gray-600 font-bold">{authorName}</div>
          <div className="text-xs">&#9679;</div>
          <div className="text-sm text-gray-500">
            {timeAgoToReadable(publishedDate)}
          </div>
        </div>
        <div className="text-lg font-semibold mt-2">{title}</div>
        <div className="font-normal text-sm text-gray-600 mt-1">
          {content.length > 200 ? `${content.slice(0, 200)}.....` : content}
        </div>
        <div className="py-2 text-xs text-gray-400">
          {getReqTimeToRead(content)}
        </div>
      </div>
    );
  },
);
