

interface Props {
    header?: string,
    messages: string[],
    submitFn?: (() => void) | null,
    cancelFn?: (() => void) | null,

}

const InfoModal = ({ header, messages, submitFn, cancelFn }: Props) => {

    return (
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden='true'>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {
                            !!header && <h5 className="modal-title" id="exampleModalLabel">{header}</h5>
                        }
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            messages.map((message, i) => <p key={i}>{message}</p>)
                        }
                    </div>
                    <div className="modal-footer">
                        {!!cancelFn && <button onClick={cancelFn} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Go Back</button>}
                        {!!submitFn && <button onClick={submitFn} type="button" className="btn btn-primary" data-bs-dismiss="modal">Confirm</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoModal

