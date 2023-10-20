import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import ApplicationLogo from '@/components/ApplicationLogo'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <>
            <Head>
                <title>Laravel</title>
            </Head>


            <div className="relative flex justify-center min-h-screen bg-gray-100 items-center pt-0">

                <div className="max-w-6xl mx-auto ">
                    <div className="flex justify-center ">
                        <ApplicationLogo className="h-60"/>
                    </div>
                    <div>
                        <h1 className="text-4xl text-green-800 font-semibold mt-5">Request Management System</h1>
                    </div>
                    <div className="h-20 mt-20 w-auto text-gray-700  flex justify-center">
                        {user ? (
                            <Link
                                href="/dashboard"
                                className="ml-4 text-2xl text-gray-700 underline hover:text-green-700">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-gray-700 text-2xl underline hover:text-green-700">
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className="ml-4 text-2xl text-gray-700 underline hover:text-green-700">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </>
    )
}
