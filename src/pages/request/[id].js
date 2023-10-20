import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/router';
import Head from 'next/head'
import AppLayout from '@/components/Layouts/AppLayout'
import Spinner from '@/components/Spinner'
import { mutate } from 'swr'
import SuccessMessage from '@/components/SuccessMessage'
import StatusBadge from '@/components/StatusBadge'
import InputSelect from '@/components/inputSelect'
import Button from '@/components/Button'



function RequestDetail() {
    const [request, setRequest] = useState(null);
    const [owner, setOwner] = useState(null);
    const [newStatus, setNewStatus] = useState('0');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false)
    const [successMessage, setSuccessMessage] = useState(null)

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            axios
                .get(`/api/report/${id}`)
                .then((response) => {
                    setRequest(response.data.request);
                    setOwner(response.data.owner)
                })
                .catch((error) => {
                    router.push("/404")
                    setError(error);
                }).finally(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const submitFormDelete = async event => {
        event.preventDefault()

        await axios.get('/sanctum/csrf-cookie')

        setError([])
        setProcessing(true);

        axios
            .delete('/api/report/'+id)
            .then((response) => {
                setProcessing(false);
                setSuccessMessage(
                    <div>
                        Request Deleted
                    </div>
                );
                setTimeout(() => router.push('/dashboard'), 1000);
            })
            .catch(error => {
                setProcessing(false);
                setError('something went wrong')
            })
    }

    const submitFormUpdate = async event => {
        event.preventDefault()

        await axios.get('/sanctum/csrf-cookie')

        setError([])
        setProcessing(true);

        axios
            .put('/api/report/'+id,{
                newStatus
            })
            .then((response) => {
                setProcessing(false);
                setSuccessMessage(
                    <div>
                        Status Updated
                    </div>
                );
                setRequest({ ...request, status: newStatus });
                setTimeout(() => setSuccessMessage(''), 3000)

            })
            .catch(error => {
                setProcessing(false);
                setError('something went wrong')
            })
    }



    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };



    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Request Details
                </h2>
            }>

            <Head>
                <title>Request Details</title>
            </Head>
            {processing && (
                <Spinner />
            )}

            <div className="">
                {successMessage && (
                    <SuccessMessage message={successMessage}/>
                )}
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {loading ? (
                                <Spinner />
                            ) : (
                                <div>
                                    {request ? (
                                        <div>
                                            <h1 className="text-3xl text-gray-700 font-bold"> {request.title}</h1>
                                            <p className="text-sm font-semibold text-gray-500 mt-1">By <span className="text-indigo-500">{request.user.name}</span></p>
                                            <p className="my-3"><span className="text-sm text-gray-500 font-bold">Status</span> <StatusBadge status={request.status}/></p>
                                            <h1 className="text-lg text-gray-500 font-bold pt-5 pb-3">Description</h1>
                                            <p className="border-2 rounded-md border-gray-100 p-2">{request.description}</p>

                                        </div>
                                    ) : (
                                        // Show a message if no data is available
                                        <p>No data available.</p>
                                    )}
                                    <div className="mt-10">
                                        <div className='flex justify-between'>
                                            <div>
                                                <h1 className="text-gray-700 font-semibold">Update Status</h1>
                                                <div className="">
                                                    <InputSelect
                                                        options={['Pending','In-progress','Completed']}
                                                        className="block my-2 w-full"
                                                        required
                                                        onChange={event => setNewStatus(event.target.value)}
                                                    />
                                                </div>
                                                <Button onClick={submitFormUpdate} >Update</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        { owner ? (
                            <div className="my-4">
                                <button
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xm text-red-500 uppercase tracking-widest hover:text-red-800 disabled:opacity-25 transition ease-in-out duration-150"
                                    onClick={openModal}>Delete Request
                                </button>
                                {isOpen && (
                                    <div className="flex justify-center">
                                        <div className="modal">
                                            <div className="modal-content">
                                                <h2 className="text-red-900 transition animate-pulse duration-150" >Are you sure?</h2>
                                                <div className="flex justify-around pt-1.5">
                                                    <span className="close text-green-700 cursor-pointer hover:bg-green-700 hover:text-white rounded p-0.5 transition ease-in-out duration-150" onClick={closeModal}>Cancel</span>
                                                    <span className="text-red-700 cursor-pointer hover:bg-red-800 hover:text-white rounded p-0.5 transition ease-in-out duration-150" onClick={submitFormDelete}>Yes</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ):(
                            <div></div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default RequestDetail;
