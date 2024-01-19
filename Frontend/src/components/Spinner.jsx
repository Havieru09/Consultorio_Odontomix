import { FaTooth } from 'react-icons/fa';

export default function Spinner() {
    return (
        
        <div className="flex justify-center items-center min-h-screen">
            <FaTooth className="animate-spin text-indigo-500" size={80} />
        </div>
    )
}
