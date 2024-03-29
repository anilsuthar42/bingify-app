import axios from 'axios';
import { useCallback, useState } from 'react';
import { NextPageContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import React from 'react';

import Input from '@/components/Input';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/'
      });

      router.push('/profiles');
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/remote.jpg')] bg-no-repeat bg-center bg-dynamic bg-cover">
      <div className="bg-black w-full h-full bg-opacity-50">
        <div className="h-full overflow-y-scroll">
          <nav className="px-12 py-4">
          <h1 className="font-bold text-5xl text-blue-700 tracking-wide font-sans">BINGIFY</h1>
          </nav>
          <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 px-12 py-8 self-center mt-2 lg:w-2/5 max-w-md rounded-md w-full">
              <h2 className="text-white text-4xl mb-8 font-semibold">
                {variant === 'login' ? 'Sign in' : 'Register'}
              </h2>
              <div className="flex flex-col gap-4">
                {variant === 'register' && (
                  <Input
                    id="name"
                    type="text"
                    label="Username"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                  />
                )}
                <Input
                  id="email"
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  id="password"
                  label="Password"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
              </div>
              <button onClick={variant === 'login' ? login : register} className="bg-blue-600 py-3 text-white rounded-md w-full mt-7 hover:bg-blue-700 transition">
                {variant === 'login' ? 'Login' : 'Sign up'}
              </button>
              <div className="flex flex-row items-center gap-4 mt-6 justify-center">
                <button onClick={() => signIn('google', { callbackUrl: '/profiles' })} className="rounded-md px-4 py-2 bg-red-800 flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                  <FcGoogle size={20} /> {/* Google logo */}
                  <div className='ml-2 mb-1 text-white'>
                    Login with Google
                  </div>
                </button>
              </div>
              <p className="text-neutral-500 mt-8">
                {variant === 'login' ? 'New to Bingify?' : 'Already have an account?'}
                <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                  {variant === 'login' ? 'Create an account' : 'Login'}
                </span>
                .
              </p>
            </div>
          </div>
          <div className="h-16" />
        </div>
      </div>
    </div>
  );
}

export default Auth;