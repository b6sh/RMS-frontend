import { useRouter } from 'next/router';

function RequestDetail({ requests }) {
    // Use the request data to display the details

    return (
        <div>
            <h1>Request Details</h1>
            <p>Title: {request.title}</p>
            <p>Description: {request.description}</p>
            <p>Status: {request.status}</p>
        </div>
    );
}

export async function getServerSideProps(context) {
    // Get the id from the dynamic route
    const { id } = context.query;

    // Fetch the data for the request with the given id (you may use your API or database)
    const response = await fetch(`/requests/${id}`);
    const requests = await response.json();

    return {
        props: {
            requests,
        },
    };
}

export default RequestDetail;
