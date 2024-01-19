import { FaTooth } from 'react-icons/fa';

export default function MiniSpinner() {
    return (
        
        <div className="flex justify-center items-center">
            <FaTooth className="animate-spin text-indigo-500" size={40} />
        </div>
    )
}
