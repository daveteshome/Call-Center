import { useEffect, useState } from "react"
import { Card, CardBody, CardText, CardTitle, Col, Container, Nav, Row, Spinner, Tab, TabPane } from "react-bootstrap"
import { camelToCapitalize, useAnimatedValue } from "../../components/utils"
import { CircularProgressbar } from "react-circular-progressbar"
import "./StatsCard.css";
import { FaChartLine } from "react-icons/fa"

export default ({ data }) => {
    if (!data) throw "Data not defined";
    const keys = Object.keys(data)
    const [tab, setTab] = useState(keys[0])
    let total;
    return <Card className="col-lg-12">
        <CardBody>
            <Tab.Container mountOnEnter={true} unmountOnExit={false} activeKey={tab} onSelect={setTab}>
                <Nav variant="pills d-flex justify-content-center">
                    {keys.map(k => <Nav.Link eventKey={k}>{camelToCapitalize(k)}</Nav.Link>)}
                </Nav>
                <hr />
                <Tab.Content>
                    {keys.map(key =>
                        <TabPane eventKey={key}>
                            {data[key] ?
                                <Row className="px-4">
                                    {(total = Object.keys(data[key]).reduce((v, k) => v + data[key][k], 0), Object.keys(data[key]).map(k => <StatsItem  name={camelToCapitalize(k)} key={k} value={data[key][k]} total={total} />))}
                                </Row> :
                                <Container className="p-5 w-100 d-flex justify-content-center"><Spinner /></Container>}
                        </TabPane>)
                    }
                </Tab.Content>
            </Tab.Container>
        </CardBody>
    </Card >
}

const StatsItem = ({ name, value, total, className ,key}) => {
    const [animatedValue, animateTo] = useAnimatedValue(value / 2, { duration: 1500 })
    useEffect(() => {
        animateTo(value)
    }, [])
    return <Col xs={6} className="p-2 m-0 justify-content-stretch" key={key}>
        <Card className={`${className} stats-card bg-body`}>
            <CardBody className="p-3"> 
                <CardTitle className="text-body-emphasis">{name}</CardTitle>
                <CardText style={{fontFamily: "monospace"}}><span className="d-inline fs-6">Leads: </span><span className="text-primary-emphasis">{animatedValue}</span>/{total}</CardText>
            </CardBody>
        </Card>
    </Col>
}
