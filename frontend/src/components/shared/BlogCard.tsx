import { getReqTimeToRead, timeAgoToReadable } from '../../services/utilities';
import { Avathar } from './Avathar';
import { DefaultAvathar } from './DefaultAvathar';

interface BlogCardParams {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  avathar: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  avathar,
}: BlogCardParams) => {
  return (
    <div className="pt-5 pb-3 px-15 border-b-1 border-b-gray-300">
      <div className="flex items-center gap-2">
        <div>
          {avathar.length > 0 ? (
            <Avathar avathar={avathar}></Avathar>
          ) : (
            <DefaultAvathar name={authorName} />
          )}
        </div>
        <div className="text-m text-gray-600 font-bold">{authorName}</div>
        <div className="text-xs">&#9679;</div>
        <div className="text-sm text-gray-500">
          {timeAgoToReadable(publishedDate)}
        </div>
      </div>
      <div className="text-lg font-semibold">{title}</div>
      <div className="font-normal text-sm text-gray-600">
        {content.length > 200 ? content.slice(0, 200) + '.....' : content}
      </div>
      <div className="py-2 text-xs text-gray-400">
        {getReqTimeToRead(content)}
      </div>
    </div>
  );
};
