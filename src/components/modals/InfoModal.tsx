import React from 'react'

interface Props {
    status: string,
    messages: string[],
    hidden: boolean
}

const InfoModal = ({ status, messages, hidden }: Props) => {

    return (
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden={hidden}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{status}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            messages.map((message, i) => <p key={i}>{message}</p>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoModal

