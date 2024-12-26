import axios from "axios"
import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { baseUrl } from "../store/resources/http"
import SecondarySpinner from "./SecondarySpinner"
import { camelToCapitalize } from "./utils"

const ReportsHistory = () => {
    const [reportsDay, setReportsDay] = useState(new Date().toISOString().substring(0, `yyyy-mm-dd`.length))
    const [reportUser, setReportUser] = useState('')
    const [data, setData] = useState([])
    const [loadingState, setLoadingState] = useState('loading')

    useEffect(() => {
        if (loadingState === 'loading')
            axios.get(`${baseUrl}/api/lead/getDailyReports?user=${reportUser}&day=${reportsDay}`).then(res => {
                setData(res.data.reports.map(report => <ReportCard report={report}></ReportCard>))
                setLoadingState('loaded')
            }).catch(error => {
                setData(error.message)
                setLoadingState('errored')
            })
    }, [loadingState])

    return (
        <div className="container mt-1 mb-1 p-5  rounded shadow border border-grey card ">
            <div>
                <h3 className="text-center  text-black-300 p-1 text-uppercase text-bold mt-1 mb-1 ">
                    Reports History
                </h3>
                <div className="mt-5 d-flex flex-wrap justify-content-between gap-3">
                    <Form.Control type="text" value={reportUser} style={{ width: 'min-content' }} className="flex-grow-1" onChange={ev => setReportUser(ev.target.value)} placeholder="Filter by user" />
                    <div className="d-flex">
                        <label htmlFor="reports-day" className="align-self-center m-0 me-2 ms-1">Pick a date</label>
                        <Form.Control name="reports-day" value={reportsDay} type="date" style={{ width: 'min-content' }} className="" onChange={ev => { if (ev.target.value) setReportsDay(ev.target.value) }} />
                    </div>
                    <i className={(loadingState == 'loading' ? 'disabled ' : '') + 'd-flex align-items-center justify-content-center py-2 px-2 border border-grey rounded'}
                        onClick={() => { setLoadingState('loading') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </i>
                </div>
                {loadingState == 'loading' &&
                    <div className="d-flex w-100 align-items-center justify-content-center" style={{ minHeight: '200px' }}>
                        <SecondarySpinner />
                    </div>
                }

                {loadingState == 'errored' &&
                    <div className='text-danger p-2 mt-4 d-flex flex-column align-items-center'>
                        <h6 className='text-danger'>
                            <i className="pe-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                            </svg></i>
                            Error occured
                        </h6>
                        <p className="mt-2"> {data}</p>
                    </div>
                }

                {loadingState == 'loaded' &&
                    <div className="width-100 p-0">
                        {data}
                    </div>
                }
            </div>
        </div>)
}

const ReportCard = (props) => {
    const [expanded, setExpanded] = useState(false)
    return (
        <div className="card width-100 my-4">
            <div className="card-body width-100 p-4">
                <div className="width-100 d-flex align-items-center justify-content-between">
                    <span className="card-title">{`${props.report['firstName']} ${props.report['lastName']}`}</span>
                    <span className="card-text">{props.report['phoneNumber']}</span>
                    <span className="card-text">{props.report['email']}</span>
                    <i onClick={() => setExpanded(!expanded)} className="d-flex align-items-center justify-content-center border border-grey p-2 rounded">
                        {!expanded &&
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707" />
                            </svg>
                        }

                        {expanded &&
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16">
                                <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5m5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5M0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5m10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0z" />
                            </svg>
                        }
                    </i>
                </div>

                <div className="overflow-hidden" style={{ transition: 'max-height 300ms ease-out, opacity 300ms ease-out', maxHeight: expanded ? '400px' : '0px', opacity: expanded ? 1 : 0 }}>
                    <div>
                        <div className="pt-2"></div>
                        {Object.keys(props.report.details).filter(k => k !== 'remark').map(k =>
                            <span className="border border-grey d-inline-flex m-2 rounded px-2 align-items-center">
                                <span>{camelToCapitalize(k)}</span>
                                <span className="d-inline-block ms-2">{props.report.details[k]}</span>
                            </span>
                        )}
                    </div>
                    <hr></hr>
                    <span className="d-inline-flex width-100 ps-2">
                        <span className="flex-grow-0">Remark:</span>
                        <span className="flex-grow-1 ms-4">{props.report.details['remark']}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ReportsHistory