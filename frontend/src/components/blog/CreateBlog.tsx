import { useRef, useState, useEffect } from 'react';
import type { RefObject } from 'react';
import { createBlog } from '../../services/blogs';
import { useAtomValue } from 'jotai';
import { userInfoAtom } from '../../services/atoms/user';
import { useNavigate } from 'react-router-dom';
import Layout from '../shared/Layout';

export default function CreateBlog() {
  const navigate = useNavigate();
  const user = useAtomValue(userInfoAtom);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = (ref: RefObject<HTMLTextAreaElement | null>) => {
    const el = ref.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    resizeTextarea(titleRef);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    resizeTextarea(contentRef);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const createBlogHandler = async () => {
    setLoading(true);
    const params = {
      title: title,
      content: content,
      userId: user.userId,
      published: isChecked,
    };
    try {
      await createBlog(params);
      setLoading(false);
      navigate('/');
    } catch (e) {
      console.log('create blog error', e);
      setLoading(false);
    }
  };

  useEffect(() => {
    resizeTextarea(titleRef);
    resizeTextarea(contentRef);
  }, []);

  return (
    <>
      <Layout loading={loading} type="create">
        <div className="flex flex-col min-h-screen">
          <div className="px-5 md:px-50 py-15 flex-1 pb-20">
            <div className="text-5xl pb-2">
              <textarea
                ref={titleRef}
                rows={1}
                value={title}
                onChange={handleTitleChange}
                className="block w-full px-0 text-gray-800 bg-white border-0 focus:outline-none resize-none overflow-hidden font-bold leading-tight"
                placeholder="Title"
                required
              ></textarea>
            </div>
            <div className="w-full mb-4 rounded-lg pl-2">
              <div className="bg-white rounded-b-lg">
                <textarea
                  ref={contentRef}
                  rows={3}
                  value={content}
                  onChange={handleContentChange}
                  className="block w-full px-0 text-xl text-gray-800 bg-white border-0 focus:outline-none resize-none overflow-hidden"
                  placeholder="Write an article..."
                  required
                ></textarea>
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="checked-checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm "
              />
              <label
                htmlFor="checked-checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Publish
              </label>
            </div>
          </div>
          <div className="sticky bottom-0 z-10 bg-white flex items-center justify-end px-10 shadow-[0_-2px_6px_-1px_rgba(0,0,0,0.2)] h-16">
            <button
              type="button"
              className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-7 py-2 text-center cursor-pointer"
              onClick={createBlogHandler}
            >
              Create
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
