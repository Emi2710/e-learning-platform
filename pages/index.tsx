import { useState } from 'react';
import { useRouter } from 'next/router';
import { sanityClient } from '../client/sanity';
import { ClassLogin } from '../typings';
import secureLocalStorage from  "react-secure-storage";
import Image from 'next/image';
import logo from '../assets/expo-logo.svg';
import moon from '../assets/moon.svg';
import hand from '../assets/waving-hand.svg';



const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = await fetchUser(username, password);
    if (user) {
      // store user data in session storage
      sessionStorage.setItem('user', JSON.stringify(user));
      secureLocalStorage.setItem('isLoggedIn', 'true')

      // redirect to home page
      router.push(`/classes/${user.slug.current}`);
      
    } else {
      setError('Invalid username or password.');
    }
  };

  const fetchUser = async (username: string, password: string) => {
    const query = `*[ _type == "classes" && classIdentifier == "${username}" && password == "${password}" ]{
      _id,
      _type,
      classIdentifier,
      slug
    }`;
    const results = await sanityClient.fetch<ClassLogin[]>(query);
    return results[0];
  };

  return (
    <div>
      <div className='flex justify-between p-5'>
        <Image src={logo} alt="logo expovision"  />
        <Image src={moon} alt="moon icon"  />
      </div>
      
      <div className='flex flex-col mt-12'>
        {error && <p className='text-red-500 text-center text-lg'>{error}</p>}
        <h1 className='manrope text-2xl md:text-3xl font-bold my-3 flex p-3 justify-center'>Добро пожаловать <Image src={hand} alt="waving hand" className='ml-2' /> </h1>        
        <form onSubmit={handleSubmit} className="w-100 m-auto flex flex-col">
          <div>
            <input
              type="text"
              id="username"
              placeholder='Введите имя классы'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="my-3 bg-white bg-opacity-20 p-2 text-lg text-white rounded-xl"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder='Введите пароль'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mb-5 bg-white bg-opacity-20 p-2 text-lg text-white rounded-xl"
            />
          </div>
          <button type="submit" className='bg-[#D9D9D9] py-2 px-4 text-black font-bold rounded-xl w-1/2 m-auto'>Войти</button>
        </form>
      </div>
      
    </div>
  );
};

export default LoginPage;


