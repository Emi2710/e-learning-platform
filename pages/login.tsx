import { useState } from 'react';
import { useRouter } from 'next/router';
import { sanityClient } from '../client/sanity';
import { ClassLogin } from '../typings';

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
      // redirect to home page
      router.push(`/classes/${user.slug.current}`);
      
    } else {
      setError('Invalid username or password.');
    }
  };

  const fetchUser = async (username: string, password: string) => {
    const query = `*[ _type == "classes" && name == "${username}" && password == "${password}" ]{
      _id,
      _type,
      name,
      slug
    }`;
    const results = await sanityClient.fetch<ClassLogin[]>(query);
    return results[0];
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;
