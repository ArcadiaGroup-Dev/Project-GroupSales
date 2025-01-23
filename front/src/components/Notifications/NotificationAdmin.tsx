export const ConfirmationMessage = ({
    onAccept,
    onCancel,
    roleMessage, // Acepta el prop
}: {
    onAccept: () => void;
    onCancel: () => void;
    roleMessage: string; // Agrega roleMessage al tipo
}) => (
    <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8" role="alert">
        <p className="mt-4 text-gray-500">
            {roleMessage} {/* Muestra el mensaje dinámico */}
        </p>

        <div className="mt-6 sm:flex sm:gap-4">
            <button
                onClick={onAccept}
                className="inline-block w-full rounded-lg bg-blue-500 px-5 py-3 text-center text-sm font-semibold text-white sm:w-auto hover:bg-blue-700"
            >
                Aceptar
            </button>
            <button
                onClick={onCancel}
                className="mt-2 inline-block w-full rounded-lg bg-gray-200 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:w-auto hover:bg-gray-300"
            >
                Cancelar
            </button>
        </div>
    </div>
);
