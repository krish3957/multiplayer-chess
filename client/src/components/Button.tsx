export default function Button({ onClick, children, disabled }: { onClick: () => void, children: React.ReactNode, disabled: boolean }) {
    return (
        <button onClick={onClick} disabled={disabled} className="w-40 mt-5 bg-orange-700 hover:bg-orange-600 hover:border-white hover:scale-105 transition-all disabled:cursor-not-allowed" >
            {children}
        </button>
    )
}