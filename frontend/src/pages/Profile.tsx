import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext.tsx';
import { generateAvatar } from '../utils/GenerateAvatar.tsx';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function Profile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [avatars, setAvatars] = useState<any[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<any>();
  const [loading, setLoading] = useState(false);

  const { currentUser, updateUserProfile } = useAuth();

  useEffect(() => {
    const fetchData = () => {
      const res = generateAvatar();
      setAvatars(res);
    };

    fetchData();
  }, []);

  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      const profile = {
        name: username,
        photo: avatars[selectedAvatar],
      };
      updateUserProfile(profile);
      navigate('/');
      clearTimeout(timer);
    }, 1000);
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-4 text-3xl text-center tracking-tight font-light dark:text-white">
            Pick an avatar
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div className="flex flex-wrap -m-1 md:-m-2">
            {avatars.map((avatar, index) => (
              <div key={index} className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2">
                  <img
                    alt="gallery"
                    className={classNames(
                      index === selectedAvatar
                        ? 'border-4  border-blue-700 dark:border-blue-700'
                        : 'cursor-pointer hover:border-4 hover:border-blue-700',
                      'block object-cover object-center w-36 h-36 rounded-full',
                    )}
                    src={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-md shadow-sm -space-y-px">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter a Display Name"
              defaultValue={currentUser.name && currentUser.name}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              更新資料
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
