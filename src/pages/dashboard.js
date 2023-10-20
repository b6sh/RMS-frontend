import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import AppLayout from '@/components/Layouts/AppLayout';
import Head from 'next/head';
import Spinner from '@/components/Spinner';
import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';
import ListItem from '@/components/ListItem'
const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('/api/report')
            .then((response) => {
                setData(response.data.requests);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head>
                <title>Dashboard</title>
            </Head>



            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div>
                        <div className="mx-3 md:mx-5">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Requests
                            </h2>
                            <span className="animate-pulse text-xs text-green-700 p-0.5 my-2 rounded-md">tap/click on the request to view its details</span>
                        </div>
                        <div className="p-6 border-b border-gray-200">
                            {loading ? (
                                <Spinner />
                            ) : (
                                <div>

                                    {data.length > 0 ? (
                                        <div>
                                            <details className="my-2 cursor-pointer transition ease-in-out duration-150" open>

                                                <summary className="bg-gray-200 text-gray-700 text-lg font-medium mr-2 px-1.5 py-0.5 rounded hover:bg-gray-300 transition ease-in-out duration-150">
                                                    Pending
                                                </summary>
                                                <div className="transition ease-in-out duration-150">
                                                    <ul role="list" className="divide-y-2 divide-gray-200">
                                                        {data.map((item, index) => (
                                                            <span key={index}>
                                                            {
                                                                item.status === 0
                                                                &&
                                                                <Link key={index}  href={'/request/'+item.id}>
                                                                    <ListItem item={item}/>
                                                                </Link>

                                                            }
                                                        </span>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </details>

                                            <details className="my-2 cursor-pointer" open>
                                                <summary className="bg-yellow-100 text-yellow-700 text-lg font-medium mr-2 px-1.5 py-0.5 rounded hover:bg-yellow-200 transition  ease-in-out duration-150">
                                                    In-Progress
                                                </summary>
                                                <div>
                                                    <ul role="list" className="divide-y-2 divide-gray-200">
                                                        {data.map((item, index) => (
                                                            <span key={index}>
                                                            {
                                                                item.status === 1
                                                                &&
                                                                <Link key={index}  href={'/request/'+item.id}>
                                                                    <ListItem item={item}/>
                                                                </Link>
                                                            }
                                                        </span>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </details>
                                            <details className="my-2 cursor-pointer">
                                                <summary className="bg-green-100 text-green-700 text-lg font-medium mr-2 px-1.5 py-0.5 rounded hover:bg-green-200 transition ease-in-out duration-150">
                                                    Completed
                                                </summary>

                                                <div>
                                                    <ul role="list" className="divide-y-2 divide-gray-200">
                                                        {data.map((item, index) => (
                                                            <span key={index}>
                                                            {
                                                                item.status === 2
                                                                &&
                                                                <Link key={index}  href={'/request/'+item.id}>
                                                                    <ListItem item={item}/>
                                                                </Link>

                                                            }
                                                        </span>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </details>
                                        </div>

                                    ) : (
                                        <p>No data available.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Dashboard;
