import './modal.css';


export const inModal = (WrappedComponent, selectedProps) => {
    
    return <div className="modal">
        <WrappedComponent action={selectedProps} />
    </div>
}