const StatusBadge = ({status}) => {
    return(
    <>
        {parseInt(status) === 0 && <span className="bg-gray-100 text-gray-700 text-xs font-medium mr-2 px-1.5 py-0.5 rounded ">Pending</span>}
        {parseInt(status) === 1 && <span className="bg-yellow-100 text-yellow-700 text-xs font-medium mr-2 px-1.5 py-0.5 rounded ">In-progress</span>}
        {parseInt(status) === 2 && <span className="bg-green-100 text-green-700 text-xs font-medium mr-2 px-1.5 py-0.5 rounded ">Completed</span>}
    </>
    )
}
export default StatusBadge
