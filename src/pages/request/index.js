import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from '@/lib/axios'
import { mutate } from 'swr'
import Head from 'next/head'
import Link from 'next/link'
import Spinner from '@/components/Spinner'
import Button from '@/components/Button'
import InputSelect from '@/components/inputSelect'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Input from '@/components/Input'
import AppLayout from '@/components/Layouts/AppLayout'
import SuccessMessage from '@/components/SuccessMessage'
import InputArea from '@/components/InputArea'

const Request = () => {
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('0')
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false); // Add loading state
    const [successMessage, setSuccessMessage] = useState('')
    const submitForm = async event => {
        event.preventDefault()

        await axios.get('/sanctum/csrf-cookie')

        setErrors([])
        setLoading(true);

        axios
            .post('/api/report', {
                title,
                description,
                status,
            })
            .then((response) => {
                const createdRequest = response.data.request;
                setLoading(false);
                setSuccessMessage(
                    <div>
                        Request Created{' '}
                        <Link href={`/request/${createdRequest.id}`} className="underline font-extrabold pt-3">
                            <p>View New Request</p>
                        </Link>
                    </div>
                );
                setTitle('');
                setDescription('');
                setStatus('0');

                mutate()
            })
            .catch(error => {
                setLoading(false);
                if (error.response.status !== 422) throw error
                setErrors(error.response.data.errors)
            })

    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    New Request
                </h2>
            }>
            <Head>
                <title>New Request</title>
            </Head>

            {loading && (
                <Spinner />
            )}

            <div className="">
                {successMessage && (
                    <SuccessMessage message={successMessage}/>
                )}
            </div>
            <div className="py-12 ">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg md:mx-60">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <form onSubmit={submitForm}>
                                {/* Title */}
                                <div>
                                    <Label htmlFor="title">Title</Label>

                                    <Input
                                        id="title"
                                        type="text"
                                        className="block mt-1 w-full"
                                        required
                                        autoFocus
                                        onChange={event => setTitle(event.target.value)}
                                        value={title}
                                    />

                                    <InputError className="mt-2" messages={errors.title} />
                                </div>

                                {/* Description */}
                                <div className="mt-4">
                                    <Label htmlFor="description">Description</Label>

                                    <InputArea
                                        rows="4"
                                        id="description"
                                        type="text"
                                        className="block mt-1 w-full"
                                        required
                                        autoFocus
                                        onChange={event => setDescription(event.target.value)}
                                        value={description}
                                    />

                                    <InputError className="mt-2" messages={errors.description} />
                                </div>

                                {/* Status */}
                                <div className="mt-4">
                                    <Label htmlFor="status">Status</Label>

                                    <InputSelect
                                        id="status"
                                        options={['Pending', 'In-progress', 'Completed']}
                                        className="block mt-1 w-full"
                                        required
                                        onChange={event => setStatus(event.target.value)}
                                    />

                                    <InputError className="mt-2" messages={errors.status} />
                                </div>


                                <div className="flex items-center justify-end mt-4">
                                    <Button className="ml-3">Create</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Request
