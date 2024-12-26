import axios from "axios"
import { useEffect, useState } from "react"
import Chart from 'react-apexcharts'
import { Card, CardBody, Container, Nav, Spinner, Tab, TabPane } from "react-bootstrap"
import { camelToCapitalize, indexToShortMonthName, indexToShortWeekday } from "../../components/utils"
import { baseUrl } from "../../store/resources/http"
import { YAxis } from "recharts"

export default ({ }) => {
    const [hourlyPerformance, setHourlyPerformance] = useState()
    const [weeklyPerformance, setWeeklyPerformance] = useState()
    const [monthlyPerformance, setMonthlyPerformance] = useState()
    const [tab, setTab] = useState('Hourly')

    useEffect(async () => {
        try {
            const user = JSON.parse(localStorage.getItem("elite-water")).user.user;
            const response = (await axios.get(`${baseUrl}/api/lead/getPerformanceHistory?period=hourly` + (user.role !== 2 ? `&updatedBy=${user._id}` : ''))).data.performance

            setHourlyPerformance({
                categories: response.length ? Array.from({ length: response[response.length - 1]['name'] + 1 }, (v, i) => i) : [],
                series: response.length ?
                    Object.keys(response[0]).filter(k => k !== 'name').map(k => {
                        let ind = 0;
                        return {
                            name: camelToCapitalize(k),
                            data: Array.from({ length: response[response.length - 1]['name'] + 1 }, (v, i) => {
                                if (i == response[ind]['name']) return response[ind++][k]
                                else return 0;
                            })
                        }
                    }) : []
            })
        } catch (e) { console.error(e) }
    }, [])

    useEffect(async () => {
        try {
            const user = JSON.parse(localStorage.getItem("elite-water")).user.user;
            const response = (await axios.get(`${baseUrl}/api/lead/getPerformanceHistory?period=weekly` + (user.role !== 2 ? `&updatedBy=${user._id}` : ''))).data.performance

            setWeeklyPerformance({
                categories: response.length ? Array.from({ length: response[response.length - 1]['name'] + 1 }, (v, i) => indexToShortWeekday(i)) : [],
                series: response.length ?
                    Object.keys(response[0]).filter(k => k !== 'name').map(k => {
                        let ind = 0;
                        return {
                            name: camelToCapitalize(k),
                            data: Array.from({ length: response[response.length - 1]['name'] + 1 }, (v, i) => {
                                if (i == response[ind]['name']) return response[ind++][k]
                                else return 0;
                            })
                        }
                    }) : []
            })
        } catch (e) { console.error(e) }
    }, [])

    useEffect(async () => {
        try {
            const user = JSON.parse(localStorage.getItem("elite-water")).user.user;

            const response = (await axios.get(`${baseUrl}/api/lead/getPerformanceHistory?period=monthly` + (user.role !== 2 ? `&updatedBy=${user._id}` : ''))).data.performance

            setMonthlyPerformance({
                categories: response.length ? Array.from({ length: response[response.length - 1]['name'] + 1 }, (v, i) => {
                    if (i == response[response.length - 1]['name']) return indexToShortMonthName(new Date().getMonth()) + ` ${i + 1}` //todo: yoni: poor usage
                    else return i + 1
                }) : [],
                series: response.length ?
                    Object.keys(response[0]).filter(k => k !== 'name').map(k => {
                        let ind = 0;
                        return {
                            name: camelToCapitalize(k),
                            data: Array.from({ length: response[response.length - 1]['name'] + 1 }, (v, i) => {
                                if (i == response[ind]['name']) return response[ind++][k]
                                else return 0;
                            })
                        }
                    }) : []
            })
        } catch (e) { console.log(e) }
    }, [])
    let myPerformance;
    return <Card >
        <CardBody>
            <Tab.Container mountOnEnter={true} unmountOnExit={false} activeKey={tab} onSelect={setTab}>
                <Nav variant="pills d-flex justify-content-center">
                    {['Hourly', 'Weekly', 'Monthly'].map(period => <Nav.Link eventKey={period}>{camelToCapitalize(period)}</Nav.Link>)}
                </Nav>

                <Tab.Content>
                    {['Hourly', 'Weekly', 'Monthly'].map(key =>
                    (myPerformance = key === 'Hourly' ? hourlyPerformance : key === 'Weekly' ? weeklyPerformance : monthlyPerformance, <TabPane eventKey={key}>
                        {myPerformance && myPerformance.categories.length ? <Chart
                            options={{
                                chart: {
                                    toolbar: {
                                        show: false
                                    },
                                },
                                legend: {
                                    show: true
                                },
                                yaxis: {
                                    show: false
                                },
                                xaxis: {
                                    categories: myPerformance.categories
                                },
                                stroke: {
                                    curve: 'smooth',
                                },

                            }}

                            series={
                                myPerformance.series
                            }
                            type="line"
                        /> :
                            <Container className="p-5 w-100 d-flex justify-content-center">
                                {myPerformance ? <p className='text-secondary text-semi-bold'>nothing yet </p> : <Spinner />}
                            </Container>}
                    </TabPane>))
                    }
                </Tab.Content>
            </Tab.Container>
        </CardBody>
    </Card>
}