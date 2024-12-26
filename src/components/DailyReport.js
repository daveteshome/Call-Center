import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Col, Spinner } from "react-bootstrap"
import { baseUrl } from "../store/resources/http"
import "./DailyReport.css"
import SecondarySpinner from "./SecondarySpinner"

const DailyReport = () => {
    const [loading, setLoading] = useState('loading')
    const [data, setData] = useState({})
    const [lastUpdatedRemark, setLastUpdatedRemark] = useState('')
    const [updatingRemark, setUpdatingRemark] = useState(false)

    useEffect(() => {
        if (loading === 'loading') {
            const from = new Date()
            from.setHours(0, 0, 0)

            const to = new Date()
            to.setHours(23, 59, 59)

            const token = JSON.parse(localStorage.getItem("elite-water"));
            const user_id = token.user.user._id;

            axios.get(`${baseUrl}/api/lead/generateDailyReport?updatedBy=${user_id}`).then(r => {
                setData(r.data.report)
                // setLastUpdatedRemark(r.data.report['remark'])
                setLastUpdatedRemark(null)
                setLoading('loaded')
            }).catch(err => {
                setData(err.message)
                setLoading('errored')
            })
        }
    }, [loading])

    useEffect(() => {
        if (updatingRemark) {
            const token = JSON.parse(localStorage.getItem("elite-water"));
            const user_id = token.user.user._id;
            axios.post(`${baseUrl}/api/lead/submitDailyReport`, { updatedBy: user_id, remark: data['remark'] }).then(() => {
                setLastUpdatedRemark(data['remark'])
                setUpdatingRemark(false)
            }).catch(() => {
                setUpdatingRemark(false)
            })
        }
    }, [updatingRemark])

    return (
        <div className="container mt-1 mb-1 p-5  rounded shadow border border-grey card " style={{
            width: 'min-content', minWidth:"400px"
        }}>
            <div>
                <h3 className="text-center  text-black-300 p-1 text-uppercase text-bold mt-1 mb-1 ">
                    Daily report
                </h3>
                {
                    loading === 'loading' &&
                    <div className="d-flex justify-content-center align-items-center vh-30 w-100 p-5 text-grey font-bold text-center gap-4 ml-5 pl-5">
                        <SecondarySpinner />
                    </div>
                }

                {
                    loading === 'errored' &&
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

                {
                    loading === 'loaded' &&
                    <Col>
                        <Col id="daily-report-stats">
                            
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Meetings Set</h5>
                                    <p className="card-text">
                                        {data['meetingSet']}
                                    </p>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Follow Up</h5>
                                    <p className="card-text">
                                        {data['followUp']}
                                    </p>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Prospect</h5>
                                    <p className="card-text">
                                        {data['prospect']}
                                    </p>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Out Of Reach</h5>
                                    <p className="card-text">
                                        {data['outOfReach']}
                                    </p>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Wrong Number</h5>
                                    <p className="card-text">
                                        {data['wrongNumber']}
                                    </p>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Rejected</h5>
                                    <p className="card-text">
                                        {data['rejected']}
                                    </p>
                                </div>
                            </div>
                        </Col>



                        <div style={{
                            opacity: updatingRemark ? 0.6 : 1,
                            display: 'flex',
                            flexFlow: 'column nowrap',
                        }}>
                            <input className="form-control mb-3" style={{ minWidth: '300px' }} placeHolder="Enter any remarks" value={data['remark']} disabled={updatingRemark} onChange={ev => setData({ ...data, remark: ev.target.value })}></input>
                            <span style={{ width: '20px' }}></span>
                            <Button onClick={() => setUpdatingRemark(true)} disabled={updatingRemark || lastUpdatedRemark === data['remark']} style={{
                                minWidth: '80px',
                                minHeight: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {updatingRemark ? <Spinner ></Spinner> :
                                    <span>Submit</span>}
                            </Button>
                        </div>
                    </Col>
                }
            </div>
        </div >)
}

export default DailyReport