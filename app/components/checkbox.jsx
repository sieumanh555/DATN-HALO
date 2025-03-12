export default function Checkbox() {
    return (
        <div className="flex items-center gap-1">
            <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100
  border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="default-checkbox" className="ms-2 font-medium text-gray-900">
                Default checkbox
            </label>
        </div>
    );
}