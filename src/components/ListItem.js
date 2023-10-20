import StatusBadge from '@/components/StatusBadge'

const ListItem = ({item}) => (
    <li className="bg-white shadow-md my-1 border-2 border-gray-200 flex justify-between gap-x-6 py-5 hover:bg-gray-50 p-3 rounded-lg">
        <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
                <p className="text-md font-semibold leading-6 text-gray-900">{item.title} </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500"><StatusBadge status={item.status} /></p>
            </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">by {item.user.name}</p>
            <p className="mt-1 text-xs leading-5 text-gray-500"><span>   {new Date(item.created_at).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })}</span></p>
        </div>

    </li>
)

export default ListItem
