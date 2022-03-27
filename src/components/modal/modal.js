import './modal.css';


export const InModal = ({NestedComp, onValidate, onCancel, ...passThroughProps}) => {

    const onClose = (e) => {
        if (e.nativeEvent.srcElement.id === "close_button") onCancel();
    }
    
    return (
        <div className="modal">
            <div className="modal_container">
                <div className="close_modal" >
                    <span id="close_button" onClick={onClose}>X</span>
                </div>
                <div className="modal_content">
                    <NestedComp
                        onValidate={onValidate}
                        {...passThroughProps}
                    />
                </div>
            </div>
        </div>
    )
}